import { Review } from "../model/Review";
import Http from "../utils/http";

const http = new Http("http://localhost:3001/review").instance

export const getAllReview = () => http.get<Review[]>('all')
export const deteleReviewById = (id: string) => http.delete(`delete/${id}`)