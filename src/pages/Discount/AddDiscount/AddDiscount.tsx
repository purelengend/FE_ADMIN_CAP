import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { SubmitHandler } from 'react-hook-form/dist/types'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { addDiscount } from '../../../api/Discount.api'
import Navbar from '../../../components/navbar/Navbar'
import Sidebar from '../../../components/sidebar/Sidebar'
import { Discount } from '../../../model/Discount'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import './AddDiscount.scss'
import { successNotify } from '../../../utils/ToastPopup'
import { convertTime } from '../../../utils/TimeCustom'
import { FormInput } from '../../../model/FormInput'
import * as XLSX from 'xlsx'
import { readExcelFile } from '../../../utils/ReadFile'
const schema = z
  .object({
    discountName: z
      .string()
      .trim()
      .min(1, { message: 'Discount name must be at least one character' }),
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
    discountValue: z.coerce
      .number()
      .min(0.01, { message: 'Discount value must be at least 0.01' })
      .max(1, { message: 'Discount value must be nevermore than 1.' }),
    fileListProductId: z.instanceof(FileList).nullable(),
    discountType: z
      .string()
      .trim()
      .min(1, { message: 'Discount type must be at least one character' }),
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
export default function AddDiscount({ inputs, title }: any) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Omit<Discount, 'id'> | any>({ resolver: zodResolver(schema) })

  const navigate = useNavigate()

  const addDiscountMutation = useMutation({
    mutationFn: (discount: Omit<Discount, 'id'>): any => {
      return addDiscount(discount)
    },
  })

  const onSubmit: SubmitHandler<Omit<Discount, 'id'>> = async (data) => {
    let file = data.fileListProductId
    if (file.length > 0) {
      data.listProductId = await readExcelFile(file[0])
    }
    data.startDate = convertTime(data.startDate)
    data.endDate = convertTime(data.endDate)

    console.log(data)
    addDiscountMutation.mutate(data, {
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
          <div className='right'>
            <form onSubmit={handleSubmit(onSubmit)}>
              {inputs.map((input: FormInput) => (
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
              ))}
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
