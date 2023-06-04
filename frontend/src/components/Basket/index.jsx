import React from "react";
import styles from "./Basket.module.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteItem, fetchBasketAnalyzesMe, fetchUpdateBasket } from "../../Redux/Slices/basket";
import axios from "../../axios";
import BasketItem from "./BasketItem";
import { NavLink } from "react-router-dom";

const Basket = () => {
    const dispatch = useDispatch();
    const basket = useSelector((state) => state.basket.basket || []);
    const basketAnalyzes = useSelector((state) => state.basket.basketAnalyzes || []);

    const [items, setItems] = React.useState([]);
    const [ids, setIds] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);

    React.useEffect(() => {
        if (isLoading === false) {
            if (basket.length > 0 || basket.id > 0) {
                dispatch(fetchBasketAnalyzesMe({id: basket.id}));
            } 
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [basket.id, isLoading])
    React.useEffect(() => {
        if (basketAnalyzes.length > 0 && isLoading === false) {
            let arr = [];
            basketAnalyzes.forEach(item => {
                arr.push(item.analyzesTableId)
            });
            setIds(arr);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [basketAnalyzes, isLoading]);

    React.useEffect(() => {
        if (ids.length > 0 && isLoading === false) {
            axios.post(`/analyzes/arrids`, {ids: ids})
                .then((res) => {
                    setItems(res.data);
                })
                .catch((err) => {
                    console.warn(err);
                    alert("Помилка при отриманні відгуків");
                });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ids, isLoading]);

    const onDel = (item) => {
        if (item.id > 0) {
            axios.delete(`/basketanalyzes/del/${item.id}`)
            .then((res) => {
                // setResMessage(res.data);
                if (res.data === 1){
                    dispatch(deleteItem({item: item}));
                    dispatch(fetchUpdateBasket({id: basket.id, full_price: basket.full_price-item.price}))
                    setIsLoading(true);
                    let arr = [];
                    items.forEach(elem => {
                        if (elem.id !== item.id) {
                            arr.push(elem);
                        }
                    })
                    setItems(arr);
                }
                console.log(res.data);
            })
            .catch((err) => {
                console.warn(err);
                alert("Помилка при отриманні відгуків");
            });
        }
    };

    return (
        <main className={styles.b_main}>
            <h1 className={styles.bm_h1}>Кошик</h1>
            <div className={styles.bm_container}>
                {/* <h1 className={styles.bmc_h1}>Кошик порожній</h1> */}
                {items.length > 0 ? items?.map((item, index) => (
                    <BasketItem key={index} basket={basket} onReturn={onDel} item={item}/>
                )) : (
                    <h1 className={styles.bmc_h1}>Кошик порожній</h1>
                )}
            </div>
            {items.length > 0 && (
                <>
                    <div className={styles.bm_block1}>
                        <h1 className={styles.bmb1_h1}>До сплати: {basket.full_price} грн</h1>
                    </div>
                    <div className={styles.bm_block}>
                        <NavLink to='/order' className={styles.bmb_butt}>Оформити замовлення</NavLink>
                    </div>
                </>
            )}
        </main>
    );
};

export default Basket;
