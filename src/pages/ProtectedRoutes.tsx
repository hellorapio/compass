import { FC, useEffect } from "react";
import { useFakeAuth } from "../hooks/useFakeAuth";
import { useNavigate } from "react-router-dom";

const ProtectedRoutes: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated } = useFakeAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  return children;
};

export default ProtectedRoutes;
