import { FC, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCities } from "../hooks/useCities";
import styles from "./styles/City.module.css";
import Button from "./Button";
import Spinner from "./Spinner";

const formatDate = (date: Date | null) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date ? date : 0));

const City: FC = () => {
  const { id } = useParams();
  const { getCity, currentCity, isLoading } = useCities();
  const navigate = useNavigate();

  const { cityName, emoji, date, notes } = currentCity;

  useEffect(() => {
    async function fetching() {
      await getCity(id ? id : "");
    }

    fetching().catch((err) => console.log(err));
  }, [id, getCity]);

  if (isLoading) return <Spinner />;

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>
      <div className={styles.buttons}>
        <Button type="back" onClick={() => navigate(-1)}>
          &larr; Back
        </Button>
      </div>
    </div>
  );
};
export default City;
