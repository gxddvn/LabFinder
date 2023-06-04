import React from "react";
import styles from "./MapBlock.module.css";
import Map from "../Map";
import axios from "../../axios";

const MapBlock = ({ReturnData}) => {
    const [cities, setCities] = React.useState([]);
    const [city_id, setCityId] = React.useState(0);
    const [laboratories, setLab] = React.useState([]);
    const [lab_id, setLabId] = React.useState(0);
    React.useEffect(() => {
        window.scrollTo(0, 0);
        axios
            .get(`/cities/`)
            .then((res) => {
                setCities(res.data);
                // console.log(res.data)
            })
            .catch((err) => {
                console.warn(err);
                alert("Помилка при отриманні міст");
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    React.useEffect(() => {
        axios
            .get(`/laboratory/citiesid/${city_id}`)
            .then((res) => {
                setLab(res.data);
            })
            .catch((err) => {
                console.warn(err);
                alert("Помилка при отриманні лабораторій");
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [city_id]);

    const cityTarget = (event) => {
        setCityId(event.target.value);
    };

    const laboratoryTarget = (event) => {
        setLabId(event.target.value);
        if (ReturnData !== undefined ) {
            ReturnData(laboratories[event.target.value-1]);
        }
    };

    return (
        <div className={styles.m_mapblock}>
            <h1 className={styles.mmb_h1}>Карта приймальних пунктів</h1>
            <div className={styles.mmb_container}>
                <div className={styles.mmbc_top}>
                    <div className={styles.mmbct_selectblock}>
                        <p className={styles.mmbct_p}>Регіон</p>
                        <select onChange={cityTarget}  className={styles.mmbct_select} name="" id="">
                            <option value={0} defaultChecked>Не обрано</option>
                            {cities?.map((city, index) => (
                                <option key={index} value={`${index+1}`}>{city.city_name}</option>
                            ))}
                        </select>
                    </div>
                    <div className={styles.mmbct_selectblock}>
                        <p className={styles.mmbct_p}>Пункт прийому</p>
                        <select onChange={laboratoryTarget} className={styles.mmbct_select} name="" id="">
                            <option value={0} defaultChecked>Не обрано</option>
                            {laboratories?.map((laboratory, index) => (
                                <option key={index} value={`${index+1}`}>{laboratory.lab_name} {laboratory.adress}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <Map laboratories={laboratories} lab_id={lab_id}></Map>
            </div>
        </div>
    );
};

export default MapBlock;
