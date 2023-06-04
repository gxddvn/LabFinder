import React from "react";

// import { NavLink } from "react-router-dom";

import styles from "./PersonalCab.module.css";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectIsAuth } from "../../Redux/Slices/auth";
import { Navigate } from "react-router-dom";
import axios from '../../axios.js';

const PersonalCab = ({ user_role }) => {
    const isAuth = useSelector(selectIsAuth);
    const dispatch = useDispatch();
    const data = useSelector((state) => state.auth.data || []);
    const [order, setOrder] = React.useState([]);
    // const [loadOrder, setLoadOrder] = React.useState(false);
    const [analyzes_order, setAnalyzesOrder] = React.useState([]);
    const [analyzes, setAnalyzes] = React.useState([]);
    const [ids, setIds] = React.useState([]);
    const [analyzes_order_ids, setAnalyzesOrderIds] = React.useState([]);
    const [calendar, setCalendar] = React.useState([]);

    const onClickLogout = () => {
        if (window.confirm("Ви впевнені, що хочете вийти?")) {
            dispatch(logout());
            window.localStorage.removeItem("token");
        }
    };

    React.useEffect(() => {
        if (isAuth && data !== []) {
            axios.get(`/orders/allbyid/${data.id}`)
            .then((res) => {
                let arr = [];
                res.data.forEach((item) => {
                    arr.push(item.id);
                })
                console.log(res.data);
                setIds(arr)
                setOrder(res.data);
            })
            .catch((err) => {
                console.warn(err);
                alert("Помилка при отриманні ордерів");
            });
        }
    }, [data])

    React.useEffect(() => {
        if (analyzes_order_ids.length > 0) {
            axios.post(`/calendar/allbyanalyzesid`, {analyzesOrderId: analyzes_order_ids})
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
    }, [analyzes_order_ids]);

    React.useEffect(() => {
        if (isAuth && order.length > 0, ids.length > 0) {
            axios.post(`/analyzesorders/allbyid/`, {ids: ids})
                .then((res) => {
                    let arr = [];
                    res.data.forEach((item) => {
                        arr.push(item.id);
                    })
                    setAnalyzesOrderIds(arr);
                    setAnalyzesOrder(res.data);
                    // console.log(res.data);
                })
                .catch((err) => {
                    console.warn(err);
                    alert("Помилка при отриманні ордерів");
                });
        }
    }, [order, ids])

    React.useEffect(() => {
        if (isAuth && analyzes_order.length > 0) {
            let ids = [];
            // let arr = [];
            analyzes_order.map((item) => {
                ids.push(item.analyzesTableId);
            })
            // console.log(ids);
            axios.post('http://localhost:4444/api/analyzes/arrids', {ids: ids})
            .then((res) => {
                // console.log(res.data);
                setAnalyzes(res.data);
            })
            .catch((err) => {
                console.warn(err);
                alert("Помилка при отриманні відгуків");
            });
            // console.log(arr);
        }
    }, [analyzes_order])

    if (!isAuth) {
        return <Navigate to='/' />;
    }
    return (
        <main className={styles.p_main}>
            <div className={styles.pm_container}>
                <h1 className={styles.pmc_h1}>Особистий кабінет</h1>
                <div className={styles.pmc_block}>
                    <div className={styles.pmcb_img}></div>
                    <div className={styles.pmcb_container}>
                        <h1 className={styles.pmcbc_h1}>ПІБ: {data.name}</h1>
                        <p className={styles.pmcbc_p}>Email: {data.email}</p>
                        <p className={styles.pmcbc_p}>Phone: {data.p_num}</p>
                    </div>
                    <div className={styles.pmcb_button_cont}>
                        <button onClick={onClickLogout} className={styles.pmcbbc_butt}>Вийти з аккаунту</button>
                    </div>
                </div>
            </div>
            <div className={styles.pm_container1}>
                {analyzes.length > 0 ? analyzes.map((item, index) => (
                    <div key={index} className={styles.pmc_block}>
                        <span className={styles.pmcb_span}>Назва: {item.name}</span>
                        <span className={styles.pmcb_span}>Ціна: {item.price}</span>
                        {calendar.length > 0 && (
                            <span className={styles.pmcb_span}>Час: {calendar[index].time}</span>
                        )}
                        {calendar.length > 0 && (
                            <span className={styles.pmcb_span}>Дата: {calendar[index].date.split('T')[0]}</span>
                        )}
                        <span className={styles.pmcb_span1}>Активні</span>
                    </div>
                )): (
                    <h1 className={styles.pmc1_h1}>Аналізів немає</h1>
                )}
            </div>
        </main>
    );
};

export default PersonalCab;
