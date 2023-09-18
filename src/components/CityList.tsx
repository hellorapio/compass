import { FC } from "react";
import styles from "./styles/CityList.module.css";
import Spinner from "./Spinner";
import CityItem from "./CityItem";
import Message from "./Message";
import { useCities } from "../hooks/useCities";

const CityList: FC = () => {
  const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner />;

  if (cities.length === 0)
    return <Message message="Add cities from the map" />;

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
};

export default CityList;
