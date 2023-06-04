import React from "react";
import styles from "./PriceList.module.css";
import Item from "./Item";
import axios from "../../axios";

const PriceList = () => {
    const [items, setItems] = React.useState([]);
    const [limit, setLimit] = React.useState(100);

    const [searchTerm, setSearchTerm] = React.useState('');

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filterData = () => {
        return items.filter(item => {
            // Сравнение и определение схожести строк
            const similarity = calculateSimilarity(item.name, searchTerm);
            return similarity > 0.5; // Пример порогового значения для схожести
        });
    };
    
    const calculateSimilarity = (string1, string2) => {
        // Реализуйте логику сравнения строк и определения схожести
        // Можно использовать алгоритмы, такие как Levenshtein distance или fuzzy search
        // В этом примере просто сравниваем строки без особых алгоритмов
        const normalizedString1 = string1.toLowerCase();
        const normalizedString2 = string2.toLowerCase();
        return normalizedString1.includes(normalizedString2) ? 1 : 0;
    };

    const filteredData = filterData();

    React.useEffect(() => {
        // window.scrollTo(0, 0);
        axios
            .get(`/analyzes?page=1&limit=${limit}`)
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

    // React.useEffect(() => {
    //     if(items.length > 0) {
    //         const filteredData = filterData();
    //     }
    // }, [items])

    return (
        <main className={styles.Main_PriceList}>
            <h1 className={styles.mp_h1}>Аналізи та ціни</h1>
            <div className={styles.mp_search}>
                <input type="text" value={searchTerm} onChange={handleSearch} className={styles.mps_input} placeholder="Введіть назву дослідження"/>
                <button className={styles.mps_butt}>Пошук<div className={styles.mps_img}></div></button>
            </div>
            <div className={styles.mp_itemblock}>
                {filteredData.map((item, index) => (
                    <Item key={index} id={item.id} name={item.name} price={item.price} item={item}/>
                ))}
            </div>
            {/* <div className={styles.mp_lineblock}>
                <button onClick={() => setLimit(limit + 10)} className={styles.mplb_butt}>Завантажити ще</button>
            </div> */}
        </main>
    );
};

export default PriceList;
