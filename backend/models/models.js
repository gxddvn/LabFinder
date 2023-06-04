import sequelize from '../db.js';
import { DataTypes} from 'sequelize';

const UsersTable = sequelize.define( 'users_table', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false},
    p_num: {type: DataTypes.STRING, allowNull: false, unique: true},
    email: {type: DataTypes.STRING, allowNull: false, unique: true},
    password: {type: DataTypes.STRING, allowNull: false},
    user_role: {type: DataTypes.STRING, defaultValue: "USER"},
});

const BasketUser = sequelize.define( 'basket_user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    full_price: {type: DataTypes.INTEGER, allowNull: false},
});

const BasketAnalyzes = sequelize.define( 'basket_analyzes', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
});

const ReviewsTable = sequelize.define( 'reviews_table', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    review: {type: DataTypes.TEXT, allowNull: false},
    grades: {type: DataTypes.INTEGER, defaulValue: 0},
});

const Orders = sequelize.define( 'orders', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    full_price: {type: DataTypes.INTEGER, allowNull: false},
    // date: {type: DataTypes.DATE, allowNull: false},
    valid: {type: DataTypes.BOOLEAN, defaulValue: true},
});

const AnalyzesTable = sequelize.define( 'analyzes_table', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false, unique: true},
    description: {type: DataTypes.TEXT, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
});

const AnalyzesOrders = sequelize.define( 'analyzes_orders', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    // date_time: {type: DataTypes.DATE, allowNull: false},
});

const LaboratoryTable = sequelize.define( 'laboratory_table', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    lab_name: {type: DataTypes.STRING, allowNull: false, unique: true},
    adress: {type: DataTypes.STRING, allowNull: false, unique: true},
    coordinates: {type: DataTypes.STRING, allowNull: false, unique: true}
});

const CitiesTable = sequelize.define( 'cities_table', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    city_name: {type: DataTypes.STRING, allowNull: false, unique: true}
});

const CalendarTable = sequelize.define( 'calendar_table', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    time: {type: DataTypes.TIME, allowNull: false},
    date: {type: DataTypes.DATE, allowNull: false},
});


UsersTable.hasOne(BasketUser)
BasketUser.belongsTo(UsersTable)

BasketUser.hasMany(BasketAnalyzes)
BasketAnalyzes.belongsTo(BasketUser)

UsersTable.hasMany(ReviewsTable)
ReviewsTable.belongsTo(UsersTable)

UsersTable.hasMany(Orders)
Orders.belongsTo(UsersTable)

Orders.hasMany(AnalyzesOrders)
AnalyzesOrders.belongsTo(Orders)

AnalyzesTable.hasOne(AnalyzesOrders)
AnalyzesOrders.belongsTo(AnalyzesTable)

AnalyzesTable.hasOne(BasketAnalyzes)
BasketAnalyzes.belongsTo(AnalyzesTable)

LaboratoryTable.hasMany(Orders)
Orders.belongsTo(LaboratoryTable)

LaboratoryTable.hasMany(CalendarTable)
CalendarTable.belongsTo(LaboratoryTable)

CitiesTable.hasMany(LaboratoryTable)
LaboratoryTable.belongsTo(CitiesTable)

// CalendarTable.hasOne(AnalyzesOrders)
// AnalyzesOrders.belongsTo(CalendarTable)
AnalyzesOrders.hasOne(CalendarTable)
CalendarTable.belongsTo(AnalyzesOrders)

export default {
    UsersTable,
    BasketUser,
    ReviewsTable,
    Orders,
    AnalyzesOrders,
    BasketAnalyzes,
    AnalyzesTable,
    LaboratoryTable,
    CitiesTable,
    CalendarTable,
}
