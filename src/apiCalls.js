export const getOrders =() => {
  return fetch('http://localhost:3001/api/v1/orders')
    .then(response => {
      if(response.ok) {
        console.log('successful get', response);
        return response.json();
      } else {
        console.log('bad get', response);
      }
    });
}

export const postOrders = (order) => {
  return fetch('http://localhost:3001/api/v1/orders', {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(order)
  }).then(response => {
    if(response.ok) {
      console.log('successful post', response);
    } else {
      console.log('bad post', response);
    }
  })
}