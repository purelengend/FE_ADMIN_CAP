import { FormInput } from "../model/FormInput";

export const discountInputs: FormInput[] = [
  {
    id: 1,
    label: 'Discount Name',
    name: 'discountName',
    type: 'text',
    placeholder: 'Enter name here...',
  },
  {
    id: 2,
    label: 'Start Date',
    name: 'startDate',
    type: 'datetime-local',
    placeholder: 'Enter start date...',
  }
  ,
  {
    id: 3,
    label: 'End Date',
    name: 'endDate',
    type: 'datetime-local',
    placeholder: 'Enter end date...',
  }
  ,
  {
    id: 4,
    label: 'Discount Value',
    name: 'discountValue',
    type: 'number',
    placeholder: 'Ex: 0.3, 0.5,...',
  }
  ,
  {
    id: 5,
    label: 'Discount Type',
    name: 'discountType',
    type: 'text',
    placeholder: 'Enter type here...',
  }
  ,
  {
    id: 6,
    label: 'List Discount Product',
    name: 'fileListProductId',
    type: 'file',
    placeholder: 'Choose an Excel file'
  }
]

export const productInputs: FormInput[] = [
  {
    id: 1,
    label: 'Product Name',
    name: 'name',
    type: 'text',
    placeholder: 'Enter name here...',
  },
  {
    id: 2,
    label: 'Product Description',
    name: 'description',
    type: 'text',
    placeholder: 'Enter description here...',
  },
  {
    id: 3,
    label: 'Base Price',
    name: 'basePrice',
    type: 'number',
    placeholder: 'Enter base price here...',
  },
  {
    id: 4,
    label: 'Selling Price',
    name: 'sellingPrice',
    type: 'number',
    placeholder: 'Enter selling price here...',
  },
  {
    id: 5,
    label: 'Cover Photo',
    name: 'fileCoverPhoto',
    type: 'file',
    unique: true,
    placeholder: 'Import cover photo file here...',
  },
  {
    id: 6,
    label: 'Photos',
    name: 'filePhotoUrls',
    type: 'file',
    placeholder: 'Choose an Excel file...',
  },
  {
    id: 7,
    label: 'Categories',
    name: 'fileCategories',
    type: 'file',
    placeholder: 'Choose an Excel file...',
  },
  {
    id: 8,
    label: 'Product Variants',
    name: 'fileProductVariants',
    type: 'file',
    placeholder: 'Choose a TXT file'
  }
]

export const colorAndSizeInputs: FormInput[] = [
  {
    id: 1,
    label: 'Name',
    name: 'name',
    type: 'string',
    placeholder: 'Enter name here...'
  }
]

export const categoryInputs: FormInput[] = [
  {
    id: 1,
    label: 'Name',
    name: 'name',
    type: 'string',
    placeholder: 'Enter name here...'
  }
]
