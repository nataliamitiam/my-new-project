import { loadConfig } from "../components/utils/configLoader";

const config = await loadConfig();
const BASE_URL = config.APIBaseUrl;

export const api = {
    BASE_URL: BASE_URL,
    
    CONTACTS_ENDPOINT: '/api/contacts',
    ORGANIZATIONS_ENDPOINT: '/api/organizations',
}