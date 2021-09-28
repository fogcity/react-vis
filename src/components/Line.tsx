import React from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3'
import { accessorPropsType } from './utils'
import { CurveFactory } from 'd3'
type LinePropsTypes = {
  type: 'line' | 'area'
  data: any[]
  yAccessor: accessorPropsType<any>
  xAccessor: accessorPropsType<any>
  y0Accessor: accessorPropsType<any>
  interpolation: CurveFactory
}
const Line = ({
  type = 'line',
  data,
  xAccessor,
  yAccessor,
  y0Accessor,
  interpolation = d3.curveMonotoneX,
  ...props
}: LinePropsTypes) => {
  const lineGenerator = (d3[type]() as any).x(xAccessor).y(yAccessor).curve(interpolation)

  if (type === 'area') {
    lineGenerator.y0(y0Accessor).y1(yAccessor)
  }

  return <path {...props} className={`Line Line--type-${type}`} d={lineGenerator(data)} />
}

export default Line
