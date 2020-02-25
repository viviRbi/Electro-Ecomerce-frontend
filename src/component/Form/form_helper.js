export const createProduct = (product) => {
  fetch(`${process.env.REACT_APP_BACKEND_ITEMS}/product/create`, {
    method: "POST",
    headers: {
      Accept: "application/json"
    },
    body: product
  })
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(err => console.log(err))
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
    .catch(err => console.log(err))
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