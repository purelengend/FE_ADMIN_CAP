export interface ProductVariant {
  id: string,
  productId: string,
  quantity: number,
  basePrice: number,
  sellingPrice: number,
  color: object,
  size: object
}