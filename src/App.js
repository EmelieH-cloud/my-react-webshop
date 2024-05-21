import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Pages/Navbar';
import Home from './Pages/Home';
import Products from './Pages/Products';
import About from './Pages/About';
import Cart from './Pages/Cart';


async function getShopData() 
{
  /* 
Metoden getShopData() Hämtar data från ett API och returnerar den som ett JSON-objekt.
Await används för att vänta på att fetchen och JSON-konverteringen ska bli klar.
 */
  const url = 'https://fakestoreapi.com/products';
  const response = await fetch(url); // hämtar datan som en enda lång json-sträng 
  const data = await response.json(); // Konverterar JSON-strängen till ett JavaScript-objekt
  return data; // returnera javascript-objektet. 
}

const App = () =>  
{
// cart är en state-variabel som initialt är en tom array och kommer hålla reda på produkterna i kundvagnen.
  const [cart, setCart] = useState([]);

//  storeProducts är en state-variabel som också initialt är en tom array. Den kommer att hålla reda på alla
// produkter som hämtas. 
  const [storeProducts, setStoreProducts] = useState([]);

  //----------------------------------------------------------------------------------
  useEffect(() => 
  {
    async function fetchData() 
    {
      const products = await getShopData(); // hämtar datan från API:et och sparar resultatet i arrayen products 

      // När products-arrayen är fylld så används setStoreProducts för att uppdatera state (initialt en tom array!)
      setStoreProducts(products.map(product => ({
        //  För varje produkt så skapas en kopia av objektet och lägger till två nya egenskaper, isClicked och qty 
        ...product,
        isClicked: false,
        qty: 1
        // Genom att initialisera quantity till ett så undviks att en produkt kan ha en kvantitet på 0 eller undefined. 
      })));
    }
    fetchData();
  }, []);
  /*
  En tom array som andra argument till useEffect betyder att effekten bara körs en gång efter att 
   den initiala renderingen av komponenten har slutförts.
  */
 // -----------------------------------------------------------------------------

  const handleCheckout = () => {
  /*
  Återställer butikens produkter genom att sätta isClicked till false och återställa quantity till 1 för varje produkt. 
  Den tömmer också kundvagnen (cart).
  */
    setStoreProducts(
      storeProducts.map(product => ({ ...product, isClicked: false, qty: 1 }))
    );
    setCart([]);
  };

  const clickProduct = (id, clicked) => {
  /*
  Ändrar statusen för en produkt (om den är markerad eller inte) genom att byta värdet på isClicked för den valda produkten.
  */
    setStoreProducts(
      storeProducts.map(element => {
        if (element.id === id) {
          element.isClicked = !clicked;
        }
        return element;
      })
    );
  };

  const addToCart = (obj) => {
    // Lägger till en produkt i kundvagnen om den inte redan finns där.
    if (!cart.some(item => item.id === obj.id)) {
      setCart([...cart, obj]);
    }
  };

  const changeQty = (id, increment) => {
    //  Ändrar kvantiteten för en produkt i kundvagnen baserat på det givna ID:et och om kvantiteten ska ökas eller minskas.
    setCart(
      cart.map(element => 
        {
        if (element.id === id) {
          element.qty = increment ? element.qty + 1 : element.qty - 1;
        }
        return element;
      })
    );
  };

  const removeProduct = (id) => {
    setCart(cart.filter(element => element.id !== id));
    clickProduct(id, true);
  };

  return (
    <HashRouter basename="/">
      <Navbar cart={cart} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={
          <Products
            addToCart={addToCart}
            changeQty={changeQty}
            cart={cart}
            products={storeProducts}
            clickProduct={clickProduct}
          />
        } />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={
          <Cart
            cart={cart}
            changeQty={changeQty}
            removeProduct={removeProduct}
            handleCheckout={handleCheckout}
          />
        } />
      </Routes>
    </HashRouter>
  );
};

export default App;

