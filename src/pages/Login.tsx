import { FC, useState, useEffect, FormEvent } from "react";
import Nav from "../components/NormalNav";
import styles from "./styles/Login.module.css";
import { useNavigate } from "react-router-dom";
import { useFakeAuth } from "../hooks/useFakeAuth";
import Button from "../components/Button";

const Login: FC = () => {
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");
  const { login, isAuthenticated } = useFakeAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated === true) navigate("/app", { replace: true });
  }, [isAuthenticated, navigate]);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (email && password) login(email, password);
  }

  return (
    <main className={styles.login}>
      <Nav></Nav>
      <section>
        <h1>Welcome Back.</h1>
        <p>Please login into Your Account</p>
        <form className="container" onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              value={email}
              placeholder="email"
            />
          </div>
          <div>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              value={password}
              placeholder="password"
            />
          </div>
          <div>
            <Button type="primary">Login</Button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default Login;
