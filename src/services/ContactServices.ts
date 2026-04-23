import axios from "axios";
import { getDataUrl } from "../components/utils/dataUrl"
import { api } from "../config/apiEndpoint"

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
    }
}