import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { App, Upload, Col, Row, Collapse, Card, Container } from '../src'

const Main = () => {
  const [on, setOn] = React.useState(false)

  const data = [1, 2, 3, 4, 5, 9, 6, 7, 8]
  return (
    <App>
      <Row>
        <Col>
          <Upload>1</Upload>
        </Col>
        <Col autoMargin>
          <Upload>1</Upload>
        </Col>
      </Row>
    </App>
  )
}

ReactDOM.render(<Main />, document.getElementById('root'))
