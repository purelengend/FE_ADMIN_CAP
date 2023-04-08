export interface CartItem {
  productId: string;
  productVariantId: string;
  productName: string;
  productPhotoUrl: string;
  quantity: number;
}

export interface Cart {
  userId: string;
  itemList: CartItem[];
  createdAt: Date;
  updatedAt: Date;
}