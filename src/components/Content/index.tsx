import React, { Component } from 'react'

import './index.scss'
import { withRouter, Switch, Redirect, RouteComponentProps, Route } from 'react-router-dom'

import { Index } from '../../pages'

interface IProps extends RouteComponentProps {

}

interface IStates {

}

const test = () => (
  <div>我是课程</div>
)

class Content extends Component<IProps, IStates>{
  render() {
    return (
      <Switch>
        <Route exact path="/home/index" component={Index} />
        <Route exact path="/home/test" component={test} />

        <Redirect exact from="/home" to="/home/index" />
      </Switch>
    )
  }
}

export default withRouter(Content)