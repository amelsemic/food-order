import Card from "../UI/Card";
import { useEffect, useState } from "react";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";
import BeatLoader from "react-spinners/BeatLoader";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [httpError, setHttpError] = useState();
  useEffect(() => {
    const fetchMeals = async () => {
      setIsLoading(true);
      const loadedMeals = [];
      const response = await fetch(
        "https://react-http-326aa-default-rtdb.firebaseio.com/meals.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong....");
      }
      const responseData = await response.json();

      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setMeals(loadedMeals);
      setIsLoading(false);
    };

    fetchMeals().then((err) => {
      setIsLoading(false);
      err && setHttpError(err.message);
    });
  }, []);

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        {isLoading && (
          <div className={classes.spinner}>
            <BeatLoader />
          </div>
        )}

        {httpError && <p>{httpError}</p>}
        {!isLoading && <ul>{mealsList}</ul>}
      </Card>
    </section>
  );
};

export default AvailableMeals;
