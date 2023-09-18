import { FC } from "react";
import NormalNav from "../components/NormalNav";
import styles from "./styles/Tours.module.css";

const Tours: FC = () => {
  return (
    <main className={styles.tours}>
      <NormalNav></NormalNav>
      <section className={styles.main}>
        <section className={`container`}>
          <h2>
            Welcome to...
            <br />
            <span>London</span>
          </h2>
          <section className={styles.imgs}>
            <img src="pexels-anthony-macajone-3094822.jpg" alt="London" />
            <img src="pexels-toa-heftiba-şinca-940309.jpg" alt="London" />
            <img src="pexels-lina-kivaka-2773891.jpg" alt="London" />
            <img src="pexels-yelena-odintsova-12237149.jpg" alt="London" />
            <img src="pexels-szymon-shields-14872685.jpg" alt="London" />
          </section>
          <h2 className={`${styles.flex}`}>
            <span>We Are Waiting For You</span>
          </h2>
        </section>
      </section>
    </main>
  );
};

export default Tours;
