import React from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3'

import Chart from './Chart'
import Line from './Line'
import Axis from './Axis'
import Gradient from './Gradient'
import { useChartDimensions, accessorPropsType, useUniqueId } from './utils'

const formatDate = d3.timeFormat('%-b %-d')
const gradientColors = ['rgb(226, 222, 243)', '#f8f9fa']
type TimelinePropsTypes = {
  width: number
  height: number
  data: any[]
  xAccessor: accessorPropsType<any>
  yAccessor: accessorPropsType<any>
  label: string
}
const Timeline = ({
  data = [],
  label,
  width,
  height,
  xAccessor = (d: any) => d.x,
  yAccessor = (d: any) => d.y,
}: TimelinePropsTypes) => {
  const [ref, dimensions] = useChartDimensions({ width, height })
  const gradientId = useUniqueId('Timeline-gradient')

  const xScale = d3.scaleTime().domain(d3.extent(data, xAccessor)).range([0, dimensions.boundedWidth])

  const yScale = d3.scaleLinear().domain(d3.extent(data, yAccessor)).range([dimensions.boundedHeight, 0]).nice()

  const xAccessorScaled = (d: any) => xScale(xAccessor(d))
  const yAccessorScaled = (d: any) => yScale(yAccessor(d))
  const y0AccessorScaled = yScale(yScale.domain()[0])

  return (
    <div className='Timeline' ref={ref}>
      <Chart dimensions={dimensions}>
        <defs>
          <Gradient id={gradientId} colors={gradientColors} x2='0' y2='100%' />
        </defs>
        <Axis dimension='x' scale={xScale} formatTick={formatDate} />
        <Axis dimension='y' scale={yScale} label={label} />
        <Line
          type='area'
          data={data}
          xAccessor={xAccessorScaled}
          yAccessor={yAccessorScaled}
          y0Accessor={y0AccessorScaled}
          style={{ fill: `url(#${gradientId})` }}
        />
        <Line data={data} xAccessor={xAccessorScaled} yAccessor={yAccessorScaled} />
      </Chart>
    </div>
  )
}

export default Timeline
