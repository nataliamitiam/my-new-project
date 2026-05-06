import axios from "axios";
import { getDataUrl } from "../components/utils/dataUrl"
import { api } from "../config/apiEndpoint"
import type { EstimatesViewModel } from "../models/Estimates";

export const EstimatesServices = {
    get: async function (page: number = 1, pageSize: number = 10) {
        let dataUrl = getDataUrl(
            api.BASE_URL,
            api.ESTIMATES_ENDPOINT,
            page,
            pageSize
        );

        return axios.get(dataUrl)
        .then(response => {
            return response.data as Promise<any>;
        })
    },

    create: async function (estimates: EstimatesViewModel) {
            const createUrl = `${api.BASE_URL}${api.ESTIMATES_ENDPOINT}`;

        return axios.post(createUrl, estimates)
    },

    update: async function (id: number, estimates: EstimatesViewModel) {
        const updateUrl = `${api.BASE_URL}${api.ESTIMATES_ENDPOINT}/${id}`;

        const res = await axios.put(updateUrl, estimates);
        return res.data;
    },

    delete: async function (id: number) {
        const deleteUrl = `${api.BASE_URL}${api.ESTIMATES_ENDPOINT}/${id}`;

        const res = await axios.delete(deleteUrl);
        return res.data;
    }
}