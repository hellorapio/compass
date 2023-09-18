import { createContext, useContext } from "react";
import { CitiesContext as CitiesContextType } from "../components/types";

export const CitiesContext = createContext<undefined | CitiesContextType>(
  undefined
);

export const useCities = () => {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("Don't use Context out of it's Provider");
  return context;
};
