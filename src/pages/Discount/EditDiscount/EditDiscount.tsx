import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import { z } from 'zod'
import { getDiscount, updateDiscount } from '../../../api/Discount.api'
import Navbar from '../../../components/navbar/Navbar'
import Sidebar from '../../../components/sidebar/Sidebar'
import { Discount } from '../../../model/Discount'
import { FormInput } from '../../../model/FormInput'
import { convertTime } from '../../../utils/TimeCustom'
import { readExcelFile } from '../../../utils/ReadFile'
import { successNotify } from '../../../utils/ToastPopup'

const defaultEditInput: Discount = {
  id: '',
  discountName: '',
  startDate: new Date(),
  endDate: new Date(),
  discountValue: 0,
  discountType: '',
  listProductId: [],
  fileListProductId: [],
}
const schema = z
  .object({
    id: z.string(),
    discountName: z.string().nullable(),
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
    discountValue: z.coerce.number().nullable(),
    fileListProductId: z.instanceof(FileList).nullable(),
  })
  .superRefine(({ startDate, endDate }, ctx) => {
    const isValidStartDate = new Date(startDate)
    const isValidEndDate = new Date(endDate)
    if (isValidStartDate < new Date()) {
      ctx.addIssue({
        path: ['startDate'],
        code: z.ZodIssueCode.invalid_date,
        message: 'Start date is in the past. Please choose a valid start date.',
      })
    }
    if (isValidEndDate < new Date()) {
      ctx.addIssue({
        code: 'custom',
        path: ['endDate'],
        message: 'End date is in the past. Please choose a valid start date.',
      })
    }
    if (isValidStartDate > isValidEndDate) {
      ctx.addIssue({
        code: 'custom',
        path: ['endDate'],
        message: 'End date should be greater than start date.',
      })
    }
  })
export default function EditDiscount({ inputs, title }: any) {
  const [editInput, setEditInput] = useState<Discount>(defaultEditInput)
  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Discount | any>({
    resolver: zodResolver(schema),
  })

  const navigate = useNavigate()
  const { uuid } = useParams()
  const discount = useQuery({
    queryKey: ['discount', uuid],
    staleTime: 0,
    queryFn: () => getDiscount(uuid as string),
    onSuccess: (discount) => {
      Object.keys(discount.data).forEach(function (key, index) {
        setValue(key, discount.data[key as keyof Discount])
      })
      setEditInput({ ...discount.data })
    },
  })

  const updateDiscountMutation = useMutation({
    mutationFn: (discount: Discount): any => {
      return updateDiscount(discount)
    },
  })
  const handleChange =
    (name: keyof Discount) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setEditInput((prev) => ({ ...prev, [name]: event.target.value }))
    }
  const onSubmit: SubmitHandler<Discount> = async (data) => {
    let file = data.fileListProductId
    if (file.length > 0) {
      data.listProductId = await readExcelFile(file[0])
    }
    data.startDate = convertTime(data.startDate)
    data.endDate = convertTime(data.endDate)
    console.log(data)
    updateDiscountMutation.mutate(data, {
      onSuccess: async () => {
        navigate(-1)
        successNotify('Updated Succeed!')
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
                          editInput[input.name as keyof Discount]?.toString() ??
                          ''
                        }
                        onChange={handleChange(input.name as keyof Discount)}
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
