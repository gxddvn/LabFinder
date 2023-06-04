import React from "react";
import styles from "./BasketItem.module.css";
// import axios from "../../../axios";
// import { deleteItem, fetchBasketAnalyzesMe } from "../../../Redux/Slices/basket";
// import { useDispatch } from "react-redux";

const BasketItem = ({item, onReturn}) => {
    // const dispatch = useDispatch();
    const onDelClick = () => {
        // console.log(item);
        onReturn(item);
    };
    return (
        <div className={styles.bmc_block}>
            <span className={styles.bmcb_name1}>Назва: <br/><span className={styles.bmcb_name2}>{item.name}</span></span>
            <span className={styles.bmcb_name}>Термін: <br/><span className={styles.bmcb_name2}>1 день</span></span>
            <span className={styles.bmcb_name}>Ціна: <br/><span className={styles.bmcb_name2}>{item.price} грн</span></span>
            <div onClick={onDelClick} item-id={item.id} className={styles.bmcb_circle}>
                <div className={styles.bmcb_img}></div>
            </div>
        </div>
    )
};

export default BasketItem;
