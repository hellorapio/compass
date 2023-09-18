import { FC } from "react";
import NormalNav from "../components/NormalNav";
import styles from "./styles/About.module.css";

const About: FC = () => {
  return (
    <div>
      <main className={styles.about}>
        <NormalNav />
        <section className={`container ${styles.wrapper}`}>
          <img src="pexels-pixabay-220836.jpg" alt="Tour img" />
          <section>
            <h2>Creating Memories Together</h2>
            <p>
              We believe that the best memories are made when shared with
              others. Our carefully curated group tours provide you with
              the opportunity to forge new friendships and create lasting
              bonds with fellow travelers who share your passion for
              exploration. Whether you're traveling solo or with a group,
              our tours foster a sense of camaraderie and adventure that
              will make your journey even more rewarding.
            </p>
          </section>
        </section>
        <section className={`container ${styles.wrapper}`}>
          <section>
            <h2>Start Your Extraordinary Journey</h2>
            <p>
              Embark on a transformative travel experience with Compass
              Tours and unlock the wonders of the world. Let us be your
              guide as you traverse the globe, collecting priceless
              memories, and gaining newfound perspectives. Whether it's the
              ancient wonders of Egypt, the vibrant streets of Tokyo, or
              the serene landscapes of New Zealand, our tours promise an
              experience like no other. Join us today, and let the compass
              of exploration lead you to extraordinary destinations around
              the world!
            </p>
          </section>
          <img src="pexels-the-world-hopper-1851481.jpg" alt="Tour img" />
        </section>
      </main>
    </div>
  );
};

export default About;
