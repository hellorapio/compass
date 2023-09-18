import { FC } from "react";
import styles from "./styles/Footer.module.css";
const Footer: FC = () => {
  return (
    <footer className={styles.footer}>
      <p className={styles.copyright}>
        &copy; All rights reserved to Compass LTD.
      </p>
    </footer>
  );
};

export default Footer;
