import React, { useState } from 'react';
import { postOrders } from '../../apiCalls';

const OrderForm = ({setOrders, orders}) => {
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState([]);

  const handleSubmit = e => {
    const newOrder = {'name': name, 'ingredients': ingredients}
    e.preventDefault();
    clearInputs();
    if(!name || !ingredients.length) {
      alert('Please fill out your name and at least one ingredient!')
    } else {
      postOrders(newOrder)
      setOrders([...orders, newOrder])
    }
  }

  const clearInputs = () => {
    setName('');
    setIngredients([]);
  }

  const handleIngredientChange = (e) => {
    e.preventDefault();
    setIngredients([...ingredients, e.target.name]);
  }

  const handleNameChange = (e) => {
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

      <button onClick={e => handleSubmit(e)}>
        Submit Order
      </button>
    </form>
  )
}

export default OrderForm;
