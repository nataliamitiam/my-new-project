import axios from "axios";
import { getDataUrl } from "../components/utils/dataUrl"
import { api } from "../config/apiEndpoint"
import type { ContactViewModel } from "../models/Contacts";

export const ContactServices = {
    get: async function (page: number = 1, pageSize: number = 10) {
        let dataUrl = getDataUrl(
            api.BASE_URL,
            api.CONTACTS_ENDPOINT,
            page,
            pageSize
        );

        return axios.get(dataUrl)
        .then(response => {
            return response.data as Promise<any>;
        })
    },

    create: async function (contacts: ContactViewModel) {
            const createUrl = `${api.BASE_URL}${api.CONTACTS_ENDPOINT}`;

        return axios.post(createUrl, contacts)
    },

    update: async function (id: number, contacts: ContactViewModel) {
        const updateUrl = `${api.BASE_URL}${api.CONTACTS_ENDPOINT}/${id}`;

        const res = await axios.put(updateUrl, contacts);
        return res.data;
    },

    delete: async function (id: number) {
        const deleteUrl = `${api.BASE_URL}${api.CONTACTS_ENDPOINT}/${id}`;

        const res = await axios.delete(deleteUrl);
        return res.data;
    }
}