import { NavLink, Link } from "react-router-dom";
import styles from "./styles/NormalNav.module.css";
import Logo from "./Logo";
const NormalNav = () => {
  return (
    <nav className={styles.nav}>
      <div className="container">
        <Logo></Logo>
        <ul>
          <li>
            <NavLink to="/about" className="cta">
              About Us
            </NavLink>
          </li>
          <li>
            <NavLink to="/tours" className="cta">
              tours
            </NavLink>
          </li>

          <li>
            <Link to="/login" className="cta-btn">
              login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NormalNav;
