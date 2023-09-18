// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, FormEvent, useReducer } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./styles/Form.module.css";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import useURLPosition from "../hooks/useURLPosition";
import Message from "./Message";
import Spinner from "./Spinner";
import { FormReducerAction, City } from "./types";
import { useCities } from "../hooks/useCities";

export function convertToEmoji(countryCode: string) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const BASE_API =
  "https://api.bigdatacloud.net/data/reverse-geocode-client?";

const initialState = {
  loading: false,
  date: new Date(),
  cityName: "",
  country: "",
  notes: "",
  emoji: "",
  mapErr: "",
};

function reducer(
  state: typeof initialState,
  action: FormReducerAction
): typeof initialState {
  switch (action.type) {
    case "start":
      return { ...state, loading: true, mapErr: "" };
    case "cityName":
      return { ...state, cityName: action.payload };
    case "error":
      return { ...state, mapErr: action.payload };
    case "date":
      return { ...state, date: action.payload };
    case "note":
      return { ...state, notes: action.payload };
    case "data":
      return {
        ...state,
        emoji: action.payload.emoji,
        country: action.payload.country,
        cityName: action.payload.cityName,
        loading: false,
      };
    default:
      return state;
  }
}

function Form() {
  const [
    { loading, mapErr, cityName, date, country, notes, emoji },
    dispatch,
  ] = useReducer(reducer, initialState);
  const { addCity, isLoading } = useCities();
  const [lat, lng] = useURLPosition();
  const navigate = useNavigate();

  useEffect(() => {
    if (!lat || !lng) return;
    async function fetchingLocation() {
      try {
        dispatch({ type: "start" });
        const res = await fetch(
          `${BASE_API}latitude=${lat}&longitude=${lng}`
        );

        const data = await res.json();

        if (data.countryName === "")
          throw new Error(
            "You entered a Black Hole Please choose another place Homie"
          );

        dispatch({
          type: "data",
          payload: {
            cityName:
              (data.city as string) || (data.locality as string) || "",
            emoji: convertToEmoji(data.countryCode),
            country: data.countryName as string,
          },
        });
      } catch (error) {
        dispatch({ type: "error", payload: (error as Error).message });
      }
    }

    fetchingLocation().catch((err) => console.log(err));
  }, [lat, lng]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!cityName || !date) return;
    const newCity: City = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: {
        lat: Number(lat),
        lng: Number(lng),
      },
    };

    await addCity(newCity).catch((err) => console.log(err));
    navigate("/app/cities");
  }

  if (!lat || !lng) return <Message message="Please add lat and lng" />;

  if (mapErr) return <Message message={mapErr} />;

  if (loading) return <Spinner />;

  return (
    <form className={`${styles.form} ${isLoading ? styles.loading : ""}`}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) =>
            dispatch({ type: "cityName", payload: e.target.value })
          }
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(new Date(e.target.value))}
          value={date}
        /> */}

        <DatePicker
          selected={date}
          onChange={(date: Date) =>
            dispatch({ type: "date", payload: date })
          }
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) =>
            dispatch({ type: "note", payload: e.target.value })
          }
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button
          type="back"
          onClick={(e: Event) => {
            e.preventDefault();
            navigate(-1);
          }}
        >
          &larr; Back
        </Button>
        <Button type="primary" onClick={handleSubmit}>
          Add
        </Button>
      </div>
    </form>
  );
}

export default Form;
