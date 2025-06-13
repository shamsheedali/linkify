import LinkCard from "@/components/link-card";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import urlService from "@/services/urlService";
import useAuthStore from "@/store/useAuthStore";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [longUrl, setLongUrl] = useState("");
  const [urls, setUrls] = useState([]);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const fetchUrls = async () => {
    const data = await urlService.getUrls();
    setUrls(data);
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchUrls();
    } else {
      setUrls([]);
    }
  }, [isAuthenticated]);

  const handleCreateUrl = async () => {
    if (!longUrl.trim()) return;

    setLoading(true);
    try {
      await urlService.createShortUrl(longUrl);
      toast.success("Short URL created");
      setLongUrl("");
      fetchUrls();
    } catch (error) {
      console.log(error);
      toast.error("Failed to create short URL");
    } finally {
      setLoading(false);
    }
  };

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
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              required
            />
          </div>
          {isAuthenticated ? (
            <Button onClick={handleCreateUrl} disabled={loading}>
              {loading ? "Creating link..." : "Create your Linkify link"}
            </Button>
          ) : (
            <Link to={"/login"}>
              <Button>
                Get Started
                <ArrowRight />
              </Button>
            </Link>
          )}
        </div>
      </div>

      <div className="w-full h-fit px-20 py-5 font-clash">
        <h1 className="text-3xl font-bold mb-10">Your Links</h1>
        <div className="flex flex-col gap-8">
          <LinkCard urls={urls} onChange={fetchUrls} />
        </div>
      </div>
    </div>
  );
};

export default Home;
