import React from 'react';
import './Orders.css';
import { deleteFetch } from '../../apiCalls';

const Orders = ({setOrders, orders, setError}) => {

  const deleteOrder = (e) => {
    const filteredOrders = orders.filter(order => order.id !== parseInt(e.target.parentNode.id));

    deleteFetch(e.target.parentNode.id)
      .then(response => response.ok ? setOrders(filteredOrders) : null)
      .catch(error => setError(`Couldn't delete the order: ${error}`));
  }

  const orderEls = orders.map(order => {
    return (
      <div className="order" id={order.id} key={order.id}>
        <h3>{order.name}</h3>
        <ul className="ingredient-list">
          {order.ingredients.map(ingredient => {
            return <li key={ingredient}>{ingredient}</li>
          })}
        </ul>
        <button onClick={(e) => deleteOrder(e)}>Delete Order</button>
      </div>
    )
  });

  return (
    <section>
      { orderEls.length ? orderEls : <p>No orders yet!</p> }
    </section>
  )
}

export default Orders;