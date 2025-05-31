import { Link2 } from "lucide-react";
import { Button } from "./ui/button";
import { ModeToggle } from "./mode-toggle";
import { Link } from "react-router-dom";
import useAuthStore from "@/store/useAuthStore";

const Navbar = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);

  return (
    <div className="absolute top-0 left-0 z-10 h-[80px] w-full flex justify-between items-center px-25 font-clash">
      <div className="flex items-center gap-2">
        <Link2 className="w-8 h-8" />
        <Link to={"/"} className="text-3xl font-bold">
          Linkify
        </Link>
      </div>
      <div className="flex items-center gap-6">
        <ModeToggle />
        {isAuthenticated ? (
          <Link to={"/profile"}>
            <Button>{user?.username}</Button>
          </Link>
        ) : (
          <Link to={"/login"}>
            <Button>Sign in</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
