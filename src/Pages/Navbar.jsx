import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ cart }) => (
  <nav>
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/products">Products</Link></li>
      <li><Link to="/about">About</Link></li>
      <li><Link to="/cart">Cart ({cart.length})</Link></li>
    </ul>
  </nav>
);

export default Navbar;
