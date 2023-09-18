import { createContext, useContext } from "react";
import { FakeAuthContextType } from "../components/types";

export const FakeAuthContext = createContext<
  undefined | FakeAuthContextType
>(undefined);

export function useFakeAuth() {
  const context = useContext(FakeAuthContext);
  if (context === undefined)
    throw new Error("Don't use it out of Provider");
  return context;
}
