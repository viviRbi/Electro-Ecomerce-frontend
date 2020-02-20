import React from 'react'
import Layout from './core/Layout'
import { Switch, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Signup from './pages/auth/Signup/Signup'
import Signin from './pages/auth/Signin/Signin'
import Activate from './pages/auth/Activate/Activate'

function App() {
  return (
    <Layout>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/signup" component={Signup} />
        <Route path="/signin" component={Signin} />
        <Route path="/auth/activate/:token" component={Activate} />
      </Switch>
    </Layout>
  )
}

export default App;
