import { FC } from "react";
import styles from "./styles/User.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useFakeAuth } from "../hooks/useFakeAuth";
const User: FC = () => {
  const { user, logout } = useFakeAuth();
  const navigate = useNavigate();
  function handleLogout() {
    logout();
    navigate("/");
  }
  return (
    <div className={styles.user}>
      <img src={user?.avatar} alt={user?.name} />
      <span>Welcome, {user?.name}</span>
      <button className="cta-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default User;
