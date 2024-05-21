import React from 'react';

const Products = ({ products, addToCart, clickProduct }) => (
  <div>
    <h1>Products</h1>
    <div>
      {products.map(product => (
        <div key={product.id}>
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <button onClick={() => {
            addToCart(product);
            clickProduct(product.id, product.isClicked);
          }}>
            {product.isClicked ? 'Remove from Cart' : 'Add to Cart'}
          </button>
        </div>
      ))}
    </div>
  </div>
);

export default Products;
