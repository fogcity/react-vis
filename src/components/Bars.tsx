import React from 'react'
import * as d3 from 'd3'
import { accessorPropsType, callAccessor } from './utils'
import { Theme } from '../theme'
import { createUseStyles } from 'react-jss'
import classNames from 'classnames'
type BarsPropsTypes = {
  data: any[]
  keyAccessor: accessorPropsType<any>
  xAccessor: accessorPropsType<any>
  yAccessor: accessorPropsType<any>
  widthAccessor: accessorPropsType<any>
  heightAccessor: accessorPropsType<any>
  color?: string
  className?: string
}

const useStyles = createUseStyles<'bars', Pick<BarsPropsTypes, 'color'>, Theme>({
  bars: ({ color }) => ({
    fill: color,
    transition: 'all 0.3s ease-out',
  }),
})
const Bars = ({
  color,
  data,
  keyAccessor,
  xAccessor,
  yAccessor,
  widthAccessor,
  heightAccessor,
  className,
  ...props
}: BarsPropsTypes) => {
  const classes = useStyles({ color })
  return (
    <React.Fragment>
      {data.map((d, i) => (
        <rect
          {...props}
          className={classNames(classes.bars, className)}
          key={keyAccessor(d, i)}
          x={callAccessor(xAccessor, d, i)}
          y={callAccessor(yAccessor, d, i)}
          width={d3.max([callAccessor(widthAccessor, d, i), 0] as any)}
          height={d3.max([callAccessor(heightAccessor, d, i), 0] as any)}
        />
      ))}
    </React.Fragment>
  )
}

export default Bars
