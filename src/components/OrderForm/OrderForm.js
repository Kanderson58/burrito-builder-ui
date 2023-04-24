import React, { useState } from 'react';
import { postOrders } from '../../apiCalls';

const OrderForm = ({setOrders, orders, setError}) => {
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState([]);

  const handleSubmit = e => {
    const newOrder = {'id': orders.length + 1, 'name': name, 'ingredients': ingredients}
    e.preventDefault();
    clearInputs();
    if(!name || !ingredients.length) {
      setError('Please fill out both your name and at least one ingredient!')
    } else {
      postOrders(newOrder)
        .then(response => setOrders([...orders, response]))
        .catch(error => {
          setError(`Problem with submitting order: ${error}`)})
    }
  }

  const clearInputs = () => {
    setName('');
    setIngredients([]);
  }

  const handleIngredientChange = (e) => {
    setError('');
    e.preventDefault();
    setIngredients([...ingredients, e.target.name]);
  }

  const handleNameChange = (e) => {
    setError('');
    setName(e.target.value);
  }

  const possibleIngredients = ['beans', 'steak', 'carnitas', 'sofritas', 'lettuce', 'queso fresco', 'pico de gallo', 'hot sauce', 'guacamole', 'jalapenos', 'cilantro', 'sour cream'];
  const ingredientButtons = possibleIngredients.map(ingredient => {
    return (
      <button key={ingredient} name={ingredient} onClick={e => handleIngredientChange(e)}>
        {ingredient}
      </button>
    )
  });

  return (
    <form>
      <input
        type='text'
        placeholder='Name'
        name='name'
        value={name}
        onChange={e => handleNameChange(e)}
      />

      { ingredientButtons }

      <p>Order: { ingredients.join(', ') || 'Nothing selected' }</p>

      <button id='submit' onClick={e => handleSubmit(e)}>
        Submit Order
      </button>
    </form>
  )
}

export default OrderForm;
