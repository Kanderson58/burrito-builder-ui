import React, { useEffect, useState } from 'react';
import './App.css';
import {getOrders} from '../../apiCalls';
import Orders from '../../components/Orders/Orders';
import OrderForm from '../../components/OrderForm/OrderForm';

const App = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    getOrders()
      .then(data => {
        setOrders(data.orders)})
      .catch(error => setError(`Error fetching: ${error}`));
  }, []);

  return (
    <main className="App">
      <header>
        <h1>Burrito Builder</h1>
        <OrderForm setOrders={setOrders} orders={orders} setError={setError}/>
        { error && <span>{error}</span>}
      </header>
      <Orders orders={orders}/>
    </main>
  );
}



export default App;
