import { AxiosError } from "axios";
import { Admin } from "../model/Admin";
import { Authentication } from "../model/Authentication";
import Http from "../utils/http";

const http = new Http("http://localhost:3004/auth").instance;

export const login = (data: Admin) => http.post<Authentication>('login', data)

export const signUp = (data: Admin) => http.post<Authentication>('register', data)



