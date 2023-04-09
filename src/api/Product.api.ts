import { Product } from "../model/Product";
import Http from "../utils/http";
import { HostUrl } from "./HostUrl";

const baseUrl = HostUrl.length > 0 ? HostUrl : "http://localhost:3000";
const http = new Http(`${baseUrl}/product`).instance;

export const getProducts = () => http.get<Product[]>('')
export const getProduct = (id: string) => http.get<Product>(`${id}`)
export const addProduct = (product: Omit<Product, 'id'>) => http.post<Product>('create', product)
export const updateProduct = (product: Product) => http.put<Product>(`update/${product.id}`, product)
export const deleteProduct = (id: string) => http.delete<Product>(`delete/${id}`)
// export const getProductsOfDiscount = (id: string) => http.get<string[]>(`discountproduct/discount/${id}`)

