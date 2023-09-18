import { FC, lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Country from "./components/Country";
import Form from "./components/Form";
import FakeAuthProvider from "./contexts/FakeAuthContext";
import ProtectedRoutes from "./pages/ProtectedRoutes";
import SpinnerPage from "./components/SpinnerPage";
const Login = lazy(() => import("./pages/Login"));
const Homepage = lazy(() => import("./pages/Homepage"));
const About = lazy(() => import("./pages/About"));
const Tours = lazy(() => import("./pages/Tours"));
const MainApp = lazy(() => import("./pages/MainApp"));
const NotFound = lazy(() => import("./pages/NotFound"));

const App: FC = () => {
  return (
    <div>
      <FakeAuthProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerPage />}>
            <Routes>
              <Route index element={<Homepage />}></Route>
              <Route path="about" element={<About />}></Route>
              <Route path="login" element={<Login />}></Route>
              <Route path="tours" element={<Tours />}></Route>
              <Route
                path="app"
                element={
                  <ProtectedRoutes>
                    <MainApp />
                  </ProtectedRoutes>
                }
              >
                <Route
                  index
                  element={<Navigate replace to="cities" />}
                ></Route>
                <Route path="cities" element={<CityList />}></Route>
                <Route path="cities/:id" element={<City />}></Route>
                <Route path="countries" element={<CountryList />}></Route>
                <Route path="countries/:id" element={<Country />}></Route>
                <Route path="form" element={<Form />}></Route>
              </Route>
              <Route path="*" element={<NotFound />}></Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </FakeAuthProvider>
    </div>
  );
};

export default App;
