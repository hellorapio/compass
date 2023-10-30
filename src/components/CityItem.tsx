import { FC } from "react";
import styles from "./styles/CityItem.module.css";
import { CityItemProp } from "./types";
import { Link } from "react-router-dom";
import { useCities } from "../hooks/useCities";

const formatDate = (date: Date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

const CityItem: FC<CityItemProp> = ({ city }) => {
  const {
    emoji,
    cityName,
    date,
    position: { lat, lng },
    id,
  } = city;

  const { currentCity, deleteCity } = useCities();

  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          currentCity.id === id ? styles["cityItem--active"] : ""
        }`}
        to={`${city.id ? city.id : ""}?lat=${lat}&lng=${lng}`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button
          className={styles.deleteBtn}
          onClick={(e) => {
            e.preventDefault();
            deleteCity(id ? id : "").catch((err) => console.log(err));
          }}
        >
          &times;
        </button>
      </Link>
    </li>
  );
};

export default CityItem;
