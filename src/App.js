import { useState } from "react";

import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";
import Orders from "./components/Cart/Orders";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);
  const [ordersShown, setOrdersShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  const showOrdersHandler = () => {
    setOrdersShown(true);
  };

  const hideOrdersHandler = () => {
    setOrdersShown(false);
  };


  return (
    <CartProvider>
      <Header onShowCart={showCartHandler} onShowOrders={showOrdersHandler} />

      {cartIsShown && <Cart onClose={hideCartHandler} />}
      {ordersShown && <Orders onClose={hideOrdersHandler} />}
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
