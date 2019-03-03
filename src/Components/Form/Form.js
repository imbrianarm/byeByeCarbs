import React from "react";
import "./Form.css";

const Form = props => {
  return (
    <div key={props.id} className="formContainer">
      {/* FORM FOR USER TO SELECT CRITERIA FOR API CALL */}
      <form action="submit" onSubmit={props.handleSubmit}>
        <input
          type="text"
          placeholder="Recipe/Ingredient search"
          onChange={props.handleChange}
          name="userInput"
          value={props.userInputValue}
        />

        <label htmlFor="meal">Filter by meal?</label>
        <select
          name="meal"
          value={props.mealValue}
          onChange={props.handleChange}
        >
          <optgroup label="Pick a Meal">
            <option value="">All Meals</option>
            <option value="Breakfast and Brunch">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Main Dishes">Dinner</option>
            <option value="Desserts">Desserts</option>
          </optgroup>
        </select>

        <label htmlFor="time">Filter by Cook/Prep Time?</label>
        <select
          name="time"
          value={props.timeValue}
          onChange={props.handleChange}
        >
          <optgroup label="Pick a cook/prep time">
            <option value="">Any Amount of time</option>
            <option value="1800">Half Hour or Less</option>
            <option value="3600">One Hour or Less</option>
          </optgroup>
        </select>

        <button type="submit">Find Recipes</button>
      </form>
    </div>
  );
};

export default Form;
