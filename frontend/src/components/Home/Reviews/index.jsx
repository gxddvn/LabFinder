import React from "react";
import styles from "./Reviews.module.css";
import axios from "../../../axios";

const Reviews = ({user_id, review, amount_grades, date}) => {
    const [user, setUser] = React.useState({name: ". . ."});

    React.useEffect(() => {
        axios
            .get(`/user/${user_id}`)
            .then((res) => {
                setUser(res.data);
            })
            .catch((err) => {
                console.warn(err);
                alert("Помилка при отриманні юзера");
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div className={styles.mc_block}>
            <div className={styles.mcb_top}>
                <div className={styles.mcbt_per_block}>
                <div className={styles.mcbt_person}></div>
                </div>
                {user ? (
                    <div className={styles.mcbt_name}>{user.name.split(' ')[0]} {user.name.split(' ')[1]}</div>
                ) : (
                    <div className={styles.mcbt_name}>...</div>
                )}
            </div>
            <div className={styles.mcb_main}>
                <div className={styles.mcbm_gradeblock}>
                    {Array.from({ length: amount_grades }, (_, index) => (
                        <div key={index} className={styles.mcbm_grades}></div>
                    ))}
                </div>
                <p className={styles.mcbm_p}>"{review}"</p>
                {user ? (
                    <p className={styles.mcbm_date}>{date.split('T')[0]}</p>
                ) : (
                    <p className={styles.mcbm_date}>...</p>
                )}
                
            </div>
        </div>
    );
};

export default Reviews;
