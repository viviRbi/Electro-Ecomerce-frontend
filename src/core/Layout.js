import React from 'react'
import Nav from "../component/Nav/Nav"

const Layout = ({ children }) => {
  return (
    <div>
      <Nav />
      <div className="container">{children}</div>
    </div>
  )
}
export default Layout