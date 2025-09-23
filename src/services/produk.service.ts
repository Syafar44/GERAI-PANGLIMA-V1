import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { IProduk } from "@/types/Produk";

const produkServices = {
  getAllProduk: (params?: string) => instance.get(`${endpoint.PRODUK}?${params}`),
  getProdukById: (id: string) => instance.get(`${endpoint.PRODUK}/${id}`),
  addProduk: (payload: IProduk) =>
    instance.post(endpoint.PRODUK, payload),
  deleteProduk: (id: string) => instance.delete(`${endpoint.PRODUK}/${id}`),
  updateProduk: (id: string, payload: IProduk) =>
    instance.put(`${endpoint.PRODUK}/${id}`, payload),
  getProdukByCategory: (category: string, params?: string) => instance.get(`${endpoint.PRODUK}/${category}/category?${params}`),
  getProdukBySlug: (slug: string, params?: string) => instance.get(`${endpoint.PRODUK}/${slug}/slug?${params}`),
};

export default produkServices;