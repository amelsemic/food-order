import { useContext, useRef, useState } from "react";
import classes from "./Checkout.module.css";
import CartContext from "../../store/cart-context";

const isEmpty = (value) => value.trim().length === 0;
const isFiveChars = (value) => value.length === 5;

const Checkout = (props) => {
  const ctx = useContext(CartContext);

  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    city: true,
    postalCode: true,
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalCodeInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const eneteredName = nameInputRef.current.value;
    const eneteredStreet = streetInputRef.current.value;
    const eneteredPostalCode = postalCodeInputRef.current.value;
    const eneteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(eneteredName);
    const enteredStreetIsValid = !isEmpty(eneteredStreet);
    const enteredPostalCodetIsValid = isFiveChars(eneteredPostalCode);
    const enteredCityIsValid = !isEmpty(eneteredCity);

    setFormInputsValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      city: enteredCityIsValid,
      postalCode: enteredPostalCodetIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredCityIsValid &&
      enteredStreetIsValid &&
      enteredPostalCodetIsValid;

    if (!formIsValid) {
      return;
    }

    ctx.newOrder = true;
    
    props.onConfirm({
      name: eneteredName,
      street: eneteredStreet,
      city: eneteredCity,
      postalCode: eneteredPostalCode,
    });
    ctx.items.length = 0;
  };


  let nameValidity = formInputsValidity.name  ? classes.control : classes.invalid;
  let cityValidity = formInputsValidity.city  ? classes.control : classes.invalid;
  let postalCodeValidity = formInputsValidity.postalCode  ? classes.control : classes.invalid;
  let streetValidity = formInputsValidity.street  ? classes.control : classes.invalid;
  

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameValidity}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
      </div>
      <div className={streetValidity}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
      </div>
      <div className={postalCodeValidity}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalCodeInputRef} />
      </div>
      <div className={cityValidity}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
