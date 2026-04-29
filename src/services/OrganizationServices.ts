import axios from "axios";
import { api } from "../config/apiEndpoint";
import { getDataUrl } from "../components/utils/dataUrl";
import type { OrganizationViewModel } from "../models/Organization";

export const OrganizationServices = {
  // GET
  get: async (page: number = 1, pageSize: number = 10) => {
    const dataUrl = getDataUrl(
      api.BASE_URL,
      api.ORGANIZATIONS_ENDPOINT,
      page,
      pageSize
    );

    const res = await axios.get(dataUrl);
    return res.data;
  },

  // CREATE
  create: async (organization: OrganizationViewModel) => {
    const url = `${api.BASE_URL}${api.ORGANIZATIONS_ENDPOINT}`;

    const res = await axios.post(url, organization); // ✅ FIXED
    return res.data;
  },

  // UPDATE
  update: async (id: number, organization: OrganizationViewModel) => {
    const url = `${api.BASE_URL}${api.ORGANIZATIONS_ENDPOINT}/${id}`;

    const res = await axios.put(url, organization);
    return res.data;
  },

  // DELETE
  delete: async (id: number) => {
    const url = `${api.BASE_URL}${api.ORGANIZATIONS_ENDPOINT}/${id}`;

    const res = await axios.delete(url);
    return res.data;
  },
};
