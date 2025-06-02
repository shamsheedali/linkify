import api from "@/api";
import { HttpStatus } from "@/types/httpStatus";
import toast from "react-hot-toast";

const urlService = {
  getUrls: async () => {
    try {
      const response = await api.get("/url");
      if (response.status === HttpStatus.OK) {
        return response.data;
      }
      return null;
    } catch (error) {
      console.error(`Error while fetching urls ${error}`);
      return null;
    }
  },

  createShortUrl: async (longUrl: string) => {
    try {
      const response = await api.post("/url", { originalUrl: longUrl });
      if (response.status === HttpStatus.CREATED) {
        // toast.success()
        return response.data;
      }
      return null;
    } catch (error) {
      console.error(`Error while creating url ${error}`);
      return null;
    }
  },

  editUrl: async (urlId: string, url: string) => {
    try {
      const response = await api.patch(`/url/${urlId}`, {originalUrl: url})
      if(response.status === HttpStatus.OK) toast.success("Url updated")
    } catch (error) {
      console.error(`Error while updating url ${error}`)
    }
  },

  deleteUrl: async(urlId: string) => {
    try {
      const response = await api.delete(`/url/${urlId}`);
      if(response.status === HttpStatus.OK) toast.success('Url deleted');
    } catch (error) {
      console.error(`Error while deleting url ${error}`)
    }
  }
};

export default urlService;
