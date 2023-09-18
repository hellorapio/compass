import { FC } from "react";
import styles from "./styles/Button.module.css";
import { ButtonProps } from "./types";

const Button: FC<ButtonProps> = ({ onClick, type, children }) => {
  return (
    <button onClick={onClick} className={`${styles[type]} ${styles.btn}`}>
      {children}
    </button>
  );
};

export default Button;
