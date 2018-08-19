import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route
} from 'react-router-dom'

import tree from '~core/tree'
import Layout from '~components/layout'

import Home from './pages/home'
import SignUp from './pages/sign-up'
import LogIn from './pages/log-in'
import Profile from './pages/profile'
import EmailInviteLanding from './pages/emails/invited'
import EmailResetLanding from './pages/emails/reset'
import ResetPassword from './pages/reset-password'

import Recommend from './pages/recommend'
import Reviewed from './pages/reviewed'
import Scheduled from './pages/scheduled'

const NoMatch = () => {
  return <div>Not Found</div>
}

const AppRouter = () => {
  return (<Router>
    <Layout>
      <Switch>
        {Home.asRouterItem()}
        {EmailInviteLanding.asRouterItem()}
        {EmailResetLanding.asRouterItem()}
        {ResetPassword.asRouterItem()}

        {SignUp.asRouterItem()}
        {LogIn.asRouterItem()}

        {Profile.asRouterItem()}

        {Recommend.asRouterItem()}
        {Reviewed.asRouterItem()}
        {Scheduled.asRouterItem()}

        <Route component={NoMatch} />
      </Switch>
    </Layout>
  </Router>)
}

export default AppRouter
