import { FC } from "react";
import Sidebar from "../components/Sidebar";
import Map from "../components/Map";
import styles from "./styles/MainApp.module.css";
import { CitiesProvider } from "../contexts/CitiesContext";
const MainApp: FC = () => {
  return (
    <main className={styles.app}>
      <CitiesProvider>
        <Sidebar />
        <Map />
      </CitiesProvider>
    </main>
  );
};

export default MainApp;
