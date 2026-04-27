export interface ContactViewModel {
    id: number;
    firstname: string;
    lastname: string;
    birthDate: string;
    email: string;
    phone: string;
}

export const contactsDefaultValue: ContactViewModel = {
    id: 0,
    firstname: '',
    lastname: '',
    birthDate: '',
    email: '',
    phone: '',
}