import axios from "axios";
import { api } from "../config/apiEndpoint";
import { getDataUrl } from "../components/utils/dataUrl";
import type { CategoryViewModel } from "../models/Category";

export const CategoryServices = {
  // GET
  get: async (page: number = 1, pageSize: number = 10) => {
    const dataUrl = getDataUrl(
      api.BASE_URL,
      api.CATEGORY_ENDPOINT,
      page,
      pageSize
    );

    return axios.get(dataUrl)
    .then(response => {
      return response.data as Promise<any>;
    })
  },

  // CREATE
  create: async (category: CategoryViewModel) => {
    const url = `${api.BASE_URL}${api.CATEGORY_ENDPOINT}`;

    return axios.post(url, category);
  },

  // UPDATE
  update: async (id: number, _category: CategoryViewModel) => {
    const url = `${api.BASE_URL}${api.CATEGORY_ENDPOINT}/${id}`;

    return axios.put(url, _category);
  },

  // DELETE
  delete: async (id: number) => {
    const url = `${api.BASE_URL}${api.CATEGORY_ENDPOINT}/${id}`;

    return await axios.delete(url);
  },
}