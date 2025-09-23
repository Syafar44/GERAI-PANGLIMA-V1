import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { INews } from "@/types/News";

const newsServices = {
  getAllNews: (params?: string) => instance.get(`${endpoint.NEWS}?${params}`),
  getNewsById: (id: string) => instance.get(`${endpoint.NEWS}/${id}`),
  addNews: (payload: INews) =>
    instance.post(endpoint.NEWS, payload),
  deleteNews: (id: string) => instance.delete(`${endpoint.NEWS}/${id}`),
  updateNews: (id: string, payload: INews) =>
    instance.put(`${endpoint.NEWS}/${id}`, payload),
};

export default newsServices;