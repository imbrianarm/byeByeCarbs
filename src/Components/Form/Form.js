import React from "react";

const Form = props => {
  return (
    <div key={props.id}>
      {/* FORM FOR USER TO SELECT CRITERIA FOR API CALL */}
      <form action="submit" onSubmit={this.handleSubmit}>
        {/* ADD NAME TO SELECT ELEMENTS SO WE CAN ATTACH TO EVENT.TARGET.NAME TO NAME STATE */}
        <label htmlFor="meal">Select a meal?</label>
        <select
          name="meal"
          value={this.state.meal}
          onChange={this.handleChange}
        >
          <optgroup label="Pick a Meal">
            <option value="Breakfast and Brunch">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Main Dishes">Dinner</option>
            <option value="Desserts">Desserts</option>
          </optgroup>
        </select>

        <label htmlFor="time">Choose Total Cook and Prep Time</label>
        <select
          name="time"
          value={this.state.time}
          onChange={this.handleChange}
        >
          <optgroup label="Pick a time">
            <option value="1800">Half Hour or Less</option>
            <option value="3600">One Hour or Less</option>
            <option value="">Any Amount of time</option>
          </optgroup>
        </select>

        <input
          type="text"
          placeholder="recipe search"
          onChange={this.handleChange}
          name="userInput"
          value={this.state.userInput}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Form;