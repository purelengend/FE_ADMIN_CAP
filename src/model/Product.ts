export interface Product {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  sellingPrice: number;
  coverPhoto: string;
  photoUrls: string[];
  categories: string[];
  productVariants: object[]
  fileCoverPhoto: FileList | [];
  filePhotoUrls: FileList | [];
  fileCategories: FileList | [];
  fileProductVariants: FileList | [];
  rating?: number;
  reviewed?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

