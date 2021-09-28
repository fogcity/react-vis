import React from 'react'
import PropTypes from 'prop-types'
import { accessorPropsType } from './utils'
type CirclesPropTypes = {
  data: any[]
  keyAccessor: accessorPropsType<any>
  xAccessor: accessorPropsType<any>
  yAccessor: accessorPropsType<any>
  radius: accessorPropsType<any> | number
}
const Circles = ({ data = [], keyAccessor, xAccessor, yAccessor, radius }: CirclesPropTypes) => (
  <React.Fragment>
    {data.map((d, i) => (
      <circle
        className='Circles__circle'
        key={keyAccessor(d, i)}
        cx={xAccessor(d, i)}
        cy={yAccessor(d, i)}
        r={typeof radius == 'function' ? radius(d) : radius}
      />
    ))}
  </React.Fragment>
)

export default Circles
