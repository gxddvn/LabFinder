import React from "react";
import styles from "./Home.module.css";
import MapBlock from "../MapBlock";
import axios from "../../axios";
import Reviews from "./Reviews";
import { useSelector } from "react-redux";
import { selectIsAuth } from "../../Redux/Slices/auth";
import { NavLink } from "react-router-dom";

const Home = () => {
  const isAuth = useSelector(selectIsAuth);
  const data = useSelector((state) => state.auth.data || []);

  const [reviews, setReview] = React.useState([]);
  const [limit, setLimit] = React.useState(3);
  const [grades, setGrades] = React.useState(0);
  const [grades_block, setGradesBlock] = React.useState([]);
  const [inputValue, setInputValue] = React.useState('');

  React.useEffect(() => {
    axios
        .get(`/reviews?page=1&limit=${limit}`)
        .then((res) => {
            setReview(res.data.rows);
            // console.log(res.data);
        })
        .catch((err) => {
            console.warn(err);
            alert("Помилка при отриманні відгуків");
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit]);

  React.useEffect(() => {
    let arr = [];
    let i = 0;
    while (i < 5) {
      if (i < grades) {
        arr.push(<div key={i+1} data_i={i+1} onClick={(event) => setGrades(event.target.getAttribute('data_i'))} className={`${styles.mcig_grades} ${styles.mcig_grades1}`}></div>);
      }
      else {
        arr.push(<div key={i+1} data_i={i+1} onClick={(event) => setGrades(event.target.getAttribute('data_i'))} className={`${styles.mcig_grades}`}></div>);
      }
      i++;
    }
    setGradesBlock(arr);
  }, [grades]);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (inputValue && grades && data.id) {
      const req = await axios.post('/reviews/', {review: inputValue, grades: grades, usersTableId: data.id})
      console.log(req);
    }
    else {
      console.log('Error!!!');
    }
    setGrades(0);
    setInputValue('');
  };

  return (
    <main className={styles.Main}>
      <MapBlock/>
      <div className={styles.m_statblock}>
        <h1 className={styles.ms_h1}>Наша Статистика</h1>
        <div className={styles.ms_container}>
          <div className={styles.msc_stat}>
            <p className={styles.mscs_circle}>87</p>
            <p>Видів<br/>досліджень</p>
          </div>
          <div className={styles.msc_stat}>
            <p className={`${styles.mscs_circle} ${styles.mscs_circle1}`}>350</p>
            <p>Кваліфікованих<br/>фахівців</p>
          </div>
          <div className={styles.msc_stat}>
            <p className={styles.mscs_circle}>81</p>
            <p>Приймальних<br/>пунктів</p>
          </div>
        </div>
      </div>
      <h1 className={styles.m_h1}>Відгуки</h1>
      <form onSubmit={handleSubmit} className={styles.m_container_input}>
        {!isAuth ? (
          <>
            <div className={styles.mci_blur}>
              <NavLink to='/auth/login' className={styles.mci_butt}>Увійти до кабінету</NavLink>
            </div>
            <div className={styles.mci_inh}>
              <input className={styles.mci_input} type="text" placeholder="Залишити відгук ..." />
              <div className={styles.mci_gradeblock}>
                {grades_block}
              </div>
              <button className={styles.mci_butt}>Відправити</button>
            </div>
          </>
        ) : (
          <>
            <input value={inputValue} onChange={handleChange} className={styles.mci_input} type="text" placeholder="Залишити відгук ..." />
            <div className={styles.mci_gradeblock}>
              {grades_block}
            </div>
            <button type="submit" className={styles.mci_butt}>Відправити</button>
          </>
        )}
      </form>
      <div className={styles.m_container}>
        {reviews.map((review, index) => (
          <Reviews key={index} user_id={review.usersTableId} review={review.review} amount_grades={review.grades} date={review.createdAt}/>
        ))}
        <div className={styles.mc_cont}>
          <button onClick={() => setLimit(limit + 3)} className={styles.mc_butt}>Подивитись ще</button>
        </div>
      </div>
      <div className={styles.m_container_contact}>
        <div className={styles.mcc_contactblock}>
          <h1 className={styles.mccc_h1}>Контакти</h1>
          <div className={styles.mccc_container}>
            <div className={styles.mccc_phone_block}>
              <p className={styles.mcccpb_name}>Vodafone</p>
              <p className={styles.mcccpb_phone}>+380667468550</p>
              <p className={styles.mcccpb_phone}>+380958652540</p>
            </div>
            <div className={styles.mccc_phone_block}>
              <p className={styles.mcccpb_name}>Kievstar</p>
              <p className={styles.mcccpb_phone}>+380685478680</p>
              <p className={styles.mcccpb_phone}>+380977573630</p>
            </div>
            <div className={styles.mccc_phone_block}>
              <p className={styles.mcccpb_name}>Lifecell</p>
              <p className={styles.mcccpb_phone}>+380638558590</p>
              <p className={styles.mcccpb_phone}>+380934453640</p>
            </div>
            <div className={styles.mcccpb_info}>
              <p className={styles.mcccpbi_p}>Відповідаємо:</p>
              <p className={styles.mcccpbi_p}>Пн-пт: <span>8:00</span> - <span>20:00</span></p>
              <p className={styles.mcccpbi_p}>Сб-вс: <span>10:00</span> - <span>16:00</span></p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
