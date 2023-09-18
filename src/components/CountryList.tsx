import { FC } from "react";
import styles from "./styles/CountryList.module.css";
import CountryItem from "./CountryItem";
import Message from "./Message";
import Spinner from "./Spinner";
import { useCities } from "../hooks/useCities";

const CountryList: FC = () => {
  const { cities, isLoading } = useCities();
  const filteredCountries = [
    ...new Map(
      cities.map((city) => [
        city.country,
        { country: city.country, emoji: city.emoji },
      ])
    ).values(),
  ];

  if (isLoading) return <Spinner />;

  if (filteredCountries.length === 0)
    return <Message message="Add Countries from the Map" />;

  return (
    <ul className={styles.countryList}>
      {filteredCountries.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
};

export default CountryList;
