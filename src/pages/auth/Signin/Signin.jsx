import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import { authenticate, isAuth } from '../helper'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

const Signin = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
    buttonText: 'Submit'
  })
  const { name, email, password, buttonText } = values
  const handleChange = type => (e) => {
    setValues({ ...values, [type]: e.target.value })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    setValues({ ...values, buttonText: 'Submitting' })
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API}/signin`,
      data: { email, password }
    })
      .then(response => {
        console.log('sign in sucess')
        // save the response (user, token) in (localStorage, cookies)
        //local storage: id, name, email, role that sent as json at signin controller
        authenticate(response, () => {
          setValues({ ...values, email: '', password: '', buttonText: 'Submited' })
          toast.success(`Hey ${response.data.user.name}`)
        })
      })
      .catch(error => {
        console.log('SIGNIN ERROR', error.response.data)
        setValues({ ...values, buttonText: 'Submit' })
        toast.error(error.response.data.error)
      })
  }
  const signinForm = () => {
    return (
      <form>
        <div className='form-group'>
          <label className='text-muted'>Email</label>
          <input autoComplete='true' onChange={handleChange('email')} type='text' className='form-control' />
          <label className='text-muted'>Password</label>
          <input autoComplete='true' onChange={handleChange('password')} type='password' className='form-control' />
          <button type='submit' className='btn' onClick={e => handleSubmit(e)}>{buttonText}</button>
        </div>
      </form>
    )
  }
  return (
    <div>
      {/* {JSON.stringify(isAuth())} */}
      <ToastContainer />
      {isAuth() ? <Redirect to='/' /> : null}
      <h1>Sign in</h1>
      {signinForm()}
    </div>
  )
}

export default Signin