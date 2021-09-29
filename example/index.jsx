import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { LineChart } from '../src'
import * as d3 from 'd3'
const getDatas = () => {
  const data = []
  for (let index = 1; index < 31; index++) {
    data.push({
      numberOfSMS: d3.randomInt(1, 30)(),
      date: index,
    })
  }
  return data
}
const mulData = [
  { pointColor: 'blue', lineColor: 'blue', radius: 2, data: getDatas() },
  { pointColor: 'red', lineColor: 'red', radius: 2, data: getDatas() },
]
console.log(mulData)
const Main = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', margin: '-0.5em' }}>
      <LineChart
        axisTicks={{ x: getDatas().length }}
        multiple
        multipleData={mulData}
        xAccessor={d => d.date}
        yAccessor={d => d.numberOfSMS}
        width={1400}
        height={400}
        formatTick={{ x: d => d }}
        point
      />
    </div>
  )
}

ReactDOM.render(<Main />, document.getElementById('root'))
