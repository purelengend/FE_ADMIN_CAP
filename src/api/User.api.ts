import { User } from "../model/User";
import Http from "../utils/http";

const http = new Http("http://localhost:3004/auth").instance;

export const getAllUser = () => http.get<User[]>('user')
export const getUserById = (id: string) => http.get<User>(`user/${id}`)
export const deleteUserById = (id: string) => http.delete(`user/${id}`)