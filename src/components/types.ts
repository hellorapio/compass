export type City = {
  cityName: string;
  country: string;
  emoji: string;
  date: Date;
  notes: string;
  position: {
    lat: number;
    lng: number;
  };
  id?: number;
};

export type CityItemProp = {
  city: City;
};

export type CountryItemProp = {
  country: {
    country: string;
    emoji: string;
  };
};

export type ButtonProps = {
  onClick?: (e: Event) => void;
  type: "position" | "back" | "primary";
  children: React.ReactNode;
};

export type CitiesContext = {
  isLoading: boolean;
  error: string;
  cities: City[];
  currentCity: City;
  getCity: (id: string) => Promise<void>;
  addCity: (newCity: City) => Promise<void>;
  deleteCity: (id: string) => Promise<void>;
};

export type FormReducerAction =
  | {
      type: "start";
    }
  | {
      type: "cityName" | "note" | "error";
      payload: string;
    }
  | {
      type: "date";
      payload: Date;
    }
  | {
      type: "data";
      payload: {
        cityName: string;
        country: string;
        emoji: string;
      };
    };

export type ContextReducerAction =
  | {
      type: "loading";
    }
  | {
      type: "cities/deleted" | "rejected";
      payload: string;
    }
  | {
      type: "cities/loaded";
      payload: City[];
    }
  | {
      type: "city/loaded" | "cities/added";
      payload: City;
    };

export type FakeAuthContextType = {
  login: (email: string, password: string) => void;
  logout: () => void;
  user: {
    name: string;
    email: string;
    password: string;
    avatar: string;
  } | null;
  isAuthenticated: boolean;
};

export type ReducerActionAuth =
  | {
      type: "login";
      payload: {
        name: string;
        email: string;
        password: string;
        avatar: string;
      };
    }
  | {
      type: "logout";
    };
