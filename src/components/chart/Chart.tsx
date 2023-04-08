import './Chart.scss'
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

export default function Chart({ aspect, title }: any) {
  const data = [
    { name: 'January', total: 1400 },
    { name: 'February', total: 2300 },
    { name: 'Third', total: 400 },
    { name: 'April', total: 3600 },
    { name: 'May', total: 300 },
    { name: 'June', total: 1000 },
  ]
  return (
    <div className='chart'>
    <div className='title'>{title}</div>
    <ResponsiveContainer width='100%' aspect={aspect}>
      <AreaChart
        width={730}
        height={250}
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id='total' x1='0' y1='0' x2='0' y2='1'>
            <stop offset='5%' stopColor='#8884d8' stopOpacity={0.8} />
            <stop offset='95%' stopColor='#8884d8' stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey='name' stroke='gray' />
        <CartesianGrid strokeDasharray='3 3' className='chart-grid' />
        <Tooltip />
        <Area
          type='monotone'
          dataKey='total'
          stroke='#8884d8'
          fillOpacity={1}
          fill='url(#total)'
        />
      </AreaChart>
    </ResponsiveContainer>
  </div>
  )
}
