import { LoginForm } from "@/components/login-form";
import Navbar from "@/components/navbar";
import authService from "@/services/authService";
import useAuthStore from "@/store/useAuthStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const setUser = useAuthStore((state) => state.setUser);
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (formData: { email: string; password: string }) => {
    const response = await authService.logIn(formData);
    if (response) {
      setUser({
        username: response.user.username,
        email: response.user.email,
      });
      setAccessToken(response.accessToken);
      setIsAuthenticated(true);
      navigate("/");
    }
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <Navbar />
      <div className="w-full max-w-sm">
        <LoginForm onLogin={handleLogin} />
      </div>
    </div>
  );
}
