import { Category } from './../model/Category';
import Http from "../utils/http";

const http = new Http("http://localhost:3000/product").instance;

export const getAllCategories = () => http.get<Category[]>('category/all')
export const addCategory = (category: Omit<Category, 'id'>) => http.post<Category>('category/create', category)