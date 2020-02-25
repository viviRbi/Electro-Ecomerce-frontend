import React, { useState, useEffect } from "react"
import "./Form.css"
import { createProduct, getCategories } from "./form_helper"

const Form = ({ escHandle, create, setCreate }) => {
  const [values, setValues] = useState({
    name: '',
    description: '',
    price: '',
    categories: [],
    category: '',
    quantity: '',
    photo: '',
    formData: '',
    createdProduct: ''
  })
  const { name, description, price, quantity, categories, category, createdProduct, formData } = values
  const handleChange = name => (e) => {
    const value = name === "photo" ? e.target.files[0] : e.target.value
    formData.set(name, value)
    setValues({ ...values, [name]: value })
  }
  const submitHandle = (e) => {
    e.preventDefault()
    setValues({ ...values, loading: true })
    createProduct(formData)
    setValues({ ...values, name: '', description: '', photo: '', price: '', quantity: '', loading: false })
  }

  useEffect(() => {
    getCategories().then(data => {
      setValues({ ...values, categories: data, formData: new FormData })
      console.log(data)
    })
  }, [])
  const formClass = create.create ? "block" : "none"
  return (
    <form className={`mb-3 form ${formClass}`} onSubmit={submitHandle} >
      <section className="form-group form-holder">
        <h1>Create a new product &nbsp; &nbsp; &nbsp; <small onClick={escHandle}>Close</small></h1>
        <input placeholder="name" onChange={handleChange("name")} value={name} className="form-control"></input>
        <select onChange={handleChange("category")} value={category} className="form-control">
          {categories.map(category => <option key={category._id} value={category._id}>{category.name}</option>)}
        </select>
        <input type="file" name="photo" accept="image/*" className="btn btn-secondary form-control" onChange={handleChange("photo")} />
        <input type="number" placeholder="price" onChange={handleChange("price")} value={price} className="form-control" />
        <input type="number" placeholder="quantity" onChange={handleChange("quantity")} value={quantity} className="form-control" />
        <textarea placeholder="description" onChange={handleChange("description")} value={description} className="form-control"></textarea>
        <button className="btm btm-outline-primary">Submit</button>
      </section>
    </form>
  )
}
export default Form