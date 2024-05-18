import * as tf from '@tensorflow/tfjs';
import models from "../models/models.js";

const UsersTable = models.UsersTable;
const LaboratoryTable = models.LaboratoryTable;

function cosineSimilarity(vecA, vecB) {
    const dotProduct = vecA[0] * vecB[0] + vecA[1] * vecB[1];
    const normA = Math.sqrt(vecA[0] * vecA[0] + vecA[1] * vecA[1]);
    const normB = Math.sqrt(vecB[0] * vecB[0] + vecB[1] * vecB[1]);
    return dotProduct / (normA * normB);
}

// Колаборативна фільтрація
function findSimilarUsers(users, targetUserId) {
    const targetUser = users.find(user => user.userId === targetUserId);
    if (!targetUser) return [];

    const similarities = users
        .filter(user => user.userId !== targetUserId)
        .map(user => ({
            userId: user.userId,
            similarity: cosineSimilarity(targetUser.coords, user.coords)
        }));

    return similarities.sort((a, b) => b.similarity - a.similarity);
}

// Навчання моделі
async function trainModel(users) {
    const model = tf.sequential();
    model.add(tf.layers.dense({ units: 1, activation: 'sigmoid', inputShape: [2] }));
    model.compile({ optimizer: 'adam', loss: 'binaryCrossentropy', metrics: ['accuracy'] });

    const trainX = tf.tensor2d(users.map(u => [...u.coords]));
    const similarUsers = users.map(u => findSimilarUsers(users, u.userId));
    const trainY = tf.tensor2d(similarUsers.map(su => [su[0] ? su[0].similarity : 0]));

    await model.fit(trainX, trainY, { epochs: 100 });
    console.log('Model training complete');

    return model;
}

// Передбачення уподобань
async function predict(user, model) {
    const testX = tf.tensor2d([user.coords]);
    return model.predict(testX).dataSync()[0];
}

// Рекомендації найближчих лабораторій
function getNearestLabs(userCoords, labs, topN = 3) {
    const distances = labs.map(lab => ({
        labId: lab.labId,
        distance: haversineDistance(userCoords, lab.coords)
    }));

    distances.sort((a, b) => a.distance - b.distance);
    return distances.slice(0, topN);
}

// Функція для обчислення географічної відстані
function haversineDistance(coords1, coords2) {
    const toRad = x => x * Math.PI / 180;
    const [lat1, lon1] = coords1.map(toRad);
    const [lat2, lon2] = coords2.map(toRad);

    const dLat = lat2 - lat1;
    const dLon = lon2 - lon1;
    const a = Math.sin(dLat / 2) ** 2 +
              Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const R = 6371; // Radius of Earth in kilometers
    return R * c;
}

// Метод для отримання рекомендацій для користувача
async function getRecommendations(userReq, users, labs) {
    const {targetUserId} = userReq;
    const targetUser = users.find(user => user.userId === parseInt(targetUserId) && user)
    if (!targetUser) return [];
    const model = await trainModel(users);
    const similarityScore = await predict(targetUser, model);
    console.log(`Similarity Score for user ${targetUserId}: ${similarityScore}`);
    const recommendations = getNearestLabs(targetUser.coords, labs);
    return recommendations;
}

class LabRecommendationController {
    constructor() {}

    async getRecommendationsCont(req, res) {
        const {id, userCoordsX, userCoordsY} = req.body;
        const users_table = await UsersTable.findAll();
        const users = users_table.map(u => ({userId: u.dataValues.id, coords: u.dataValues.coordinates.split(', ').map(coord => parseFloat(coord))}));
        const labs_table = await LaboratoryTable.findAll();
        const labs = labs_table.map(l => ({labId: l.dataValues.id, coords: l.dataValues.coordinates.split(', ').map(coord => parseFloat(coord))}))
        const recommendations = await getRecommendations({targetUserId: id, coords: [userCoordsX, userCoordsY] }, users, labs);
        return res.json(recommendations);
    }

}

export default new LabRecommendationController();