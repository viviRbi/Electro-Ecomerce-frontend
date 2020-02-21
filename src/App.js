import React from 'react'
import Layout from './core/Layout'
import { Switch, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Signup from './pages/auth/Signup/Signup'
import Signin from './pages/auth/Signin/Signin'
import Activate from './pages/auth/Activate/Activate'
import Private from './core/Private'
import PrivateRoute from './pages/auth/PrivateRoute'
import Admin from './core/Admin'
import AdminRoute from "./pages/auth/AdminRoute"
import Forgot from './pages/auth/forgot'
import Reset from './pages/auth/reset'

function App() {
  return (
    <Layout>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/auth/activate/:token" component={Activate} />
        <PrivateRoute exact path="/private" component={Private} />
        <AdminRoute exact path="/admin" component={Admin} />
        <Route exact path="/auth/password/forgot" component={Forgot} />
        <Route exact path="/auth/password/reset/:token" component={Reset} />
      </Switch>
    </Layout>
  )
}

export default App;
