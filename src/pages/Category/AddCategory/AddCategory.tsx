import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { SubmitHandler } from 'react-hook-form/dist/types'
import { useNavigate } from 'react-router-dom'
import * as z from 'zod'
import { addCategory } from '../../../api/Category.api'
import Navbar from '../../../components/navbar/Navbar'
import Sidebar from '../../../components/sidebar/Sidebar'
import { Category } from '../../../model/Category'
import { FormInput } from '../../../model/FormInput'
import { successNotify } from '../../../utils/ToastPopup'
import './AddCategory.scss'
const schema = z.object({
  name: z
    .string()
    .min(1, { message: 'Category must have at least one character' }),
})
export default function AddCategory({ inputs, title }: any) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Omit<Category, 'id'> | any>({ resolver: zodResolver(schema) })

  const navigate = useNavigate()

  const addCategoryMutation = useMutation({
    mutationFn: (category: Omit<Category, 'id'>) => {
      return addCategory(category)
    },
  })

  const onSubmit: SubmitHandler<Omit<Category, 'id'>> = async (data) => {
    addCategoryMutation.mutate(data, {
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
