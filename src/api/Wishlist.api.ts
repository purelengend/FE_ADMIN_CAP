import { Wishlist } from "../model/Wishlist";
import Http from "../utils/http";

const http = new Http("http://localhost:3003/shopping").instance;

export const getAllWishlist = (accessToken: string) =>
  http.get<Wishlist[]>('wishlist/all', { headers: { 'Authorization': 'Bearer ' + accessToken } });

export const getWishlistByUserId = (id: string, accessToken: string) =>
  http.get<Wishlist>(`wishlist?userId=${id}`, { headers: { 'Authorization': 'Bearer ' + accessToken } });