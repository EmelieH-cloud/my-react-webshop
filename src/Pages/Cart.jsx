import React from 'react';

const Cart = ({ cart, changeQty, removeProduct, handleCheckout }) => (
  <div>
    <h1>Your Cart</h1>
    {cart.length === 0 ? (
      <p>Your cart is empty.</p>
    ) : (
      <div>
        {cart.map(item => (
          <div key={item.id}>
            <h2>{item.title}</h2>
            <p>Quantity: {item.qty}</p>
            <button onClick={() => changeQty(item.id, true)}>+</button>
            <button onClick={() => changeQty(item.id, false)}>-</button>
            <button onClick={() => removeProduct(item.id)}>Remove</button>
          </div>
        ))}
        <button onClick={handleCheckout}>Checkout</button>
      </div>
    )}
  </div>
);

export default Cart;
