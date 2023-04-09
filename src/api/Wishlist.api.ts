import { Wishlist } from "../model/Wishlist";
import Http from "../utils/http";
import { HostUrl } from "./HostUrl";

const baseUrl = HostUrl.length > 0 ? HostUrl : "http://localhost:3003";
const http = new Http(`${baseUrl}/shopping`).instance;

export const getAllWishlist = (accessToken: string) =>
  http.get<Wishlist[]>('wishlist/all', { headers: { 'Authorization': 'Bearer ' + accessToken } });

export const getWishlistByUserId = (id: string, accessToken: string) =>
  http.get<Wishlist>(`wishlist?userId=${id}`, { headers: { 'Authorization': 'Bearer ' + accessToken } });