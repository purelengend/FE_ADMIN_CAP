import { Address } from "../model/Address";
import Http from "../utils/http";

const http = new Http("http://localhost:3004/auth").instance;

export const getAddressByUserId = (id: string) =>
  http.get<Address>(`userAddress/${id}`)
