import React from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3'
import { combineDimensionsPropsType } from './utils'
import { useChartDimensions } from './Chart'
import { createUseStyles } from 'react-jss'
import { Theme } from '../theme'
import classnames from 'classnames'

const axisComponentsByDimension = {
  x: AxisHorizontal,
  y: AxisVertical,
}

const useStyles = createUseStyles<'axis', {}, Theme>(theme => ({
  axis: ({}) => ({
    '& label': {
      textAnchor: 'middle',
      fontSize: '0.9em',
      letterSpacing: '0.01em',
    },
    '& tick': {
      fontSize: '0.8em',
      transition: 'all 0.3s ease-out',
    },
    '& horizontal': {
      textAnchor: 'middle',
    },
    '& vertical': {
      dominantBaseline: 'middle',
      textAnchor: 'end',
    },
  }),
}))
type AxisPropsTypes = {
  dimension: 'x' | 'y'
  scale: any
  lineColor?: string
  label?: string
  ticksColor?: string
  axisTicks?: { x: number; y: number }
  formatTick?: (date: Date) => string
  className?: string
}

const Axis = ({
  dimension = 'x',
  lineColor = 'black',
  ticksColor,
  axisTicks,
  formatTick = d3.format(','),
  className,
  ...props
}: AxisPropsTypes) => {
  const classes = useStyles({})
  const dimensions = useChartDimensions()
  const Component = axisComponentsByDimension[dimension]
  if (!Component) return null

  return (
    <Component
      className={classnames(classes.axis, className)}
      lineColor={lineColor}
      ticksColor={ticksColor}
      numberOfTicks={axisTicks?.[dimension]}
      dimensions={dimensions as combineDimensionsPropsType}
      formatTick={formatTick}
      {...props}
    />
  )
}

export default Axis

type AxisHorizontalPropsTypes = {
  ticksColor?: string
  numberOfTicks?: number
  lineColor?: string
  dimensions: combineDimensionsPropsType
  label?: string
  formatTick?: any
  scale: any
  className?: string
}
function AxisHorizontal({
  ticksColor,
  lineColor,
  numberOfTicks,
  dimensions,
  label,
  formatTick,
  scale,
  className,
  ...props
}: AxisHorizontalPropsTypes) {
  const autoNumberOfTicks =
    dimensions.boundedWidth < 600 ? dimensions.boundedWidth / 100 : dimensions.boundedWidth / 250

  const ticks = scale.ticks(numberOfTicks || autoNumberOfTicks)

  return (
    <g className={className} transform={`translate(0, ${dimensions.boundedHeight})`} {...props}>
      <line stroke={lineColor} x2={dimensions.boundedWidth} />

      {ticks.map((tick: React.Key | null | undefined) => (
        <text key={tick} className={classnames('tick', 'horizontal')} transform={`translate(${scale(tick)}, 25)`}>
          {formatTick(tick)}
        </text>
      ))}

      {label && (
        <text className='label' transform={`translate(${dimensions.boundedWidth / 2}, 60)`}>
          {label}
        </text>
      )}
    </g>
  )
}
type AxisVerticalPropsTypes = {
  ticksColor?: string
  numberOfTicks?: number
  lineColor?: string
  dimensions: combineDimensionsPropsType
  label?: string
  formatTick?: any
  scale: any
  className?: string
}
function AxisVertical({
  numberOfTicks,
  lineColor,
  dimensions,
  label,
  formatTick,
  scale,
  className,
  ...props
}: AxisVerticalPropsTypes) {
  const autoNumberOfTicks = dimensions.boundedHeight / 70

  const ticks = scale.ticks(numberOfTicks || autoNumberOfTicks)

  return (
    <g className={className} {...props}>
      <line stroke={lineColor} y2={dimensions.boundedHeight} />

      {ticks.map((tick: React.Key | null | undefined, i: any) => (
        <text key={tick} className={classnames('tick', 'vertical')} transform={`translate(-16, ${scale(tick)})`}>
          {formatTick(tick)}
        </text>
      ))}

      {label && (
        <text
          className='label'
          style={{
            transform: `translate(-56px, ${dimensions.boundedHeight / 2}px) rotate(-90deg)`,
          }}>
          {label}
        </text>
      )}
    </g>
  )
}
