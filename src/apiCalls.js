export const getOrders = async() => {
  const fetchOrders = fetch('http://localhost:3001/api/v1/orders')
  const response = await fetchOrders
  return response.json();
}

export const postOrders = (order) => {
  return fetch('http://localhost:3001/api/v1/orders', {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(order)
  }).then(response => {
    if(!response.ok) {
      console.log('uh oh')
    } else {
      console.log(response)
    }
  })
}