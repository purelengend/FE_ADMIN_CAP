import { Category } from './../model/Category';
import Http from "../utils/http";
import { HostUrl } from "./HostUrl";

const baseUrl = HostUrl.length > 0 ? HostUrl : "http://localhost:3000";
const http = new Http(`${baseUrl}/product`).instance;

export const getAllCategories = () => http.get<Category[]>('category/all')
export const addCategory = (category: Omit<Category, 'id'>) => http.post<Category>('category/create', category)