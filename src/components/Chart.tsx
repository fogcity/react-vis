import React, { createContext, useContext } from 'react'
import type { dimensionsPropsType } from './utils'

import { createUseStyles } from 'react-jss'
import { Theme } from '../theme'
import classnames from 'classnames'

const ChartContext = createContext({})
export const useChartDimensions = () => useContext(ChartContext)
type ChartPropTypes = { dimensions: dimensionsPropsType; children: React.ReactNode; className?: string }

const useStyles = createUseStyles<'chart', {}, Theme>(theme => ({
  chart: () => ({
    overflow: 'visible',
    '& > text': {
      fill: '#95a5a6',
    },
  }),
}))

const Chart = ({ dimensions, children, className }: ChartPropTypes) => {
  const classes = useStyles({})
  return (
    <ChartContext.Provider value={dimensions}>
      <svg className={classnames(classes.chart, className)} width={dimensions.width} height={dimensions.height}>
        <g transform={`translate(${dimensions.marginLeft}, ${dimensions.marginTop})`}>{children}</g>
      </svg>
    </ChartContext.Provider>
  )
}

export default Chart
