import React from 'react'

import { accessorPropsType, useUniqueId } from './utils'
import { Theme } from '../theme'
import { createUseStyles } from 'react-jss'
import classnames from 'classnames'
type CirclesPropTypes = {
  data: any[]
  xAccessor: accessorPropsType<any>
  yAccessor: accessorPropsType<any>
  radius: accessorPropsType<any> | number
  color?: string
  className?: string
}
const useStyles = createUseStyles<'circles', Pick<CirclesPropTypes, 'color'>, Theme>(theme => ({
  circles: ({ color }) => ({
    fill: color,
    transition: 'all 0.3s ease-out',
  }),
}))

const Circles = ({ data = [], color, className, xAccessor, yAccessor, radius }: CirclesPropTypes) => {
  const classes = useStyles({ color })
  return (
    <React.Fragment>
      {data.map((d, i) => (
        <circle
          className={classnames(classes.circles, className)}
          key={useUniqueId('circle')}
          cx={xAccessor(d, i)}
          cy={yAccessor(d, i)}
          r={typeof radius == 'function' ? radius(d) : radius}
        />
      ))}
    </React.Fragment>
  )
}

export default Circles
