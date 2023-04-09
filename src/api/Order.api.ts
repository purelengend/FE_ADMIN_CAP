import { Order } from "../model/Order";
import Http from "../utils/http";
import { HostUrl } from "./HostUrl";

const baseUrl = HostUrl.length > 0 ? HostUrl : "http://localhost:8080";
const http = new Http(`${baseUrl}/order`).instance;

export const getAllOrder = () => http.get<Order[]>('/all')
export const getOrderById = (id: string) => http.get<Order>(`/${id}`)
export const getOrderByUserId = (userId: string) => http.get<Order[]>(`/getAllByUserId/${userId}`)