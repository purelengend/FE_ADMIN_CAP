import { Discount } from "../model/Discount";
import Http from "../utils/http";

const http = new Http("http://localhost:9000").instance;
export const getDiscounts = () => http.get<Discount[]>('discount')
export const getDiscount = (id: string) => http.get<Discount>(`discount/${id}`)
export const addDiscount = (discount: Omit<Discount, 'id' | 'fileListProductId'>) => {
  http.post<Discount>('discount', discount)
}
export const updateDiscount = (discount: Discount) => {
  // console.log(discount)
  http.put<Discount>('discount', discount)
}
export const deleteDiscount = (id: string) => http.delete<Discount>(`discount/${id}`)
export const getProductsOfDiscount = (id: string) => http.get<string[]>(`discountproduct/discount/${id}`)

