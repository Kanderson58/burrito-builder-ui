import React, { useEffect, useState } from 'react';
import './App.css';
import {getOrders} from '../../apiCalls';
import Orders from '../../components/Orders/Orders';
import OrderForm from '../../components/OrderForm/OrderForm';

const App = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders()
      .then(data => setOrders(data.orders))
      .catch(err => console.error('Error fetching:', err));
  }, []);

  return (
    <main className="App">
      {console.log(orders)}
      <header>
        <h1>Burrito Builder</h1>
        <OrderForm setOrders={setOrders} orders={orders}/>
      </header>
      <Orders orders={orders}/>
    </main>
  );
}



export default App;
