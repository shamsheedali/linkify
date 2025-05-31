import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  username: string;
  email: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;

  setUser: (user: User) => void;
  setAccessToken: (token: string) => void;
  setIsAuthenticated: (auth: boolean) => void;

  logout: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,

      setUser: (user: User) => set({ user }),
      setAccessToken: (token: string) => set({ accessToken: token }),
      setIsAuthenticated: (auth: boolean) => set({ isAuthenticated: auth }),

      logout: () => {
        set({ user: null, accessToken: null, isAuthenticated: false });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);

export default useAuthStore;
