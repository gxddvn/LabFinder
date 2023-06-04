import React from "react";

import { NavLink } from "react-router-dom";

import styles from "./Footer.module.css";

const Footer = ({ user_role }) => {
  return (
    <footer className={styles.Footer}>
      <div className={styles.f_container}>
        <div className={styles.fc_block}>
          <h1 className={styles.fc_logo}>LabFinder</h1>
          <NavLink to='' className={styles.fc_political}>Політика конфіденційності</NavLink>
        </div>
        <div className={styles.fc_block}>
          <nav className={styles.fc_navblock}>
            <NavLink to='/' className={styles.fc_navlinks}>Головна</NavLink>
            <NavLink to='/price' className={styles.fc_navlinks}>Ціни</NavLink>
            <NavLink to='/aboutus' className={styles.fc_navlinks}>Про нас</NavLink>
            <NavLink to='contacts' className={styles.fc_navlinks}>Контакти</NavLink>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
