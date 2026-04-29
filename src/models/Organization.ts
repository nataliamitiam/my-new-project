export interface OrganizationViewModel {
    id: number;
    name: string;
    description: string;
}

export const organizationDefaultValue: OrganizationViewModel = {
    id: 0,
    name: '',
    description: '',
}