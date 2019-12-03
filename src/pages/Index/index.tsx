import React, { Component } from 'react'
import { Button } from 'antd'
import { observer, inject } from 'mobx-react'

import Test from '../../store/test'

import './index.scss'

interface IProps {
  Test: Test
}

interface IStates {

}

@inject('Test')
@observer
class Index extends Component<IProps, IStates>{
  constructor(props: any) {
    super(props);
    this.state = {

    }
  }

  render() {
    const { Test: { count, increment } } = this.props

    return (
      <div>
        <Button onClick={() => { increment() }}>{count}</Button>
      </div>
    )
  }
}

export default Index as React.ComponentType