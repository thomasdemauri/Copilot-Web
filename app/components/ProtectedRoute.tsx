import { useEffect } from "react";
import { useNavigate } from "react-router";
import { isAuthenticated } from "../utils/auth";

type Props = {
  children: React.ReactNode;
};

export function ProtectedRoute({ children }: Props) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
    }
  }, [navigate]);

  if (!isAuthenticated()) {
    return null;
  }

  return <>{children}</>;
}
