import LinkCard from "@/components/link-card";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useAuthStore from "@/store/useAuthStore";
import { ArrowRight } from "lucide-react";

const Home = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <div>
      <Navbar />
      <div className="relative w-full h-screen flex flex-col justify-center items-center gap-3 font-clash">
        <h1 className="text-4xl font-bold">
          Simplify Your Links. Amplify Your Impact.
        </h1>
        <p className="text-xl text-center mb-5">
          Linkify turns long, messy URLs into short, shareable links in just one
          click.
          <br />
          Perfect for social media, messaging, or tracking your <br />
          campaigns.
        </p>
        <div className="flex gap-4 mb-5">
          <div className="grid gap-2 w-[450px]">
            <Input
              id="url"
              type="text"
              placeholder="https://example.com/my-long-url"
              required
            />
          </div>
          {isAuthenticated ? (
            <Button>Create your Linkify link</Button>
          ) : (
            <Button>
              Get Started
              <ArrowRight />
            </Button>
          )}
        </div>
      </div>

      <div className="w-full h-screen px-20 py-5 font-clash">
        <h1 className="text-3xl font-bold mb-10">Your Links</h1>
        <div className="flex flex-col gap-8">
          <LinkCard />
          <LinkCard />
        </div>
      </div>
    </div>
  );
};

export default Home;
