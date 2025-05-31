import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import useAuthStore from "@/store/useAuthStore";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    toast.success("Logout successful");
  };

  return (
    <div>
      <Navbar />
      <div className="relative w-full h-screen flex items-center px-30 py-50 gap-3 font-clash">
        <div className="h-30 w-30 rounded-full bg-black"></div>
        <div>
          <h1>{user?.username}</h1>
          <h1>{user?.email}</h1>
        </div>
        <Button variant={"destructive"} className="ml-20" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Profile;
