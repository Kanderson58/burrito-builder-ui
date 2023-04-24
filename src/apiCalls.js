export const getOrders = () => {
  return fetch('http://localhost:3001/api/v1/orders')
    .then(response => {
      if(!response.ok) {
        throw new Error(response.statusText);
      } else {
        return response.json();
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
    if(!response.ok) {
      throw new Error(response.statusText);
    } else {
      return response.json()
    }
  });
}

export const deleteFetch = (orderID) => {
  return fetch(`http://localhost:3001/api/v1/orders/${orderID}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json"
    }
  }).then(response => {
    if(!response.ok) {
      throw new Error(response.statusText);
    } else {
      return response
    }
  });
}