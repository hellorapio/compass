import { FC } from "react";
import { Outlet } from "react-router-dom";
import { CitiesProvider } from "../contexts/CitiesContext";
import styles from "./styles/Sidebar.module.css";
import Logo from "./Logo";
import AppNav from "./AppNav";
import Footer from "./Footer";
import User from "./User";

const Sidebar: FC = () => {
  return (
    <aside className={styles.sidebar}>
      <Logo />
      <AppNav />
      <Outlet />
      <Footer />
      <User />
    </aside>
  );
};

export default Sidebar;
