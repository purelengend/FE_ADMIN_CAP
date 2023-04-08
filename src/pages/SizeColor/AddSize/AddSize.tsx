import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { SubmitHandler } from 'react-hook-form/dist/types'
import { useNavigate } from 'react-router-dom'
import * as z from 'zod'
import { addSize } from '../../../api/ProductVariant'
import Navbar from '../../../components/navbar/Navbar'
import Sidebar from '../../../components/sidebar/Sidebar'
import { FormInput } from '../../../model/FormInput'
import { Size } from '../../../model/Size'
import { successNotify } from '../../../utils/ToastPopup'
import './AddSize.scss'
const schema = z.object({
  name: z.string().min(1, { message: 'Size must have at least one character' }),
})
export default function AddSize({ inputs, title }: any) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Omit<Size, 'id'> | any>({ resolver: zodResolver(schema) })

  const navigate = useNavigate()

  const addSizeMutation = useMutation({
    mutationFn: (size: Omit<Size, 'id'>) => {
      return addSize(size)
    },
  })

  const onSubmit: SubmitHandler<Omit<Size, 'id'>> = async (data) => {
    addSizeMutation.mutate(data, {
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
