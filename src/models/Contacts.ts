export interface ContactViewModel {
    id: number;
    FirstName: string;
    LastName: string;
    Birthdate: string;
    Email: string;
    Phone: string;
}

export const contactsDefaultValue: ContactViewModel = {
    id: 0,
    FirstName: '',
    LastName: '',
    Birthdate: '',
    Email: '',
    Phone: '',
}