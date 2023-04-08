export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  productPhotoUrl: string;
  quantity: number;
  color: string;
  size: string;
  sellingPrice: number;
}

export interface Order {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  companyName: string;
  country: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  status: string;
  phone: string;
  deliveryFee: number;
  paymentMethod: string;
  message: string;
  createdAt: Date;
  orderItemList: OrderItem[];
}