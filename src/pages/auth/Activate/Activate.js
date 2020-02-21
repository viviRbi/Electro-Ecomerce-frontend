import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import jwt from 'jsonwebtoken'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

const Activate = ({ match }) => {
  const [values, setValues] = useState({
    name: '',
    token: '',
    show: true,
  })
  useEffect(() => {
    let token = match.params.token
    let { name } = jwt.decode(token)
    if (token) {
      setValues({ ...values, name, token })
    }
  }, [match.params.token, values])
  //if don't pass anything inside the array, this function runs everytime state change
  //if pass name, function runs everytime name change

  const { name, token, show } = values

  const handleSubmit = (e) => {
    e.preventDefault()
    // post token to backend to decode then save new user to database
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_BACKEND_API}/account-activation`,
      data: { token }
    })
      .then(response => {
        console.log('ACCOUNT ACTIVATION', response)
        // save the response (user, token) in (localStorage, cookies)
        setValues({ ...values, show: false })
        toast.success(`Hey ${response.data.message}`)
      })
      .catch(error => {
        console.log('ACCOUNT ACTIVATION ERROR', error.response.data)
        toast.error(error.response.data.error)
      })
  }
  const activationLink = () => (
    <div className='text-center'>
      <h1> Hey {name}, ready to activate your account?</h1>
      <button onClick={handleSubmit}>Activate Account</button>
    </div>
  )
  return (
    <div>
      <ToastContainer />
      {show && activationLink()}
    </div>
  )
}

export default Activate