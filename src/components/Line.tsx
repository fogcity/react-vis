import React from 'react'

import * as d3 from 'd3'
import { accessorPropsType } from './utils'
import { CurveFactory } from 'd3'
import { createUseStyles } from 'react-jss'
import { Theme } from '../theme'
import classNames from 'classnames'
type LinePropsTypes = {
  type?: 'line' | 'area'
  color?: string
  data: any[]
  yAccessor: accessorPropsType<any>
  xAccessor: accessorPropsType<any>
  y0Accessor?: accessorPropsType<any>
  interpolation?: CurveFactory
  className?: string
}
const useStyles = createUseStyles<'line', Pick<LinePropsTypes, 'color'>, Theme>(theme => ({
  line: ({ color }) => ({
    fill: 'none',
    stroke: color,
    transition: 'all 0.3s ease-out',
  }),
}))
const Line = ({
  color = 'black',
  type = 'line',
  data,
  xAccessor,
  yAccessor,
  y0Accessor,
  interpolation = d3.curveMonotoneX,
  className,
  ...props
}: LinePropsTypes) => {
  console.log(data)

  const lineGenerator = (d3[type]() as any).x(xAccessor).y(yAccessor).curve(interpolation)
  const classes = useStyles({ color })
  if (type === 'area') {
    lineGenerator.y0(y0Accessor).y1(yAccessor)
  }

  return <path {...props} d={lineGenerator(data)} className={classNames(classes.line, className)} />
}

export default Line
