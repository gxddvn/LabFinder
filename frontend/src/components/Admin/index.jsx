import React from "react";
import styles from "./Admin.module.css";
import axios from "../../axios";
import { useSelector } from "react-redux";
import { selectIsAuth } from "../../Redux/Slices/auth";
import { Navigate } from "react-router-dom";

const Admin = () => {
    const isAuth = useSelector(selectIsAuth);
    const [items, setItems] = React.useState([]);
    const [analyzes_order, setAnalyzesOrder] = React.useState([]);
    const [analyzes, setAnalyzes] = React.useState([]);
    const [calendar, setCalendar] = React.useState([]);
    const [ids, setIds] = React.useState([]);
    const [ids_analyzesorder, setIdsAnalyzesOrder] = React.useState([]);
    const [limit, setLimit] = React.useState(10);
    const [limit_analyzes_order, setLimitAnalyzesOrder] = React.useState(10);
    const data = useSelector((state) => state.auth.data || []);
    const [page_ad, setPageAd] = React.useState(1);

    React.useEffect(() => {
        axios.get(`/user?page=1&limit=${limit}`)
        .then((res) => {
            setItems(res.data.rows);
            // console.log(res.data);
        })
        .catch((err) => {
            console.warn(err);
            alert("Помилка при отриманні аналізів");
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [limit]);

    React.useEffect(() => {
        axios.get(`/analyzesorders?page=1&limit=${limit}`)
        .then((res) => {
            let ids_arr = []
            let ids_arr2 = []
            res.data.rows.forEach((item) => {
                ids_arr.push(item.analyzesTableId);
                ids_arr2.push(item.id);
            })
            setIds(ids_arr)
            setIdsAnalyzesOrder(ids_arr2);
            setAnalyzesOrder(res.data.rows);
            // console.log(res.data);
        })
        .catch((err) => {
            console.warn(err);
            alert("Помилка при отриманні аналізів");
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [limit_analyzes_order]);

    React.useEffect(() => {
        if (ids.length > 0) {
            // console.log(ids);
            axios.post(`/analyzes/arrids`, {ids: ids})
            .then((res) => {
                setAnalyzes(res.data);
                // console.log(res.data);
            })
            .catch((err) => {
                console.warn(err);
                alert("Помилка при отриманні аналізів");
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ids]);

    React.useEffect(() => {
        if (ids_analyzesorder.length > 0) {
            axios.post(`/calendar/allbyanalyzesid`, {analyzesOrderId: ids_analyzesorder})
            .then((res) => {
                setCalendar(res.data);
                // console.log(res.data);
            })
            .catch((err) => {
                console.warn(err);
                alert("Помилка при отриманні аналізів");
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ids_analyzesorder]);

    if (!isAuth || data.user_role !== "ADMIN") {
        return <Navigate to='/'/>;
    }

    return (
        <main className={styles.Main_Admin}>
            <h1 className={styles.ma_h1}>Адмін панель</h1>
            <div className={styles.ma_container1}>
                <div className={styles.mac1_left}>
                    <button onClick={() => {setPageAd(1)}} className={styles.mac1l_butt}>Користувачі</button>
                    <button onClick={() => {setPageAd(2)}} className={styles.mac1l_butt}>Список зареєстрованих аналізів</button>
                </div>
                <div className={styles.mac1_right}>
                    {page_ad === 1 ? (
                        <>
                            <h1 className={styles.mac_h1}>Користувачі</h1>
                            <div className={styles.mac_cont}>
                            {items.length > 0 && items?.map((item, index) => (
                                <div key={index} className={styles.macc_block}>
                                    <span className={styles.maccb_span}>Id: {index+1}</span>
                                    <span className={styles.maccb_span}>Ім'я: {item.name}</span>
                                    <span className={styles.maccb_span}>Email: {item.email}</span>
                                    <span className={styles.maccb_span}>Номер телефону: {item.p_num}</span>
                                </div>
                            ))}
                            </div>
                            <div className={styles.mac_butt}>
                                <button onClick={() => {setLimit(limit + 10)}} className={styles.macb_butt}>Завантажити ще</button>
                            </div>
                        </>
                    ) : page_ad === 2 ? (
                        <>
                            <h1 className={styles.mac_h1}>Список зареєстрованих аналізів</h1>
                            <div className={styles.mac_cont}>
                            {items && items.length !== 0 && calendar !== [] && analyzes?.map((item, index) => (
                                <div key={index} className={styles.macc_block}>
                                    <span className={styles.mac_span}>Active</span>
                                    <span className={styles.maccb_span}>Id: {index+1}</span>
                                    <span className={styles.maccb_span}>Назва: {item.name}</span>
                                    <span className={styles.maccb_span}>Замовник: {data.name}</span>
                                    <span className={styles.maccb_span}>Ціна: {item.price}</span>
                                    {calendar.length > 0 && (
                                        <span className={styles.maccb_span}>Час: {calendar[index].time}</span>
                                    )}
                                    {calendar.length > 0 && (
                                        <span className={styles.maccb_span}>Дата: {calendar[index].date.split('T')[0]}</span>
                                    )}
                                </div>
                            ))}
                            </div>
                            <div className={styles.mac_butt}>
                                <button onClick={() => {setLimitAnalyzesOrder(limit + 10)}} className={styles.macb_butt}>Завантажити ще</button>
                            </div>
                        </>
                    ) : (
                        <></>
                    )}
                </div>
            </div>
            {/* <div className={styles.ma_container}>
                <h1 className={styles.mac_h1}>Користувачі</h1>
                <div className={styles.mac_cont}>
                {items.length > 0 && items?.map((item, index) => (
                    <div key={index} className={styles.macc_block}>
                        <span className={styles.maccb_span}>Id: {index+1}</span>
                        <span className={styles.maccb_span}>Ім'я: {item.name}</span>
                        <span className={styles.maccb_span}>Email: {item.email}</span>
                        <span className={styles.maccb_span}>Номер телефону: {item.p_num}</span>
                    </div>
                ))}
                </div>
                <div className={styles.mac_butt}>
                    <button onClick={() => {setLimit(limit + 10)}} className={styles.macb_butt}>Завантажити ще</button>
                </div>
            </div>
            <div className={styles.ma_container}>
                <h1 className={styles.mac_h1}>Список зареєстрованих аналізів</h1>
                <div className={styles.mac_cont}>
                {items && items.length !== 0 && calendar !== [] && analyzes?.map((item, index) => (
                    <div key={index} className={styles.macc_block}>
                        <span className={styles.mac_span}>Active</span>
                        <span className={styles.maccb_span}>Id: {index+1}</span>
                        <span className={styles.maccb_span}>Назва: {item.name}</span>
                        <span className={styles.maccb_span}>Ціна: {item.price}</span>
                        {calendar.length > 0 && (
                            <span className={styles.maccb_span}>Час: {calendar[index].time}</span>
                        )}
                        {calendar.length > 0 && (
                            <span className={styles.maccb_span}>Дата: {calendar[index].date.split('T')[0]}</span>
                        )}
                    </div>
                ))}
                </div>
                <div className={styles.mac_butt}>
                    <button onClick={() => {setLimitAnalyzesOrder(limit + 10)}} className={styles.macb_butt}>Завантажити ще</button>
                </div>
            </div> */}
        </main>
    );
};

export default Admin;
