import React from 'react';
import './Orders.css';

const Orders = ({orders}) => {

  const deleteOrder = (e) => {
    console.log(e.target.parentNode.id)
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