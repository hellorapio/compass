import { FC, useReducer } from "react";
import { FakeAuthContext } from "../hooks/useFakeAuth";
import { ReducerActionAuth } from "../components/types";

const initialState: {
  user: null | typeof FAKE_USER;
  isAuthenticated: boolean;
} = {
  user: null,
  isAuthenticated: false,
};

function reducer(
  state: typeof initialState,
  action: ReducerActionAuth
): typeof initialState {
  switch (action.type) {
    case "login":
      return { isAuthenticated: true, user: action.payload };
    case "logout":
      return { isAuthenticated: false, user: null };
    default:
      throw new Error("Unknown Type has been passed");
  }
}

const FAKE_USER = {
  name: "Rapio",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

const FakeAuthProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function login(email: string, password: string) {
    if (email === FAKE_USER.email && password === FAKE_USER.password)
      dispatch({ type: "login", payload: FAKE_USER });
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <FakeAuthContext.Provider
      value={{ login, logout, user, isAuthenticated }}
    >
      {children}
    </FakeAuthContext.Provider>
  );
};

export default FakeAuthProvider;
