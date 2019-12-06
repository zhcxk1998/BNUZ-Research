import React, { Component, ComponentType } from 'react'

import Header from '../Header'
import Content from '../Content'
import Footer from '../Footer'

import './index.scss'

interface IProps {
}

interface IStates {

}

class Main extends Component<IProps, IStates>{
  constructor(props: any) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <div className="index__container">
        <Header />
        <Content />
        <Footer />
      </div>
    )
  }
}

export default Main as ComponentType