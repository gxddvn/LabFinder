import React from "react";

import { NavLink, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import styles from "./Login.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuth, selectIsAuth } from "../../../Redux/Slices/auth";
import { fetchCreateBasket } from "../../../Redux/Slices/basket";

const Login = ({ user_role }) => {
    const isAuth = useSelector(selectIsAuth);
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        // setError,
        formState: { isValid },
    } = useForm({
        // defaultValues: {
        // email: "admin@gmail.com",
        // password: "admin",
        // },
        defaultValues: {
            email: "",
            password: "",
        },
        mode: "onChange",
    });

    const onSubmit = async (values) => {
        const data = await dispatch(fetchAuth(values));
        // const basket_data = await dispatch(fetchCreateBasket(data.id));

        if (!data.payload) {
            alert("Не вдалось авторизуватися, не правильний пароль або пошта!");
        }

        if ("token" in data.payload) {
            window.localStorage.setItem("token", data.payload.token);
        }
    };

    if (isAuth) {
        return <Navigate to='/' />;
    }
    return (
        <main className={styles.l_main}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.lm_container}>
                <h1 className={styles.lm_h1}>Увійти</h1>
                <div className={styles.lmc_block}>
                    <input className={styles.lcmb_input} type="email" placeholder="Введіть email" {...register("email", { required: "Вкажіть пошту" })} />
                    <input className={styles.lcmb_input} type="password" placeholder="Введіть пароль" {...register("password", { required: "Вкажіть пароль" })}/>
                </div>
                <div className={styles.lmc_cont_butt}>
                    <button disabled={!isValid} type='submit' className={styles.lmc_butt}>Увійти</button>
                </div>
                <NavLink className={styles.lmc_navlink} to='/auth/reg'>Зареєструватися</NavLink>
            </form>
            
        </main>
    );
};

export default Login;
