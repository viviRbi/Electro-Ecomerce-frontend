import React, { useState, useEffect } from 'react'
import Form from "../component/Form/Form"
import { Link } from "react-router-dom"

const Admin = () => {
  const [create, setCreate] = useState(false)
  const [createCate, setCreateCate] = useState(false)
  const [cateName, setCateName] = useState('')
  const createToggle = () => {
    setCreate({ create: true })
  }

  const escHandle = () => {
    setCreate({ create: false })
    console.log('esc')
  }

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchProducts = () => {
    setLoading(true)
    fetch(`${process.env.REACT_APP_BACKEND_ITEMS}/product`)
      .then(res => res.json())
      .then(res => (setProducts(res), setLoading(false)))
  }
  const remove = (e) => {
    const id = e.target.attributes.getNamedItem('id').value
    fetch(`${process.env.REACT_APP_BACKEND_ITEMS}/product/delete/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json"
      }
    })
      .then(res => res.json())
      .then(res => setProducts({ products: res }))
      .catch(err => console.log(err))
  }
  const cateChangeHandle = e => {
    setCateName({ cateName: e.target.value })
  }
  const cateEsc = () => {
    setCreateCate({ createCate: false })
  }
  const createCateSubmit = e => {
    e.preventDefault()
    fetch(`${process.env.REACT_APP_BACKEND_ITEMS}/category/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: cateName.cateName })
    })
      .then(cate => cate.json())
      .then(() => setCreateCate({ createCate: false }))
  }
  const createCategory = () => {
    setCreateCate({ createCate: true })
  }
  const cateClass = createCate.createCate ? "display" : "none"

  const categoryForm = () => (
    <form className={`form bt-3 ${cateClass}`}>
      <section className="form-holder">
        <h1>Create category &nbsp; &nbsp; &nbsp;
        <small onClick={cateEsc}>Close</small></h1>
        <input onChange={e => cateChangeHandle(e)} placeholder="name"></input>
        <button onClick={e => createCateSubmit(e)}>Submit</button>
      </section>
    </form>
  )
  useEffect(() => {
    fetchProducts()
  }, [])
  return (
    <div>
      {create ? <Form escHandle={escHandle} create={create} setCreate={setCreate} /> : <p></p>}
      <h1>Admin page</h1>
      <section className="admin-button">
        <button className="btn btn-outline-primary" onClick={e => createToggle(e)}>Create product</button>
        <button className="btn btn-secondary" onClick={e => createCategory(e)}>Create Category</button>
        <Link to="/admin/categories"><button className="btn btn-info" >View Category</button></Link>
      </section>

      {categoryForm()}
      <div>
        {loading ? <h2>Loading</h2> : ""}
        <h1>Home</h1>
        {products ? products.map(each => (
          <div key={each._id}>
            <h1>{each.name}</h1>
            <div className="pro-img" style={{ backgroundImage: `url(${process.env.REACT_APP_BACKEND_ITEMS}/product/photo/${each._id})` }}></div>
            <button className="btn btn-primary">Update</button>
            <button className="btn btn-secondary"
              id={each._id}
              onClick={e => remove(e)}
            >Delete</button>
          </div>
        ))
          : null
        }
      </div>
    </div>
  )
}
export default Admin