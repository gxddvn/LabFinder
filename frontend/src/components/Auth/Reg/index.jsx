import React from "react";

import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchRegister, selectIsAuth } from "../../../Redux/Slices/auth";

import styles from "./Reg.module.css";
import { useForm } from "react-hook-form";
import { fetchBasketMe, fetchCreateBasket, updateAmountItem } from "../../../Redux/Slices/basket";

const Reg = ({ user_role }) => {
    const isAuth = useSelector(selectIsAuth);
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        // setError,
        formState: { isValid },
    } = useForm({
        defaultValues: {
        name: "",
        p_num: "",
        email: "",
        password: "",
        },
        mode: "onChange",
    });

    const onSubmit = async (values) => {
        const data = await dispatch(fetchRegister(values));
        console.log(data.error);
        if (!data.payload) {
            alert("Не вдалось зареєструватися, не правильно введені дані або такий користувач вже існує!");
        } else if (data.payload) {
            const basket_data = await dispatch(fetchCreateBasket({full_price: 0, usersTableId: data.payload.id}));
            if (basket_data) {
                const update_basket = await dispatch(fetchBasketMe({id: data.payload.id}));
                updateAmountItem({amount: 0});
            }
        }
    };

    if (isAuth) {
        return <Navigate to='/' />;
    }
    
    return (
        <main className={styles.r_main}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.rm_container}>
                <h1 className={styles.rm_h1}>Реєстрація</h1>
                <div className={styles.rmc_block}>
                    <input className={styles.rmcb_input} type="text" placeholder="Введіть Прізвище, Ім'я та По батькові" {...register("name", { required: "Вкажіть ім'я" })}/>
                    <input className={styles.rmcb_input} type="tel" name="p_num" id="p_num" placeholder="Введіть номер телефону" {...register("p_num", { required: "Вкажіть номер телефону" })}/>
                    <input className={styles.rmcb_input} type="email" name="email" id="email" placeholder="Введіть ваш Email" {...register("email", { required: "Вкажіть email" })}/>
                    <input className={styles.rmcb_input} type="password" name="password" id="password" placeholder="Введіть пароль" {...register("password", { required: "Вкажіть пароль" })}/>
                </div>
                <div className={styles.rmc_cont_butt}>
                    <button disabled={!isValid} type='submit' className={styles.rmc_butt}>Зареєструватися</button>
                </div>
            </form>
        </main>
    );
};

export default Reg;
