import { useState, useEffect } from "react";

import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";
import Orders from "./components/Cart/Orders";
import Modal from "./components/UI/Modal";
import classes from "./components/Cart/Cart.module.css";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);
  const [ordersShown, setOrdersShown] = useState(false);
  const [haveOrders, setHaveOrders] = useState(false);
  const [report, setReport] = useState([]);

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

  /* useEffect(() => {
    const fetchOrders = async () => {
      let ordersReport = [];
      const loadedOrders = [];
      const response = await fetch(
        "https://react-http-326aa-default-rtdb.firebaseio.com/orders.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong....");
      }
      const responseData = await response.json();

      for (const key in responseData) {
        loadedOrders.push({
          id: key,
          orderedItems: responseData[key].orderedItems,
          user: responseData[key].user,
        });
      }

      const makeReports = (loadedOrders) => {
        for (const order of loadedOrders) {
          let orderReport = "\n\n" + order.user.name + " ordered ";

          for (const meal of order.orderedItems) {
            if (
              meal !== order.orderedItems[0] &&
              meal !== order.orderedItems[order.orderedItems.length - 1]
            ) {
              orderReport += ", ";
            }
            if (
              meal === order.orderedItems[order.orderedItems.length - 1] &&
              meal !== order.orderedItems[0]
            ) {
              orderReport += " and ";
            }
            if (meal.amount !== 1) {
              orderReport += meal.amount + "x ";
            }
            orderReport += meal.name;
          }
          orderReport +=
            ".\nAdress: " +
            order.user.street +
            ", " +
            order.user.postalCode +
            " " +
            order.user.city;

          ordersReport.push(orderReport);
        }
        return ordersReport;
      };
      setReport(makeReports(loadedOrders));
    };

    fetchOrders();
  }, []); */

  return (
    <CartProvider>
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      {ordersShown && <Orders onClose={hideOrdersHandler} />}

      <Header onShowCart={showCartHandler} onShowOrders={showOrdersHandler} />

      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
