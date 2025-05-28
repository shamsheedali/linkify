import {
  Calendar,
  Clipboard,
  Globe,
  Pointer,
  SquarePen,
  Trash,
} from "lucide-react";
import { Button } from "./ui/button";

const LinkCard = () => {
  return (
    <div className="bg-transparent border-2 rounded-lg py-10 px-15">
      <div className="flex justify-between mb-5">
        <div className="flex items-center">
          <Globe className="h-12 w-12" />
        </div>
        <div>
          <h1>www.example.com – untitled</h1>
          <h1>bit.ly/45xYEoz</h1>
          <h1>
            https://www.example.com/articles/how-to-build-a-url-shortener-th-mern-stack-and-rock-it
          </h1>
        </div>

        <div className="flex gap-3">
          <Button>
            <Clipboard />
            Copy
          </Button>

          <Button>
            <SquarePen />
            Edit
          </Button>
          <Button variant={"destructive"}>
            <Trash />
            Delete
          </Button>
        </div>
      </div>
<hr />
      <div className="flex gap-10 mt-5">
        <div className="flex items-center gap-2">
          <Calendar />
          May 28, 2025
        </div>

        <div className="flex items-center gap-2">
          <Pointer />
          28
        </div>
      </div>
    </div>
  );
};

export default LinkCard;
