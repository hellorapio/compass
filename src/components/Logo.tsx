import { Link } from "react-router-dom";
import styles from "./styles/Logo.module.css";
import logo from "./../assets/compass-logo-3.png";
const Logo = () => {
  return (
    <Link to="/">
      <img src={logo} alt="Compass" className={styles.logo} />
    </Link>
  );
};

export default Logo;
