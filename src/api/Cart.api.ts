import { Cart } from "../model/Cart";
import Http from "../utils/http";

const http = new Http("http://localhost:3003/shopping").instance;

export const getAllCart = () => http.get<Cart[]>(`cart/all`);
export const getCartByUserId = (id: string, accessToken: string) =>
  http.get<Cart>(`cart?userId=${id}`, { headers: { 'Authorization': 'Bearer ' + accessToken } });