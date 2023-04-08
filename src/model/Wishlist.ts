export interface ItemList {
  productId: string;
  productName: string;
  productPhotoUrl: string;
}

export interface Wishlist {
  userId: string;
  itemList: ItemList[];
}