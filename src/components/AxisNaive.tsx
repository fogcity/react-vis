import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import d3, { AxisScale } from 'd3'
import { useChartDimensions } from './Chart'
import { combineDimensionsPropsType } from './utils'
type AxisPropsTypes = { dimension: 'x' | 'y'; scale: AxisScale<any>; formatTick: any }
const Axis = ({ dimension = 'x', scale, formatTick, ...props }: AxisPropsTypes) => {
  const dimensions = useChartDimensions()

  const axisGenerator = d3[dimension === 'x' ? 'axisBottom' : 'axisLeft'](scale).scale(scale).tickFormat(formatTick)

  const ref = useRef(null)
  if (ref.current) {
    d3.select(ref.current)
      .transition()
      .call(axisGenerator as any)
  }

  return (
    <g
      {...props}
      ref={ref}
      transform={
        dimension === 'x' ? `translate(0, ${(dimensions as combineDimensionsPropsType).boundedHeight})` : undefined
      }
    />
  )
}

export default Axis
