import { Order } from "../model/Order";
import Http from "../utils/http";

const http = new Http("http://localhost:8080/order").instance;

export const getAllOrder = () => http.get<Order[]>('/all')
export const getOrderById = (id: string) => http.get<Order>(`/${id}`)
export const getOrderByUserId = (userId: string) => http.get<Order[]>(`/getAllByUserId/${userId}`)