import api from "@/api";
import type { User } from "@/types";
import { HttpStatus } from "@/types/httpStatus";
import toast from "react-hot-toast";

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
  message: string;
}

const authService = {
  signUp: async (userData: {
    username: string;
    email: string;
    password: string;
  }): Promise<AuthResponse | null> => {
    try {
      const response = await api.post("/auth/register", userData);
      if (response.status === HttpStatus.CREATED) {
        localStorage.setItem("userToken", response.data.accessToken);
        toast.success(response.data.message);
        return response.data;
      }
      return null;
    } catch (error) {
      console.error("Signup Error:", error);
      return null;
    }
  },

  logIn: async (userData: {
    email: string;
    password: string;
  }): Promise<AuthResponse | null> => {
    try {
      const response = await api.post("/auth/login", userData);
      if (response.status === HttpStatus.OK) {
        localStorage.setItem("userToken", response.data.accessToken);
        toast.success(response.data.message);
        return response.data;
      }
      return null;
    } catch (error) {
      console.error("Login Error:", error);
      return null;
    }
  },
};

export default authService;
