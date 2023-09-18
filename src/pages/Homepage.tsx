import { FC } from "react";
import NormalNav from "../components/NormalNav";
import styles from "./styles/Homepage.module.css";
import { Link } from "react-router-dom";
const Homepage: FC = () => {
  return (
    <main className={`${styles.homepage}`}>
      <NormalNav></NormalNav>
      <section className="container">
        <h1>Compass joins you to track your tours and adventures.</h1>
        <h2>
          At Compass Tours, we believe that the world is a vast and
          beautiful place, meant to be explored and experienced. Our
          passion for travel has led us to curate the most captivating and
          unforgettable tours around the globe. Whether you're a seasoned
          adventurer or a first-time traveler, we are here to take you on a
          journey of a lifetime.
        </h2>
        <Link className="cta-btn" to="/login">
          Start Tracking
        </Link>
      </section>
    </main>
  );
};

export default Homepage;
