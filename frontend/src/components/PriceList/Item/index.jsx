import React from "react";
import styles from "./Item.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchCreateAnalyzesBasket, fetchUpdateBasket, setItemInBasket } from "../../../Redux/Slices/basket";
import { selectIsAuth } from "../../../Redux/Slices/auth";

const Item = ({id, name, price, description, item}) => {
    const isAuth = useSelector(selectIsAuth);
    const {basket} = useSelector((state) => state.basket || []);
    const dispatch = useDispatch();

    const OnSub = () => {
        if(isAuth) {
            dispatch(fetchCreateAnalyzesBasket({basketUserId: basket.id, analyzesTableId: item.id}));
            dispatch(fetchUpdateBasket({id: basket.id, full_price: basket.full_price+price}));
            dispatch(setItemInBasket({item}));
        }
        else {
            alert("Ви не авторизовані! Авторизуйтеся або зареєструйтеся.")
        }
    };

    return (
        <div className={styles.mpib_container}>
            <div className={styles.mpib_item}>
                <span className={styles.mpibi_name1}>Назва: <br/><span className={styles.mpibi_name2}>{name}</span></span>
                <span className={styles.mpibi_name}>Термін: <br/><span className={styles.mpibi_name2}>1 день</span></span>
                <span className={styles.mpibi_name}>Ціна: <br/><span className={styles.mpibi_name2}>{price} грн</span></span>
                <div onClick={OnSub} className={styles.mpibi_circle}>
                    <div className={styles.mpibi_img}></div>
                </div>
            </div>
        </div>
    );
};

export default Item;
