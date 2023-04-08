
export interface Discount {
  id: string;
  discountName: string;
  startDate: Date;
  endDate: Date;
  listProductId: string[];
  fileListProductId: FileList | [];
  discountType: string;
  discountValue: number;
}

