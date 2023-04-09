import { AxiosError } from "axios";
import { Admin } from "../model/Admin";
import { Authentication } from "../model/Authentication";
import Http from "../utils/http";
import { HostUrl } from "./HostUrl";

const baseUrl = HostUrl.length > 0 ? HostUrl : "http://localhost:3004";
const http = new Http(`${baseUrl}/auth`).instance;

export const login = (data: Admin) => http.post<Authentication>('login', data)

export const signUp = (data: Admin) => http.post<Authentication>('register', data)



