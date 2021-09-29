import React from 'react'
import * as d3 from 'd3'
import Chart from './Chart'
import Line from './Line'
import Axis from './Axis'
import { useChartDimensions, accessorPropsType } from './utils'

type LineChartPropsTypes = {
  width: number
  height: number
  data: any[]
  xAccessor: accessorPropsType<any>
  yAccessor: accessorPropsType<any>
  label?: string
  color?: string
  children?: React.ReactNode
  axisTicks?: { x: number; y: number }
}
const LineChart = ({
  axisTicks,
  data = [],
  label,
  width,
  height,
  children,
  color,
  xAccessor = (d: any) => d.x,
  yAccessor = (d: any) => d.y,
}: LineChartPropsTypes) => {
  const [ref, dimensions] = useChartDimensions({ width, height })

  const typedDimensions = dimensions as any

  const xScale = d3
    .scaleTime()
    .domain(d3.extent(data, xAccessor) as [any, any])
    .range([0, typedDimensions.boundedWidth])
    .nice()

  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(data, yAccessor) as [any, any])
    .range([typedDimensions.boundedHeight, 0])
    .nice()

  const xAccessorScaled = (d: any) => xScale(xAccessor(d))
  const yAccessorScaled = (d: any) => yScale(yAccessor(d))

  return (
    <div
      style={{
        background: 'white',
        padding: '0.6em 1em',
        margin: '0.5em',
      }}
      ref={ref as React.MutableRefObject<null>}>
      <Chart dimensions={typedDimensions}>
        <Axis dimension='x' axisTicks={axisTicks} scale={xScale} />
        <Axis dimension='y' axisTicks={axisTicks} scale={yScale} label={label} />
        {children || <Line color={color} data={data} xAccessor={xAccessorScaled} yAccessor={yAccessorScaled} />}
      </Chart>
    </div>
  )
}

export default LineChart
