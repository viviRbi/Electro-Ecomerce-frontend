import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import { isAuth } from '../helper'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

const Signup = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    buttonText: 'Submit'
  })
  const { name, email, password, buttonText } = values
  const handleChange = name => (e) => {
    setValues({ ...values, [name]: e.target.value })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    setValues({ ...values, buttonText: 'Submitting' })
    console.log(process.env.REACT_APP_BACKEND_API)
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_BACKEND_API}/signup`,
      data: { name, email, password }
    })
      .then(response => {
        console.log('sign up sucess')
        setValues({ ...values, name: '', email: '', password: '', buttonText: 'Submited' })
        toast.success(response.data.message)
      })
      .catch(error => {
        setValues({ ...values, buttonText: 'Submit' })
        toast.error(error.response.data.error)
      })
  }
  const signupForm = () => {
    return (
      <form>
        <div className='form-group'>
          <label className='text-muted'>Name</label>
          <input autoComplete='true' onChange={handleChange('name')} type='text' className='form-control' />
          <label className='text-muted'>Email</label>
          <input autoComplete='true' onChange={handleChange('email')} type='text' className='form-control' />
          <label className='text-muted'>Password</label>
          <input autoComplete='true' onChange={handleChange('password')} type='password' className='form-control' />
          <br />
          <button type='submit' className="btn btn-sm btn-outline-info" onClick={e => handleSubmit(e)}>{buttonText}</button>
        </div>
      </form>
    )
  }
  return (
    <div>
      <ToastContainer />
      {isAuth() ? <Redirect to='/' /> : null}
      {/* {JSON.stringify({ name, email, password })} */}
      <h1>Sign up</h1>
      {signupForm()}
    </div>
  )
}

export default Signup