import { User } from "../model/User";
import Http from "../utils/http";
import { HostUrl } from "./HostUrl";

const baseUrl = HostUrl.length > 0 ? HostUrl : "http://localhost:3004";
const http = new Http(`${baseUrl}/auth`).instance;

export const getAllUser = () => http.get<User[]>('user')
export const getUserById = (id: string) => http.get<User>(`user/${id}`)
export const deleteUserById = (id: string) => http.delete(`user/${id}`)