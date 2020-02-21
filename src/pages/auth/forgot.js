import React, { useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

const Forgot = () => {
  const [values, setValues] = useState({
    email: '',
    buttonText: 'Request'
  })
  const { email, buttonText } = values
  const handleChange = type => (e) => {
    setValues({ ...values, [type]: e.target.value })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    setValues({ ...values, buttonText: 'Submitting' })
    axios({
      method: 'PUT',
      url: `${process.env.REACT_APP_BACKEND_API}/forgot-password`,
      data: { email }
    })
      .then(response => {
        console.log('forgot pass sucess')
        toast.success(response.data.message)
        setValues({ ...values, buttonText: 'Requested' })
      })
      .catch(error => {
        console.log('forgot pass ERROR', error.response.data.error)
        setValues({ ...values, buttonText: 'Request' })
        toast.error(error.response.data.error)
      })
  }
  const forgotPasswordForm = () => {
    return (
      <form>
        <div className='form-group'>
          <label className='text-muted'>Email</label>
          <input autoComplete='true' onChange={handleChange('email')} type='text' className='form-control' />
          <button type='submit' className='btn' onClick={e => handleSubmit(e)}>{buttonText}</button>
        </div>
      </form>
    )
  }
  return (
    <div>
      <ToastContainer />
      {/* {JSON.stringify({ name, email, password })} */}
      {forgotPasswordForm()}
    </div>
  )
}

export default Forgot