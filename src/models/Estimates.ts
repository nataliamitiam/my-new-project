export interface EstimatesViewModel {
  id: number,
  name: string,
  description: string,
  amount: number,
  startDate: string,
  endDate: string
}
export const estimatesDefaultValue: EstimatesViewModel = {
  id: 0,
  name: '',
  description: '',
  amount: 0,
  startDate: '',
  endDate: '',
}
