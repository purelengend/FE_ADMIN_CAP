interface ReviewUser {
  id: string;
  username: string;
  avatarUrl: string;
}
export interface Review {
  id: string;
  productId: string;
  rating: number;
  comment: string;
  user: ReviewUser;
  createdAt: Date;
  updatedAt: Date;
}