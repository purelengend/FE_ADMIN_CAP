// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import './CustomSwiper.css'
import { Pagination } from 'swiper'
export default function CustomSwiper({ listUrl }: { listUrl: string[] }) {
  return (
    <Swiper
      className='custom-swiper'
      pagination={true}
      modules={[Pagination]}
      slidesPerView={1}
    >
      {listUrl.map((item, index) => (
        <SwiperSlide key={index}>
          <img src={item} />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
