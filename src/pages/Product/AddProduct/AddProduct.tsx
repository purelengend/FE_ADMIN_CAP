import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm, Controller } from 'react-hook-form'
import { SubmitHandler } from 'react-hook-form/dist/types'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Navbar from '../../../components/navbar/Navbar'
import Sidebar from '../../../components/sidebar/Sidebar'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import './AddProduct.scss'
import { successNotify } from '../../../utils/ToastPopup'
import { convertTime } from '../../../utils/TimeCustom'
import { FormInput } from '../../../model/FormInput'
import * as XLSX from 'xlsx'
import { Product } from '../../../model/Product'
import { addProduct } from '../../../api/Product.api'
import { ChangeEvent, useEffect, useState } from 'react'
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { uploadMultiple, uploadSingle } from '../../../utils/UploadImage'
import { readExcelFile, readTextFile } from '../../../utils/ReadFile'
const schema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: 'Product name must be at least one character' }),
  description: z
    .string()
    .trim()
    .min(1, { message: 'Product name must be at least one character' }),
  basePrice: z.coerce
    .number()
    .min(1, { message: 'Base price must be at least 1$' }),
  sellingPrice: z.coerce
    .number()
    .min(1, { message: 'Selling price must be at least 1$' }),
  fileCoverPhoto: z
    .instanceof(FileList)
    .refine((file) => file?.length > 0, 'Product must have a cover photo'),
  filePhotoUrls: z
    .instanceof(FileList)
    .refine((file) => file?.length > 0, 'Product must have sub photos'),
  fileCategories: z
    .instanceof(FileList)
    .refine(
      (file) => file?.length > 0,
      'Product must have at least one category'
    ),
  fileProductVariants: z
    .instanceof(FileList)
    .refine(
      (file) => file?.length > 0,
      'Product must have at least one variant'
    ),
})

export default function AddProduct({ inputs, title }: any) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<Omit<Product, 'id'> | any>({
    resolver: zodResolver(schema),
  })
  const navigate = useNavigate()

  const fileCoverPhoto = watch('fileCoverPhoto')
  const filePhotoUrls = watch('filePhotoUrls')

  const addProductMutation = useMutation({
    mutationFn: (product: Omit<Product, 'id'>): any => {
      return addProduct(product)
    },
  })

  const onSubmit: SubmitHandler<any> = async (data) => {
    const returnCoverPhotoUrl = await uploadSingle(fileCoverPhoto[0])
    data.coverPhoto = returnCoverPhotoUrl
    const returnPhotoUrls = await uploadMultiple(filePhotoUrls)
    data.photoUrls = returnPhotoUrls

    let excelFile = data.fileCategories
    if (excelFile.length > 0) {
      data.categories = await readExcelFile(excelFile[0])
    }

    let textFile = data.fileProductVariants
    if (textFile.length > 0) {
      const txt = await readTextFile(textFile[0])
      data.productVariants = JSON.parse(txt)
    }

    console.log(data)

    addProductMutation.mutate(data, {
      onSuccess: () => {
        navigate(-1)
        successNotify('Add Succeed!')
      },
    })
  }

  return (
    <div className='new'>
      <Sidebar />
      <div className='new-container'>
        <Navbar />
        <div className='top'>
          <h1>{title}</h1>
        </div>
        <div className='bottom'>
          <div className='left'>
            <img
              src={
                fileCoverPhoto && fileCoverPhoto.length > 0
                  ? URL.createObjectURL(fileCoverPhoto[0])
                  : 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/495px-No-Image-Placeholder.svg.png?20200912122019'
              }
              alt='?'
            />
          </div>
          <div className='right'>
            <form onSubmit={handleSubmit(onSubmit)}>
              {inputs.map((input: FormInput) => {
                if (input.type === 'image') {
                  return (
                    <div className='form-input' key={input.id}>
                      <label>{input.label}</label>

                      <input
                        {...register(input.name)}
                        type={input.type}
                        placeholder={input.placeholder}
                      />

                      {errors[input.name]?.message && (
                        <span className='error'>
                          <>{errors[input.name]?.message}</>
                        </span>
                      )}
                    </div>
                  )
                } else {
                  return (
                    <div className='form-input' key={input.id}>
                      <label>{input.label}</label>
                      <input
                        {...register(input.name)}
                        type={input.type}
                        step='any'
                        multiple
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
