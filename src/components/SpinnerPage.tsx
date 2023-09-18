import { FC } from "react";
import Spinner from "./Spinner";

import styles from "./styles/SpinnerPage.module.css";
const SpinnerPage: FC = () => {
  return (
    <div className={styles.spinnerFullpage}>
      <Spinner />
    </div>
  );
};

export default SpinnerPage;
