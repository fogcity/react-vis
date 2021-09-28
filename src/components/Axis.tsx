import React from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3'
import { combineDimensionsPropsType } from './utils'
import { useChartDimensions } from './Chart'

const axisComponentsByDimension = {
  x: AxisHorizontal,
  y: AxisVertical,
}
type AxisPropsTypes = {
  dimension: 'x' | 'y'
  scale: any
  label: string
  formatTick: (
    n:
      | number
      | {
          valueOf(): number
        },
  ) => string
}
const Axis = ({ dimension = 'x', formatTick = d3.format(','), ...props }: AxisPropsTypes) => {
  const dimensions = useChartDimensions()
  const Component = axisComponentsByDimension[dimension]
  if (!Component) return null

  return <Component dimensions={dimensions as combineDimensionsPropsType} formatTick={formatTick} {...props} />
}

export default Axis

type AxisHorizontalPropsTypes = { dimensions: combineDimensionsPropsType; label: string; formatTick: any; scale: any }
function AxisHorizontal({ dimensions, label, formatTick, scale, ...props }: AxisHorizontalPropsTypes) {
  const numberOfTicks = dimensions.boundedWidth < 600 ? dimensions.boundedWidth / 100 : dimensions.boundedWidth / 250

  const ticks = scale.ticks(numberOfTicks)

  return (
    <g className='Axis AxisHorizontal' transform={`translate(0, ${dimensions.boundedHeight})`} {...props}>
      <line className='Axis__line' x2={dimensions.boundedWidth} />

      {ticks.map((tick: React.Key | null | undefined) => (
        <text key={tick} className='Axis__tick' transform={`translate(${scale(tick)}, 25)`}>
          {formatTick(tick)}
        </text>
      ))}

      {label && (
        <text className='Axis__label' transform={`translate(${dimensions.boundedWidth / 2}, 60)`}>
          {label}
        </text>
      )}
    </g>
  )
}
type AxisVerticalPropsTypes = { dimensions: combineDimensionsPropsType; label: string; formatTick: any; scale: any }
function AxisVertical({ dimensions, label, formatTick, scale, ...props }: AxisVerticalPropsTypes) {
  const numberOfTicks = dimensions.boundedHeight / 70

  const ticks = scale.ticks(numberOfTicks)

  return (
    <g className='Axis AxisVertical' {...props}>
      <line className='Axis__line' y2={dimensions.boundedHeight} />

      {ticks.map((tick: React.Key | null | undefined, i: any) => (
        <text key={tick} className='Axis__tick' transform={`translate(-16, ${scale(tick)})`}>
          {formatTick(tick)}
        </text>
      ))}

      {label && (
        <text
          className='Axis__label'
          style={{
            transform: `translate(-56px, ${dimensions.boundedHeight / 2}px) rotate(-90deg)`,
          }}>
          {label}
        </text>
      )}
    </g>
  )
}
