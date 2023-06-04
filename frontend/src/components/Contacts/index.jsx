import React from "react";

// import { NavLink } from "react-router-dom";
import Map from "../Map";
import styles from "./Contacts.module.css";
import MapBlock from "../MapBlock";

const Contacts = ({ user_role }) => {
    return (
        <main className={styles.c_main}>
            <h1 className={styles.cm_h1}>Контакти</h1>
            <div className={styles.cm_container_contact}>
                <div className={styles.cm_contactblock}>
                    <div className={styles.cm_container}>
                        <div className={styles.cmc_phone_block}>
                            <p className={styles.cmcpb_name}>Vodafone</p>
                            <p className={styles.cmcpb_phone}>+380667468550</p>
                            <p className={styles.cmcpb_phone}>+380958652540</p>
                        </div>
                        <div className={styles.cmc_phone_block}>
                            <p className={styles.cmcpb_name}>Kievstar</p>
                            <p className={styles.cmcpb_phone}>+380685478680</p>
                            <p className={styles.cmcpb_phone}>+380977573630</p>
                        </div>
                        <div className={styles.cmc_phone_block}>
                            <p className={styles.cmcpb_name}>Lifecell</p>
                            <p className={styles.cmcpb_phone}>+380638558590</p>
                            <p className={styles.cmcpb_phone}>+380934453640</p>
                        </div>
                        <div className={styles.cmcpb_info}>
                            <p className={styles.cmcpbi_p}>Відповідаємо:</p>
                            <p className={styles.cmcpbi_p}>Пн-пт: <span>8:00</span> - <span>20:00</span></p>
                            <p className={styles.cmcpbi_p}>Сб-вс: <span>10:00</span> - <span>16:00</span></p>
                        </div>
                    </div>
                </div>
            </div>
            <MapBlock/>
        </main>
    );
};

export default Contacts;
