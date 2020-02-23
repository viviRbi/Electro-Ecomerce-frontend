import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import jwt from 'jsonwebtoken'

const Reset = ({ match }) => {
  const [values, setValues] = useState({
    name: '',
    token: '',
    newPassword: '',
    buttonText: 'Request'
  })
  useEffect(() => {
    let token = match.params.token
    let { name } = jwt.decode(token)
    if (token) {
      setValues({ ...values, name, token })
    }
  }, [match.params.token])
  const { name, token, newPassword, buttonText } = values

  const handleChange = (e) => {
    setValues({ ...values, newPassword: e.target.value })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    setValues({ ...values, buttonText: 'Reset' })
    axios({
      method: 'PUT',
      url: `${process.env.REACT_APP_BACKEND_API}/reset-password`,
      data: { newPassword, resetPasswordLink: token }
    })
      .then(response => {
        console.log('reset pass success')
        toast.success(response.data.message)
        setValues({ ...values, buttonText: 'Done' })
      })
      .catch(error => {
        console.log('reset pass ERROR', error.response.data.error)
        setValues({ ...values, buttonText: 'Reset' })
        toast.error(error.response.data.error)
      })
  }
  const resetPasswordForm = () => {
    return (
      <form>
        <h1>{name}</h1>
        <div className='form-group'>
          <label className='text-muted'>Password</label>
          <input autoComplete='true' onChange={e => handleChange(e)} type='password' className='form-control' />
          <br />
          <button type='submit' className="btn btn-sm btn-outline-info" onClick={e => handleSubmit(e)}>{buttonText}</button>
        </div>
      </form>
    )
  }
  return (
    <div>
      <ToastContainer />
      <h1>Reset password</h1>
      {JSON.stringify({ name, token })}
      {resetPasswordForm()}
    </div>
  )
}

export default Reset