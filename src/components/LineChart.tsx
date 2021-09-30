import React from 'react'
import * as d3 from 'd3'
import Chart from './Chart'
import Line from './Line'
import Axis from './Axis'
import AxisNaive from './AxisNaive'
import { useChartDimensions, accessorPropsType } from './utils'
import Circles from './Circles'

type LineChartPropsTypes = {
  width: number
  height: number
  data?: any[]
  multipleData?: { pointColor: string; lineColor?: string; radius?: any; data: any[] }[]
  xAccessor: accessorPropsType<any>
  yAccessor: accessorPropsType<any>
  label?: string
  color?: string
  children?: React.ReactNode
  axisTicks?: { x: number; y: number }
  formatTick?: { x: (d: any) => any; y: (d: any) => any }
  point?: boolean

  multiple?: boolean
}
const LineChart = ({
  axisTicks,
  data = [],
  label,
  width,
  height,
  multiple,
  multipleData,
  children,
  point,
  color,
  formatTick,
  xAccessor,
  yAccessor,
}: LineChartPropsTypes) => {
  const [ref, dimensions] = useChartDimensions({ width, height })

  const typedDimensions = dimensions as any
  console.log('multipleData[0]', multipleData?.[0].data)

  const xScale = multipleData
    ? d3
        .scaleLinear()
        .domain(d3.extent(multipleData[0].data, xAccessor) as [any, any])
        .range([0, typedDimensions.boundedWidth])
    : d3
        .scaleLinear()
        .domain(d3.extent(data, xAccessor) as [any, any])
        .range([0, typedDimensions.boundedWidth])

  const yScale = multipleData
    ? d3
        .scaleLinear()
        .domain(d3.extent(multipleData[0].data, yAccessor) as [any, any])
        .range([typedDimensions.boundedHeight, 0])
    : d3
        .scaleLinear()
        .domain(d3.extent(data, yAccessor) as [any, any])
        .range([typedDimensions.boundedHeight, 0])
        .nice()

  const xAccessorScaled = (d: any) => {
    return xScale(xAccessor(d))
  }
  const yAccessorScaled = (d: any) => {
    return yScale(yAccessor(d))
  }

  return (
    <div
      style={{
        background: 'white',
        padding: '0.6em 1em',
        margin: '0.5em',
      }}
      ref={ref as React.MutableRefObject<null>}>
      <Chart dimensions={typedDimensions}>
        <AxisNaive dimension='x' scale={xScale} formatTick={formatTick} />
        <AxisNaive dimension='y' scale={yScale} formatTick={formatTick} />
        {/* <Axis dimension='x' axisTicks={axisTicks} scale={xScale} formatTick={formatTick} />
        <Axis dimension='y' axisTicks={axisTicks} scale={yScale} formatTick={formatTick} label={label} /> */}
        {multiple ? (
          multipleData &&
          multipleData.map(v => (
            <Line color={v.lineColor} data={v.data} xAccessor={xAccessorScaled} yAccessor={yAccessorScaled} />
          ))
        ) : (
          <Line color={color} data={data} xAccessor={xAccessorScaled} yAccessor={yAccessorScaled} />
        )}

        {point &&
          (multiple ? (
            multipleData &&
            multipleData.map(v => (
              <Circles
                color={v.pointColor}
                radius={v.radius}
                data={v.data}
                xAccessor={xAccessorScaled}
                yAccessor={yAccessorScaled}
              />
            ))
          ) : (
            <Circles radius={2} data={data} xAccessor={xAccessorScaled} yAccessor={yAccessorScaled} />
          ))}
      </Chart>
    </div>
  )
}

export default LineChart
