import React from "react";
// import { Link, useLocation } from "react-router-dom";
import styles from "./Header.module.css";
import { NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuth } from "../../Redux/Slices/auth";

const HeaderMain = () => {
  const location = useLocation();
  const isAuth = useSelector(selectIsAuth);
  const basket = useSelector((state) => state.basket || []);
  const data = useSelector((state) => state.auth.data || []);
  // const token = window.localStorage.getItem("token");
  // const isAmountInBasket = useSelector((state) => state.basket.AmountItemInBasket);

  return (
    <header className={styles.Header_block}>
      <div className={styles.h_backimg}>
        <div className={styles.hb_alpha}>
          <div className={styles.h_container}>
            <h1 className={styles.hc_brandname}>LabFinder</h1>
            <nav className={styles.hc_nav}>
              <NavLink className={styles.hc_navlinks} to='/'><span>Головна</span></NavLink>
              <NavLink className={styles.hc_navlinks} to='/price'><span>Ціни</span></NavLink>
              <NavLink className={styles.hc_navlinks} to='/aboutus'><span>Про нас</span></NavLink>
              <NavLink className={styles.hc_navlinks} to='/contacts'><span>Контакти</span></NavLink>
            </nav>
            {!isAuth ? (
              <NavLink className={styles.hc_butt} to='/auth/login' >Увійти</NavLink>
            ) : (
              <div>
                {data.user_role === "ADMIN" && (
                  <NavLink className={styles.hc_navlinks} to='/admin'><span>Адмін Панель</span></NavLink>
                )}
                {basket !== [] ? (
                  <NavLink className={styles.hc_butt1} to='/basket' >{basket.amount_basketAnalyzes} | Кошик</NavLink>
                ) : (
                  <NavLink className={styles.hc_butt1} to='/basket' >0 | Кошик</NavLink>
                )}
                <NavLink className={styles.hc_butt} to='/personalcab' >Профіль</NavLink>
              </div>
            )}
            
          </div>
          {location.pathname === "/" && (
            <div className={styles.h_container1}>
              <span className={styles.hc1_span}>Записуйтесь до будь-якої нашої<br/> лабораторії для здачі аналізів<br/> <span className={styles.hc1_span1}>Ми чекаємо на вас!</span></span>
              <div className={styles.hc1_block}>
                <h1 className={styles.hc1b_h1}>Запис на прийом <br/><span className={styles.hc1b_span}>для здачі медичних аналіз</span></h1>
                <h1 className={styles.hc1b_h1}>Ми чекаємо на вас у наших <span className={styles.hc1b_span}>лабораторіях</span></h1>
                <div className={styles.hc1b_buttblock}>
                  <NavLink to='/price' className={styles.hc1b_butt}>Записатись</NavLink>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default HeaderMain;
