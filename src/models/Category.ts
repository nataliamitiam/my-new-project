export interface CategoryViewModel {
    id: number;
    name: string;
    description: string
}

export const categoryDefaultValue: CategoryViewModel = {
    id: 0,
    name: '',
    description: '',
}
