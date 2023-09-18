import { FC, useCallback, useEffect, useReducer } from "react";
import { CitiesContext } from "../hooks/useCities";
import { City, ContextReducerAction } from "../components/types";

const BASE = "http://localhost:8000/";

const initialState: {
  cities: City[];
  isLoading: boolean;
  currentCity: Partial<City>;
  error: string;
} = {
  cities: [],
  isLoading: true,
  currentCity: {},
  error: "",
};

function reducer(
  state: typeof initialState,
  action: ContextReducerAction
) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true, error: "" };
    case "cities/loaded":
      return { ...state, isLoading: false, cities: action.payload };
    case "cities/added":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
      };
    case "cities/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter(
          (city) => city.id !== Number(action.payload)
        ),
        currentCity: {},
      };

    case "city/loaded":
      return {
        ...state,
        currentCity: action.payload,
        isLoading: false,
      };
    case "rejected":
      return { ...state, error: action.payload };
    default:
      return { ...state };
  }
}

export const CitiesProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  // const [cities, setCities] = useState<City[]>([]);
  // const [isLoading, setIsLoading] = useState<boolean>(true);
  // const [currentCity, setCurrentCity] = useState<City>({
  //   cityName: "",
  //   country: "",
  //   emoji: "",
  //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //   // @ts-ignore
  //   date: "",
  //   notes: "",
  //   position: {
  //     lat: 0,
  //     lng: 0,
  //   },
  // });

  useEffect(function () {
    const controller = new AbortController();

    dispatch({ type: "loading" });
    async function fetchCities() {
      try {
        const req = await fetch(`${BASE}cities`, {
          signal: controller.signal,
        });
        const res = (await req.json()) as City[];
        dispatch({ type: "cities/loaded", payload: res });
      } catch (err) {
        dispatch({
          type: "rejected",
          payload: "There was an Error Fetching Cities",
        });
      }
    }

    fetchCities().catch((err) =>
      dispatch({ type: "rejected", payload: (err as Error).message })
    );

    return () => {
      controller.abort();
    };
  }, []);

  const getCity = useCallback(
    async function getCity(id: string) {
      if (Number(id) === currentCity.id) return;

      dispatch({ type: "loading" });
      try {
        const req = await fetch(`${BASE}cities/${id}`);
        const res = (await req.json()) as City;
        dispatch({ type: "city/loaded", payload: res });
      } catch (err) {
        dispatch({
          type: "rejected",
          payload: "There was an Error getting city Data",
        });
      }
    },
    [currentCity.id]
  );

  

  async function addCity(newCity: City) {
    dispatch({ type: "loading" });
    try {
      const req = await fetch(`${BASE}cities/`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: { "Content-Type": "application/json" },
      });
      const res = (await req.json()) as City;

      dispatch({ type: "cities/added", payload: res });
    } catch (err) {
      dispatch({
        type: "rejected",
        payload: "There was an Error adding the city",
      });
    }
  }

  async function deleteCity(id: string) {
    dispatch({ type: "loading" });
    try {
      const req = await fetch(`${BASE}cities/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "cities/deleted", payload: id });
    } catch (err) {
      dispatch({
        type: "rejected",
        payload: "There was an Error deleting the city",
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        currentCity,
        getCity,
        addCity,
        deleteCity,
        error,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
};
