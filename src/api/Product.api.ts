import { Product } from "../model/Product";
import Http from "../utils/http";

const http = new Http("http://localhost:3000/product").instance;
export const getProducts = () => http.get<Product[]>('')
export const getProduct = (id: string) => http.get<Product>(`${id}`)
export const addProduct = (product: Omit<Product, 'id'>) => http.post<Product>('create', product)
export const updateProduct = (product: Product) => http.put<Product>(`update/${product.id}`, product)
export const deleteProduct = (id: string) => http.delete<Product>(`delete/${id}`)
// export const getProductsOfDiscount = (id: string) => http.get<string[]>(`discountproduct/discount/${id}`)

