import { Fragment } from "react";

import HeaderCartButton from "./HeaderCartButton";
import mealsImage from "../../assets/meals.jpg";
import classes from "./Header.module.css";
import classes2 from "./HeaderCartButton.module.css";

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1> Hanuta meals </h1>
        <HeaderCartButton onClick={props.onShowCart} />
        <button className={classes2.button} onClick={props.onShowOrders}>
          Previous <br /> orders
        </button>
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsImage} alt="A table full of delicious food!" />
      </div>
    </Fragment>
  );
};

export default Header;
