import { Address } from "../model/Address";
import Http from "../utils/http";
import { HostUrl } from "./HostUrl";

const baseUrl = HostUrl.length > 0 ? HostUrl : "http://localhost:3004";
const http = new Http(`${baseUrl}/auth`).instance;

export const getAddressByUserId = (id: string) =>
  http.get<Address>(`userAddress/${id}`)
