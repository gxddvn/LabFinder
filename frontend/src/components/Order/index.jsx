import React from "react";
import styles from "./Order.module.css";
import MapBlock from "../MapBlock";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../axios";
import { Navigate } from "react-router-dom";
import { selectIsAuth } from "../../Redux/Slices/auth";
import { fetchBasketMe, fetchUpdateBasket, updateAmountItem } from "../../Redux/Slices/basket";

const Order = () => {
    const dispatch = useDispatch();
    const isAuth = useSelector(selectIsAuth);
    const basket = useSelector((state) => state.basket.basket || []);
    const basketAnalyzes = useSelector((state) => state.basket.basketAnalyzes || []);
    const data = useSelector((state) => state.auth.data || []);

    const [items, setItems] = React.useState([]);
    const [items_for, setItemsFor] = React.useState([]);
    const [it_date, setItDate] = React.useState(false);
    const calendars = ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30"];
    const [caledars_for, setCalendarsFor] = React.useState([]);
    const [ids, setIds] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [laboratory, setLab] = React.useState({});
    const [order, setOrder] = React.useState({});
    // const [analyzes, setAnalyzes] = React.useState({});
    const [exit, setExit] = React.useState(false);

    React.useEffect(() => {
        if (basketAnalyzes.length > 0) {
            let arr = [];
            basketAnalyzes.forEach(item => {
                arr.push(item.analyzesTableId)
            });
            setIds(arr);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [basketAnalyzes]);

    React.useEffect(() => {
        if (ids.length > 0 ) {
            axios.post(`/analyzes/arrids`, {ids: ids})
                .then((res) => {
                    setItems(res.data);
                })
                .catch((err) => {
                    console.warn(err);
                    alert("Помилка при отриманні аналізів");
                });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ids]);

    const res_calend = async (index, item) => {
        const data = await axios.post(`/calendar/allbyid`, {date: `${item.date} 03:00:00+03`, laboratoryTableId: laboratory.id})
        return data;
    }

    React.useEffect(() => {
        if (items_for.length > 0) {
            const promises = items_for.map((item, index) => {
                return res_calend(index, item);
            });
        
            Promise.all(promises)
            .then((responses) => {
                const arr = [];
                responses.forEach((res, index) => {
                const arr_for_time = res.data.map((item) => item.time);
                arr.push({ id: index, arr: res.data, times: arr_for_time, status: "Loaded" });
                });
                setCalendarsFor(arr);
                setIsLoading(true);
            })
            .catch((err) => {
                console.warn(err);
                alert("Помилка при отриманні аналізів");
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [it_date]);

    const DeleteBas = (analyzes) => {
        if (analyzes.id > 0 && basket.id > 0) {
            axios.delete(`/basketanalyzes/delall/${basket.id}`)
            .then((res) => {
                console.log(res.data);
                updateAmountItem({amount: 0});
                dispatch(fetchBasketMe({id: data.id}));
            })
            .catch((err) => {
                console.warn(err);
                alert("Помилка при видаленні аналізів з кошику!");
            });
            // return <Navigate to='/' />;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }


    React.useEffect(() => {
        if (order.id > 0) {
            items.forEach((item, index) => {
                axios.post(`/analyzesorders/`, {orderId: order.id, analyzesTableId: item.id, time: items_for[index].time, date: items_for[index].date, laboratoryTableId: laboratory.id})
                .then((res) => {
                    DeleteBas(res.data);
                    // setAnalyzes(res.data);
                })
                .catch((err) => {
                    console.warn(err);
                    alert("Помилка при створенні аналізу в ордері");
                });
            })
            setExit(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [order]);

    
    const SubmitOrder = (event) => {
        if(items.length !== 0 && laboratory !== {} && items_for.length !== 0 && basket.length !== 0 && data.length !== 0 && basket.full_price !== 0 && items_for.length === items.length) {
            let ind = true;
            let j = 0;
            while(j < items_for.length) {
                let i = 0;
                while(i < items_for.length) {
                    if(i !== j && items_for[j].date === items_for[i].date && items_for[j].time === items_for[i].time) {
                        ind = false;
                        break;
                    }
                    i++;
                }
                if (!ind) {
                    alert("Введені дані повторюються!"); 
                    break;
                }
                j++;
            }
            if (ind) {
                axios.post(`/orders/`, {full_price: basket.full_price, valid: true, usersTableId: data.id, laboratoryTableId: laboratory.id, user_email: data.email, analyzes: items, times: items_for, user_name: data.name})
                .then((res) => {
                    console.log(res.data);
                    setOrder(res.data);
                })
                .catch((err) => {
                    console.warn(err);
                    alert("Помилка при створенні ордеру");
                });
            }
        }
        else {
            alert("Не правильно введені дані!!!");
        }
    }

    const handleDateChange = (e, index) => {
        const newItems = [...items_for];
        newItems[index] = { ...newItems[index], date: e.target.value };
        if (it_date) {
            setItDate(false);
        }
        else {setItDate(true)}
        setItemsFor(newItems);
    };
    
    const handleTimeChange = (e, index) => {
        const newItems = [...items_for];
        newItems[index] = { ...newItems[index], time: e.target.value };
        setItemsFor(newItems);
    };

    if (!isAuth || basket.length === 0 || basketAnalyzes.length === 0 || exit) {
        if (exit) {
            dispatch(fetchUpdateBasket({id: basket.id, full_price: 0}));
        }
        return <Navigate to='/' />;
    }

    const hasAppointment = (timeSlot, index) => {
        return caledars_for[index].times.some((appointment) => appointment === `${timeSlot}:00`);
    };

    return (
        <main className={styles.main_order}>
            <h1 className={styles.mo_h1}>Оформлення замовлення</h1>
            <p className={styles.mo_p}>1. Оберіть місто та лабораторію в якій будете здавати аналізи:</p>
            <MapBlock ReturnData={(item) => {setLab(item)}}/>
            <p className={styles.mo_p}>2. Оберіть час здачі для аналізу(-зів):</p>
            {items.length > 0 && items.map((item, index) => (
                <div key={index} className={styles.mo_block}>
                    <span className={styles.mob_span}>Назва: <span className={styles.mob_span2}>{item.name}</span></span>
                    <span className={styles.mob_span1}>Дата:</span>
                    <input onChange={(e) => handleDateChange(e, index)} className={styles.mob_input_date} type="date" min="2023-05-25" max="2023-12-31"/>
                    <span className={styles.mob_span1}>Час:</span>
                    <select onChange={(e) => handleTimeChange(e, index)} className={styles.mob_select}>
                        <option value="0" defaultChecked>Час не обрано</option>
                        {laboratory.id > 0 && caledars_for[index] && isLoading && calendars.map((time, index2) => (
                            <option key={index2} value={time} disabled={hasAppointment(time, index)} >{time}</option>
                        ))}
                    </select>
                </div>
            ))}
            <div className={styles.mo_container}>
                <button onClick={SubmitOrder} className={styles.moc_butt}>Оформити замовлення</button>
            </div>
        </main>
    );
};

export default Order;
