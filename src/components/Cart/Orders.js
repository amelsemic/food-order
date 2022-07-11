import { useContext, useState, useEffect } from "react";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import classes from "./Orders.module.css"

const Orders = (props) => {
  const [reports, setReports] = useState([]);
  const ctx = useContext(CartContext);
  let {newOrder} =ctx;
  useEffect(() => {
    const fetchOrders = async () => {
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
        let ordersReport = [];
        for (const order of loadedOrders) {
          let orderReport = "\n\n" + order.user.name + " ordered ";
          console.log(order);
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
      setReports(makeReports(loadedOrders));
    };

    fetchOrders();
    newOrder = false;
  }, [newOrder]);

  return (
    <Modal onClose={props.onClose}>
      <div className={classes.orders}>
        <h1 >previously ordered...</h1>
        {reports.map((report) => (
            <span style={{ whiteSpace: "pre-wrap" }}>{report} </span>
        ))}
      </ div>
    </Modal>
  );
};

export default Orders;
