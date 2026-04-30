import axios from "axios";
import { getDataUrl } from "../components/utils/dataUrl";
import { api } from "../config/apiEndpoint";
import type { ProductsViewModel } from "../models/Products";

export const ProductsServices = {
  // GET
  get: async (page: number = 1, pageSize: number = 10) => {
    const dataUrl = getDataUrl(
      api.BASE_URL,
      api.PRODUCTS_ENDPOINT,
      page,
      pageSize
    );

    const res = await axios.get(dataUrl);
    return res.data;
  },

  // CREATE
  create: async function (product: ProductsViewModel) {
            const createUrl = `${api.BASE_URL}${api.PRODUCTS_ENDPOINT}`;

        return axios.post(createUrl, product)
    },

  // UPDATE
  update: async (id: number, product: ProductsViewModel) => {
    const url = `${api.BASE_URL}${api.PRODUCTS_ENDPOINT}/${id}`;

    const res = await axios.put(url, product);
    return res.data;
  },

  // DELETE
  delete: async (id: number) => {
    const url = `${api.BASE_URL}${api.PRODUCTS_ENDPOINT}/${id}`;

    const res = await axios.delete(url);
    return res.data;
  },
};