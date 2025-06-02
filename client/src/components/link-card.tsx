import {
  Calendar,
  Clipboard,
  Globe,
  Pointer,
  SquarePen,
  Trash,
} from "lucide-react";
import { Button } from "./ui/button";
import type { Url } from "@/types";
import { format } from "date-fns";
import toast from "react-hot-toast";
import urlService from "@/services/urlService";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import React, { useState } from "react";

const LinkCard = ({
  urls,
  onChange,
}: {
  urls: Url[];
  onChange: () => void;
}) => {
  const [editingUrlId, setEditingUrlId] = useState<string | null>(null);
  const [editUrl, setEditUrl] = useState<string>("");

  if (!urls || urls.length === 0) {
    return <h1>No links yet!</h1>;
  }

  const handleDeleteUrl = async (urlId: string) => {
    await urlService.deleteUrl(urlId);
    onChange();
  };

  const handleEditUrl = async (e: React.FormEvent) => {
    e.preventDefault();
    await urlService.editUrl(editingUrlId as string, editUrl);
    onChange();
  };

  return (
    <>
      {urls &&
        urls?.map((url: Url) => (
          <div
            key={url._id}
            className="bg-transparent border-2 rounded-lg py-10 px-15"
          >
            <div className="flex justify-between mb-5">
              <div className="flex items-center">
                <Globe className="h-12 w-12" />
              </div>
              <div>
                {/* <h1>www.example.com – untitled</h1> */}
                <a
                  href={`${import.meta.env.VITE_URL_PREFIX}${url.shortCode}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Short url:{" "}
                  <span className="underline">
                    {`${import.meta.env.VITE_URL_PREFIX}${url.shortCode}`}
                  </span>
                </a>
                <h1>Long url: {url.originalUrl}</h1>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `${import.meta.env.VITE_URL_PREFIX}${url.shortCode}`
                    );
                    toast.success("URL copied");
                  }}
                >
                  <Clipboard className="mr-2 h-4 w-4" />
                  Copy
                </Button>

                <div>
                  <Dialog>
                    <DialogTrigger
                      asChild
                      onClick={() => {
                        setEditingUrlId(url._id);
                        setEditUrl(url.originalUrl);
                      }}
                    >
                      <Button>
                        <SquarePen />
                        Edit
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <form onSubmit={handleEditUrl}>
                        <DialogHeader>
                          <DialogTitle>Edit url</DialogTitle>
                          <DialogDescription>
                            Make changes to your url here. Click save when
                            you&apos;re done.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4">
                          <div className="grid gap-3">
                            <Label htmlFor="name-1">Url</Label>
                            <Input
                              id="name-1"
                              name="name"
                              value={editUrl}
                              onChange={(e) => setEditUrl(e.target.value)}
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                          </DialogClose>
                          <Button type="submit">Save changes</Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>

                <Button
                  variant={"destructive"}
                  onClick={() => handleDeleteUrl(url._id)}
                >
                  <Trash />
                  Delete
                </Button>
              </div>
            </div>
            <hr />
            <div className="flex gap-10 mt-5">
              <div className="flex items-center gap-2">
                <Calendar />
                {format(new Date(url.createdAt), "dd MMM yyyy")}
              </div>

              <div className="flex items-center gap-2">
                <Pointer />
                {url.clicks}
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default LinkCard;
