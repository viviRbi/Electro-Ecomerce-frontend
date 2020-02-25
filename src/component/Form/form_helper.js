export const createProduct = (product, products, setProducts) => {
  fetch(`${process.env.REACT_APP_BACKEND_ITEMS}/product/create`, {
    method: "POST",
    headers: {
      Accept: "application/json"
    },
    body: product
  })
    // .then(res => window.location.reload(false))
    .then(
      fetch(`${process.env.REACT_APP_BACKEND_ITEMS}/product`)
        .then(res => res.json())
        .then(res => setProducts(res))
    )
    .then(() => console.log('create success'))
}

export const updateProduct = (product) => {
  fetch(`${process.env.REACT_APP_BACKEND_ITEMS}/product/create`, {
    method: "PUT",
    headers: {
      Accept: "application/json"
    },
    body: product
  })
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(err => console.log(err))
}


export const getCategories = () => {
  return fetch(`${process.env.REACT_APP_BACKEND_ITEMS}/category`, {
    method: 'GET'
  })
    .then(response => response.json())
};

export const createCategory = (category) => {
  fetch(`${process.env.REACT_APP_BACKEND_ITEMS}/category/create`, {
    method: "POST",
    headers: {
      Accept: "application/json"
    },
    body: category
  })
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(err => console.log(err))
}