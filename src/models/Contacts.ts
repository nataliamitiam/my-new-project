export interface ContactViewModel {
    id: number;
    firstname: string;
    lastname: string;
    birthdate: string;
    email: string;
    phone: string;
}

export const contactsDefaultValue: ContactViewModel = {
    id: 0,
    firstname: '',
    lastname: '',
    birthdate: '',
    email: '',
    phone: '',
}