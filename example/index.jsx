import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { LineChart } from '../src'
import * as d3 from 'd3'
const Main = () => {
  const data = [7, 8, 9, 1, 3, 2, 4, 5, 6, 1].map(v => ({
    date: v,
    numberOfSMS: v,
  }))
  return (
    <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', margin: '-0.5em' }}>
      <LineChart
        numberOfYAxisTicks={data.length}
        numberOfXAxisTicks={data.length}
        data={data}
        xAccessor={d => d.date}
        yAccessor={d => d.numberOfSMS}
        width={1400}
        height={400}
      />
    </div>
  )
}

ReactDOM.render(<Main />, document.getElementById('root'))
