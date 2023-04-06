import React, { useEffect, useState } from "react";
import {
  addToDb,
  deleteShoppingCart,
  getShoppingCart,
} from "../../utilities/fakedb";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import "./Shop.css";
import { Link } from "react-router-dom";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  useEffect(() => {
    fetch("products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  useEffect(() => {
    const storedCart = getShoppingCart();
    const savedCart = [];

    //step 1:  get the id
    for (const id in storedCart) {
      // Step 2: get the product by using id
      const addedProduct = products.find((product) => product.id === id);
      // step 3: Get quantity of the product
      if (addedProduct) {
        const quantity = storedCart[id];
        addedProduct.quantity = quantity;
        // step 4: added product add to the saved cart
        savedCart.push(addedProduct);
      }
    }
    // Step 5: Set the cart
    setCart(savedCart);
  }, [products]);

  function handleAddToCart(product) {
    const newCart = [...cart, product];
    setCart(newCart);
    addToDb(product.id);
  }

  const handleClearCart = () => {
    setCart([]);
    deleteShoppingCart();
  };

  return (
    <div className="shop-container">
      <div className="products-container">
        {products
          .map((product) => (
            <Product
              key={product.id}
              product={product}
              handleAddToCart={handleAddToCart}
            ></Product>
          ))
          .slice(0, 6)}
      </div>
      <div className="cart-container">
        <Cart cart={cart} handleClearCart={handleClearCart}>
          <Link to="/orders">
            <button className="btn-proced">Review Order</button>
          </Link>
        </Cart>
      </div>
    </div>
  );
};

export default Shop;
