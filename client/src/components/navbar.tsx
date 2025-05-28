import { Link2 } from "lucide-react";
import { Button } from "./ui/button";
import { ModeToggle } from "./mode-toggle";

const Navbar = () => {
  return (
    <div className="absolute top-0 left-0 z-10 h-[80px] w-full flex justify-between items-center px-25 font-clash">
      <div className="flex items-center gap-2">
        <Link2 className="w-8 h-8"  />
        <a href="#" className="text-3xl font-bold">Linkify</a>
      </div>
      <div className="flex items-center gap-6">
        <ModeToggle />
        <Button>Sign in</Button>
      </div>
    </div>
  );
};

export default Navbar;
