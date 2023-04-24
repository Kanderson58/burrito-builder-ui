export const getOrders = async() => {
  const fetchOrders = fetch('http://localhost:3001/api/v1/orders')
  const response = await fetchOrders
  return response.json();
}