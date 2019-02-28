import React, { Component } from "react";
import "./App.css";
import axios from "axios";

class App extends Component {
  constructor() {
    super();
    //SETTING OUR APP COMPONENT INITIAL STATE TO EMPTY VALUES
    this.state = {
      recipes: [],
      userInput: "",
      meal: "",
      time: "",
      isLoading: "",
      hasNoResults: ""
    };
  }

  handleChange = event => {
    // EVENT = EVENT LISTENER, TARGET = TARGET(INPUT), VALUE=INPUT VALUE
    // THE ARGUMENT PASSED TO THIS FUNCTION IS THE EVENT (A CHANGE IN THE INPUT)
    // WE SET STATE USING THAT INPUT'S NAME AND VALUE
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  // THIS EVENT IS FIRED EVERY TIME THE FORM IS SUBMITTED
  handleSubmit = event => {
    //WE WANT TO PREVENT THE DEFAULT ON BUTTON SUBMIT
    event.preventDefault();

    // ACTIVATE LOADING STATE UPON BUTTON CLICK
    this.setState({
      isLoading: true
    });

    //CALLING API FUNCTION ON FORM SUBMIT
    this.getRecipes(this.state.userInput, this.state.meal, this.state.time);
  };

  //WHEN APP COMPONENT IS MOUNTED TO THE PAGE, CALL OUR FUNCTION
  // componentDidMount() {}

  //CREATING A FUNCTION THAT WILL REQUEST OUR API DATA
  getRecipes = (userInput, meal, time) => {
    axios({
      method: "GET",
      url: "https://api.yummly.com/v1/api/recipes",
      dataResponse: "json",
      params: {
        _app_key: "aaf99c9fd90f66999849bafbff2e01ff",
        _app_id: "ff2d06e9",
        format: "json",
        q: "keto " + userInput,
        maxResult: 10,
        requirePictures: true,
        maxTotalTimeInSeconds: time,
        allowedCourse: "course^course-" + meal
      }
    }).then(results => {
      //STORING OUR DESIRED DATA(ARRAY OF RECIPES OBJECTS) IN THE RESULTS VARIABLE - JUST TO BE CLEANER
      results = results.data.matches;
      if (results.length === 0) {
        // ERROR HANDLING WHEN NO RESULTS RETURNED
        this.setState({
          hasNoResults: true,
          isLoading: false
        });
      } else {
        //DEFINING VARIABLE THAT HOLDS RECIPE IDS FROM RESULTS TO BE PASSED INTO 2ND API CALL
        const recipeIds = results.map(item => {
          return item.id;
        });
        // DEFINE VARIABLE WHICH WILL MAP RECIPE IDS THROUGH 2ND API CALL FOR EACH RESULT RETURNED FROM 1ST API CALL
        const recipePromises = recipeIds.map(item => {
          return this.getRecipeUrl(item);
        });
        // CREATE PROMISE TO RUN 2ND API ONLY ONCE RESULTS HAVE BEEN RETURNED FROM 1ST API
        Promise.all(recipePromises).then(values => {
          //MAP OVER 2ND API RESULTS AND EXTRACT ATTRIBUTION OBJECT, WHICH CONTAINS THE INFO NEEDED
          const recipeUrlResults = values.map(item => {
            return [item.data.attribution, item.data.images];
          });
          // APPEND ATTRIBUTION RESULTS FROM EACH ITEM BACK TO RESULTS
          recipeUrlResults.forEach((attributes, i) => {
            results[i].attribution = attributes;
          });

          // UPDATE OUR EMPTY RECIPES ARRAY FROM STATE AND FILL IT WITH THE RESULTS DATA RETURNED FROM BOTH API CALL
          this.setState({
            recipes: results,
            isLoading: false
          });
        });
      }
    });
  };

  //CREATING A 2ND API CALL FUNCTION THAT WILL REQUEST OUR API CALL TO EXTRACT URL
  getRecipeUrl = url => {
    return axios({
      method: "GET",
      url: "https://api.yummly.com/v1/api/recipe/" + url,
      dataResponse: "json",
      params: {
        _app_key: "aaf99c9fd90f66999849bafbff2e01ff",
        _app_id: "ff2d06e9",
        format: "json"
      }
    });
  };

  render() {
    return (
      <div className="App">
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

        {/* WILL DISPLAY NO SEARCH RESULTS ERROR MESSAGE */}
        {this.state.hasNoResults && (
          <p>Sorry there were no results. Please search again!</p>
        )}

        {/* WILL DISPLAY LOADING STATE AND THEN RENDER SEARCH RESULTS FROM THIS.STATE ONCE LOADED */}
        {this.state.isLoading ? (
          <p>Loading...</p>
        ) : (
          this.state.recipes.map(item => {
            return (
              <div key={item.id}>
                <h2>{item.recipeName}</h2>
                <img
                  src={item.attribution[1][0].hostedLargeUrl}
                  alt={item.recipeName}
                />
                <p>
                  Total Cook/Prep Time: {item.totalTimeInSeconds / 60} minutes
                </p>
                <div
                  dangerouslySetInnerHTML={{ __html: item.attribution[0].html }}
                />
              </div>
            );
          })
        )}
      </div>
    );
  }
}

export default App;
