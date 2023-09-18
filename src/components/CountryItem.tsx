import { FC } from "react";
import styles from "./styles/CountryItem.module.css";
import { CountryItemProp } from "./types";

const CountryItem: FC<CountryItemProp> = ({ country }) => {
  return (
    <li className={styles.countryItem}>
      <span className={styles.emoji}>{country.emoji}</span>
      <h3 className={styles.name}>{country.country}</h3>
    </li>
  );
};

export default CountryItem;
