import { Cart } from "../model/Cart";
import Http from "../utils/http";
import { HostUrl } from "./HostUrl";

const baseUrl = HostUrl.length > 0 ? HostUrl : "http://localhost:3003";
const http = new Http(`${baseUrl}/shopping`).instance;

export const getAllCart = () => http.get<Cart[]>(`cart/all`);
export const getCartByUserId = (id: string, accessToken: string) =>
  http.get<Cart>(`cart?userId=${id}`, { headers: { 'Authorization': 'Bearer ' + accessToken } });