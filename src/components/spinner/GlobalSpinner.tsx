export default function GlobalSpinner() {
  const globalSpinner = {
    margin: 'auto',
    background: 'rgb(255, 255, 255)',
    display: 'block',
    shapeRendering: 'auto',
  } as const

  const positionGlobalSpinner = {
    position: 'fixed',
    top: 0,
    right: 0
  } as const
  return (
    <div style={positionGlobalSpinner}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        xmlnsXlink='http://www.w3.org/1999/xlink'
        style={globalSpinner}
        width='40px'
        height='40px'
        viewBox='0 0 100 100'
        preserveAspectRatio='xMidYMid'
      >
        <g>
          <path
            d='M50 15A35 35 0 1 0 74.74873734152916 25.251262658470843'
            fill='none'
            stroke='#111111'
            strokeWidth='2'
          ></path>
          <path d='M49 15L49 15L49 15L49 15' fill='#111111'></path>
          <animateTransform
            attributeName='transform'
            type='rotate'
            repeatCount='indefinite'
            dur='0.6666666666666666s'
            values='0 50 50;360 50 50'
            keyTimes='0;1'
          ></animateTransform>
        </g>
      </svg>
    </div>
  )
}
