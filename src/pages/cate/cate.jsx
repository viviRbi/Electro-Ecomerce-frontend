import React, { useState, useEffect } from "react"

const CateList = () => {
  const [categories, setCategories] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch(`${process.env.REACT_APP_BACKEND_ITEMS}/category`)
      .then(res => res.json())
      .then(cate => (setCategories({ categories: cate })))
      .then(() => setLoading(false))
  }, [])

  const list = () => {
    return categories.categories.map(e => (
      <h4 key={e._id}>{e.name} &nbsp;&nbsp;
    <small>
          Update
    </small>
        &nbsp;&nbsp;
        <small>
          Delete
    </small>
      </h4>
    ))
  }
  return (
    <div>
      <h1>Category list</h1>
      {loading ? <h2>Loading</h2> : ""}
      {categories.categories ? list() : ""}
    </div>
  )
}
export default CateList