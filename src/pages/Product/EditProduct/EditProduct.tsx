import { useMutation, useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import { getProduct, updateProduct } from '../../../api/Product.api'
import { getProductVariantByProductId } from '../../../api/ProductVariant'
import Navbar from '../../../components/navbar/Navbar'
import Sidebar from '../../../components/sidebar/Sidebar'
import { FormInput } from '../../../model/FormInput'
import { Product } from '../../../model/Product'
import { convertTime } from '../../../utils/TimeCustom'
import { readExcelFile, readTextFile } from '../../../utils/ReadFile'
import { successNotify } from '../../../utils/ToastPopup'
import { uploadMultiple, uploadSingle } from '../../../utils/UploadImage'

const defaultEditInput: Product = {
  id: '',
  name: '',
  description: '',
  basePrice: 1,
  sellingPrice: 1,
  coverPhoto: '',
  photoUrls: [],
  categories: [],
  productVariants: [],
  fileCoverPhoto: [],
  filePhotoUrls: [],
  fileCategories: [],
  fileProductVariants: [],
}
// const schema = z
//   .object({
//     id: z.string(),
//     discountName: z.string().nullable(),
//     startDate: z.coerce.date(),
//     endDate: z.coerce.date(),
//     discountValue: z.coerce.number().nullable(),
//     fileListProductId: z.instanceof(FileList).nullable(),
//   })
//   .superRefine(({ startDate, endDate }, ctx) => {
//     const isValidStartDate = new Date(startDate)
//     const isValidEndDate = new Date(endDate)
//     if (isValidStartDate < new Date()) {
//       ctx.addIssue({
//         path: ['startDate'],
//         code: z.ZodIssueCode.invalid_date,
//         message: 'Start date is in the past. Please choose a valid start date.',
//       })
//     }
//     if (isValidEndDate < new Date()) {
//       ctx.addIssue({
//         code: 'custom',
//         path: ['endDate'],
//         message: 'End date is in the past. Please choose a valid start date.',
//       })
//     }
//     if (isValidStartDate > isValidEndDate) {
//       ctx.addIssue({
//         code: 'custom',
//         path: ['endDate'],
//         message: 'End date should be greater than start date.',
//       })
//     }
//   })
export default function EditProduct({ inputs, title }: any) {
  const [editInput, setEditInput] = useState<Product>(defaultEditInput)
  const {
    setValue,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Product | any>({
    // resolver: zodResolver(schema),
  })

  const navigate = useNavigate()
  const { uuid } = useParams()

  const fileCoverPhoto = watch('fileCoverPhoto')
  const filePhotoUrls = watch('filePhotoUrls')

  const product = useQuery({
    queryKey: ['product', uuid],
    staleTime: 0,
    queryFn: () => getProduct(uuid as string),
    onSuccess: (product) => {
      Object.keys(product.data).forEach(function (key, index) {
        setValue(key, product.data[key as keyof Product])
      })
      setEditInput({ ...product.data })
    },
  })

  const productVariant = useQuery({
    queryKey: ['productVariant', uuid],
    staleTime: 0,
    queryFn: () => getProductVariantByProductId(uuid as string),
    onSuccess: (productVariant) => {
      setEditInput((prev) => ({
        ...prev,
        ['productVariants']: productVariant.data,
      }))
    },
  })

  const updateProductMutation = useMutation({
    mutationFn: (product: Product): any => {
      return updateProduct(product)
    },
  })
  const handleChange =
    (name: keyof Product) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setEditInput((prev) => ({ ...prev, [name]: event.target.value }))
    }
  const onSubmit: SubmitHandler<Product> = async (data) => {
    if (fileCoverPhoto.length) {
      const returnCoverPhotoUrl = await uploadSingle(fileCoverPhoto[0])
      data.coverPhoto = returnCoverPhotoUrl
    }

    if (filePhotoUrls.length) {
      const returnPhotoUrls = await uploadMultiple(filePhotoUrls)
      data.photoUrls = returnPhotoUrls
    }

    let excelFile = data.fileCategories
    if (excelFile.length > 0) {
      data.categories = await readExcelFile(excelFile[0])
    }

    data.productVariants = editInput.productVariants
    let textFile = data.fileProductVariants
    console.log(editInput.productVariants)

    if (textFile.length > 0) {
      const txt = await readTextFile(textFile[0])
      data.productVariants = JSON.parse(txt)
    }

    updateProductMutation.mutate(data, {
      onSuccess: () => {
        navigate(-1)
        successNotify('Update Succeed!')
      },
    })
  }

  return (
    <div className='new'>
      <Sidebar />
      <div className='new-container'>
        <Navbar />
        <div className='top'>
          <h1>
            {title} with id: {editInput.id}
          </h1>
        </div>
        <div className='bottom'>
          <div className='left'>
            <img
              src={
                fileCoverPhoto && fileCoverPhoto.length > 0
                  ? URL.createObjectURL(fileCoverPhoto[0])
                  : editInput.coverPhoto
              }
              alt='?'
            />
          </div>
          <div className='right'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input defaultValue={editInput.id} {...register('id')} hidden />
              {inputs.map((input: FormInput) => {
                if (input.type !== 'file')
                  return (
                    <div className='form-input' key={input.id}>
                      <label>{input.label}</label>
                      <input
                        {...register(input.name)}
                        value={
                          editInput[input.name as keyof Product]?.toString() ??
                          ''
                        }
                        onChange={handleChange(input.name as keyof Product)}
                        type={input.type}
                        step='any'
                        placeholder={input.placeholder}
                      />
                      {errors[input.name]?.message && (
                        <span className='error'>
                          <>{errors[input.name]?.message}</>
                        </span>
                      )}
                    </div>
                  )
                else {
                  return (
                    <div className='form-input' key={input.id}>
                      <label>{input.label}</label>
                      <input
                        {...register(input.name)}
                        type={input.type}
                        step='any'
                        multiple={!input.unique}
                        placeholder={input.placeholder}
                      />
                      {errors[input.name]?.message && (
                        <span className='error'>
                          <>{errors[input.name]?.message}</>
                        </span>
                      )}
                    </div>
                  )
                }
              })}
              {inputs.length % 2 === 1 ? (
                <div className='form-input-hidden'>
                  <label></label>
                  <input hidden />
                </div>
              ) : (
                <></>
              )}
              <button>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
