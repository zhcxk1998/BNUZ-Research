import React from 'react'
import {
  Switch, Redirect, Route,
} from 'react-router-dom'

import PrivateRoute from '../components/PrivateRoute'
import { Login, Register } from '../pages'
import Index from '../pages/Index/index'

const Routes = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <Route exact path="/register" component={Register} />

    <PrivateRoute component={Index} path="/index" />

    <Redirect exact from="/" to="/index" />
  </Switch>
)

export default Routes
