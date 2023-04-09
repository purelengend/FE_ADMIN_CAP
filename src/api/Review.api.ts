import { Review } from "../model/Review";
import Http from "../utils/http";
import { HostUrl } from "./HostUrl";

const baseUrl = HostUrl.length > 0 ? HostUrl : "http://localhost:3001";
const http = new Http(`${baseUrl}/review`).instance;

export const getAllReview = () => http.get<Review[]>('all')
export const deteleReviewById = (id: string) => http.delete(`delete/${id}`)