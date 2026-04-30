export interface ProductsViewModel {
  id: number,
    name: string,
  description: string,
  category: string
}

export const productsDefaultValue: ProductsViewModel = {
  id: 0,
    name: '',
  description: '',
  category: '', 
}