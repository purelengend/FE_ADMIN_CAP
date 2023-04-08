
export default function ListSpinner() {
  const listSpinnerStyle = {
    margin: 'auto', 
    background: 'rgb(255, 255, 255)', 
    display: 'block', 
    shapeRendering: 'auto'
  } as const;
  return (
    <div>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        xmlnsXlink='http://www.w3.org/1999/xlink'
        style={listSpinnerStyle}
        width='80px'
        height='80px'
        viewBox='0 0 100 100'
        preserveAspectRatio='xMidYMid'
      >
        <path
          d='M25 50A25 25 0 0 0 75 50A25 27 0 0 1 25 50'
          fill='#0d0d0d'
          stroke='none'
        >
          <animateTransform
            attributeName='transform'
            type='rotate'
            dur='0.6s'
            repeatCount='indefinite'
            keyTimes='0;1'
            values='0 50 51;360 50 51'
          ></animateTransform>
        </path>
      </svg>
    </div>
  )
}
