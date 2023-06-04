import React from "react";
import styles from "./AboutUs.module.css";

const AboutUs = () => {
    return (
        <main className={styles.Main_AboutUs}>
            <h1 className={styles.ma_h1}>Про нас</h1>
            <div className={`${styles.ma_container} ${styles.ma_container_b_r}`}>
                <p className={styles.mac_p}>LabFinder - це компанія, яка допомагає людям піклуватися про своє здоров'я, 
                    надаючи послуги лабораторних досліджень. Ми впевнені, що здоров'я - це наш головний капітал, тому робимо все можливе, 
                    щоб наші клієнти могли отримати максимально точні та своєчасні результати аналізів.
                </p>
                <div className={styles.mac_img}></div>
            </div>
            <div className={`${styles.ma_container} ${styles.ma_container_b_l}`}>
                <div className={`${styles.mac_img} ${styles.mac_img1}`}></div>
                <p className={styles.mac_p}>Наша компанія була створена в 2015 році і за короткий період часу стала одним з лідерів у галузі лабораторних досліджень. 
                    Ми маємо широку мережу партнерів по всій країні, з якими тісно співпрацюємо, щоб забезпечити високий рівень якості послуг та точність результатів.
                </p>
            </div>
            <div className={`${styles.ma_container} ${styles.ma_container_b_r}`}>
                <p className={styles.mac_p}>В LabFinder ми розуміємо, що візит до лабораторії може бути стресовим і займати багато часу. 
                    Тому ми створили онлайн-сервіс, який допомагає нашим клієнтам записатися на прийом в зручний для них час і найближчу лабораторію. 
                    Наш онлайн-сервіс забезпечує конфіденційність даних та зручність у використанні.
                </p>
                <div className={`${styles.mac_img} ${styles.mac_img2}`}></div>
            </div>
            <div className={`${styles.ma_container} ${styles.ma_container_b_l}`}>
                <div className={`${styles.mac_img} ${styles.mac_img3}`}></div>
                <p className={styles.mac_p}>Крім того, ми пропонуємо широкий спектр послуг, включаючи аналізи крові, сечі, фекалій, генетичні тести та інші види досліджень. 
                    Наші клієнти можуть бути впевнені, що ми надаємо лише найсучасніші та точні методи діагностики.
                </p>
            </div>
            <div className={`${styles.ma_container} ${styles.ma_container_b_r}`}>
                <p className={styles.mac_p}>Ми також забезпечуємо безпеку та конфіденційність даних наших клієнтів. 
                    Ми використовуємо захищені технології для зберігання та обробки медичних даних та гарантуємо, що ці дані не будуть передані третім особам без дозволу клієнта.
                </p>
                <div className={`${styles.mac_img} ${styles.mac_img4}`}></div>
            </div>
            <div className={`${styles.ma_container} ${styles.ma_container_b_l}`}>
                <div className={`${styles.mac_img} ${styles.mac_img5}`}></div>
                <p className={styles.mac_p}>В LabFinder ми продовжуємо працювати над покращенням наших послуг, щоб забезпечити найвищий рівень задоволення наших клієнтів. 
                    Ми постійно впроваджуємо нові технології та методи дослідження, щоб забезпечити максимальну точність та швидкість отримання результатів.
                </p>
            </div>
            <div className={`${styles.ma_container} ${styles.ma_container_b_r}`}>
                <p className={styles.mac_p}>Наша мета - зробити процес проходження лабораторних досліджень максимально простим, зручним та швидким для наших клієнтів. 
                    Ми зробили все можливе, щоб забезпечити високий рівень якості та точності наших послуг, щоб наші клієнти могли бути впевнені в своєму здоров'ї та добробуті.
                </p>
                <div className={`${styles.mac_img} ${styles.mac_img6}`}></div>
            </div>
            <div className={`${styles.ma_container} ${styles.ma_container_b_l}`}>
                <div className={`${styles.mac_img} ${styles.mac_img7}`}></div>
                <p className={styles.mac_p}>Якщо вам потрібно пройти лабораторне дослідження, ми запрошуємо вас скористатися послугами LabFinder. 
                    Наші досвідчені фахівці забезпечать вам якісне та професійне обслуговування, а наші захищені технології забезпечать конфіденційність та безпеку вашої інформації. 
                    Зв'яжіться з нами сьогодні, і ми допоможемо вам піклуватися про своє здоров'я!
                </p>
            </div>
        </main>
    );
};

export default AboutUs;
