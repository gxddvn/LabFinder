import React from "react";
import styles from "./MapBlock.module.css";
import Map from "../Map";
import axios from "../../axios";
import { useSelector } from 'react-redux';
import {authMe} from "../../Redux/Slices/auth";

const MapBlock = ({ReturnData}) => {
    const authMeData = useSelector(authMe)
    const [cities, setCities] = React.useState([]);
    const [city_id, setCityId] = React.useState(0);
    const [laboratories, setLab] = React.useState([]);
    const [lab_id, setLabId] = React.useState(0);
    const [recLabs, setRecLabs] = React.useState([])
    const [cityValue, setCityValue] = React.useState(0);
    const [labValue, setLabValue] = React.useState(0);
    React.useEffect(() => {
        window.scrollTo(0, 0);
        axios.get(`/cities/`)
            .then((res) => {
                setCities(res.data);
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
    React.useEffect(() => {
        axios.post('/rec', {id: authMeData?.id})
            .then((res) => {
                setRecLabs(res.data);
            })
            .catch((err) => {
                console.warn(err);
                alert("Помилка при отриманні рекомендацій");
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authMeData])
    React.useEffect(() => {
        if (recLabs[0]?.labId > 0) {
            axios.get(`/laboratory/${recLabs[0]?.labId}`)
            .then((res) => {
                setCityId(res.data.citiesTableId)
                setCityValue(res.data.citiesTableId)
                laboratories?.map((lab, index) => {
                    if (lab.id === recLabs[0].labId) {
                        setLabId(index+1)
                        setLabValue(index+1)
                        if (ReturnData !== undefined ) {
                            ReturnData(lab);
                        }
                    }
                })
            })
            .catch((err) => {
                console.warn(err);
                alert("Помилка при отриманні лабораторії");
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [recLabs, ReturnData, laboratories])
    const cityTarget = (event) => {
        setCityId(event.target.value);
        setCityValue(event.target.value)
    };
    

    const laboratoryTarget = (event) => {
        setLabId(event.target.value);
        setLabValue(event.target.value)
        if (ReturnData !== undefined ) {
            ReturnData(laboratories[event.target.value-1]);
        }
    };

    return (
        <div className={styles.m_mapblock}>
            <h1 className={styles.mmb_h1}>Карта приймальних пунктів</h1>
            <div className={styles.mmb_container}>
                {recLabs && (
                    <span className={styles.mmbc_span}>*Виходячи з вашого розташування, ми підібрали до вас найближчу лабораторію.</span>
                )}
                <div className={styles.mmbc_top}>
                    <div className={styles.mmbct_selectblock}>
                        <p className={styles.mmbct_p}>Регіон</p>
                        <select onChange={cityTarget} value={cityValue}   className={styles.mmbct_select} name="" id="">
                            <option value={0} defaultChecked>Не обрано</option>
                            {cities?.map((city, index) => (
                                <option key={index} value={`${index+1}`}>{city.city_name}</option>
                            ))}
                        </select>
                    </div>
                    <div className={styles.mmbct_selectblock}>
                        <p className={styles.mmbct_p}>Пункт прийому</p>
                        <select onChange={laboratoryTarget} value={labValue} className={styles.mmbct_select} name="" id="">
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
