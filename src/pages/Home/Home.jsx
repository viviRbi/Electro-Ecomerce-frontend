import React, { useState, useEffect } from 'react'

const Home = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchProducts = () => {
    setLoading(true)
    fetch(`${process.env.REACT_APP_BACKEND_ITEMS}/product`)
      .then(res => res.json())
      .then(res => (setProducts(res), setLoading(false)))
  }
  useEffect(() => {
    fetchProducts()
  }, [])
  return (
    <div>
      {loading ? <h2>Loading</h2> : ""}
      <h1>Home</h1>
      {products ? products.map(each => (
        <div key={each._id}>
          <h1>{each.name}</h1>
          <div className="pro-img" style={{ backgroundImage: `url(${process.env.REACT_APP_BACKEND_ITEMS}/product/photo/${each._id})` }}></div>
        </div>
      ))
        : null
      }
    </div>
  )
}
export default Home

