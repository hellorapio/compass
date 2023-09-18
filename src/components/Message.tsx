import { FC } from "react";
import styles from "./styles/Message.module.css";

const Message: FC<{ message: string }> = ({ message }) => {
  return <p className={styles.message}>{message}</p>;
};

export default Message;
