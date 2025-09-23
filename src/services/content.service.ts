import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { IContent } from "@/types/Content";

const contentServices = {
  getAllContent: (params?: string) => instance.get(`${endpoint.CONTENT}?${params}`),
  getContentById: (id: string) => instance.get(`${endpoint.CONTENT}/${id}`),
  addContent: (payload: IContent) =>
    instance.post(endpoint.CONTENT, payload),
  deleteContent: (id: string) => instance.delete(`${endpoint.CONTENT}/${id}`),
  updateContent: (id: string, payload: IContent) =>
    instance.put(`${endpoint.CONTENT}/${id}`, payload),
};

export default contentServices;