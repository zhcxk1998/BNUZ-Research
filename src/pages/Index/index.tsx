import React, { Component, ComponentType } from 'react'

import Header from '../../components/Header'
import Content from '../../components/Content'
import Footer from '../../components/Footer'

import './index.scss'

interface IProps {
}

interface IStates {

}

class Index extends Component<IProps, IStates>{
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

export default Index as ComponentType