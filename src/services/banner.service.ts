import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { IProduk } from "@/types/Produk";

const bannerServices = {
  getAllBanner: (params?: string) => instance.get(`${endpoint.BANNER}?${params}`),
  getBannerById: (id: string) => instance.get(`${endpoint.BANNER}/${id}`),
  addBanner: (payload: IProduk) =>
    instance.post(endpoint.BANNER, payload),
  deleteBanner: (id: string) => instance.delete(`${endpoint.BANNER}/${id}`),
  updateBanner: (id: string, payload: IProduk) =>
    instance.put(`${endpoint.BANNER}/${id}`, payload),
};

export default bannerServices;