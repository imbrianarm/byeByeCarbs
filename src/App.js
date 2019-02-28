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
      time: 0,
      isLoading: true
    };
  }

  handleChange = event => {
    //EVENT = EVENT LISTENER, TARGET = TARGET(INPUT), VALUE=INPUT VALUE
    // THE ARGUMENT PASSED TO THIS FUNCTION IS THE EVENT (A CHANGE IN THE INPUT)
    // WE SET STATE USING THAT INPUT'S NAME AND VALUE
    // (THIS MAKES THE FUNCTION REUSABLE)
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  // THIS EVENT IS FIRED EVERY TIME THE FORM IS SUBMITTED
  handleSubmit = event => {
    //WE WANT TO PREVENT THE DEFAULT ON BUTTON SUBMIT
    event.preventDefault();
    // WE WANT TO TAKE THIS INFO FROM STRAIGHT - NOT FROM THE EVENT LISTENER DIRECTLY
    console.log(this.state.userInput);
    // THE ARGUMENT PASSED TO THIS FUNCTION IS THE EVENT (SUBMISSION OF THE FORM)
    // RESET THE STATE SO THE INPUT IS CLEARED OUT
    this.setState({
      userInput: "",
      meal: "",
      time: 0
    });
  };

  //WHEN APP COMPONENT IS FINALLY MOUNTED (CREATED) TO THE PAGE, CALL OUR FUNCTION
  componentDidMount() {
    this.getRecipes();
    // this.getRecipeUrl();
  }

  //CREATING A FUNCTION THAT WILL REQUEST OUR API DATA
  getRecipes = () => {
    axios({
      method: "GET",
      url: "https://api.yummly.com/v1/api/recipes",
      dataResponse: "json",
      params: {
        _app_key: "aaf99c9fd90f66999849bafbff2e01ff",
        _app_id: "ff2d06e9",
        format: "json",
        q: "keto",
        maxResult: 10,
        requirePictures: true,
        maxTotalTimeInSeconds: 1800,
        allowedCourse: "course^course-Main Dishes"
      }
    }).then(results => {
      //STORING OUR DESIRED DATA(ARRAY OF RECIPES OBJECTS) IN THE RESPONSE VARIABLE - JUST TO BE CLEANER
      results = results.data.matches;
      console.log(results);
      // UPDATE OUR EMPTY RECIPES ARRAY FROM STATE AND FILL IT WITH THE DATA RESPONSE THAT CONTAINS THE ARRAY OF RECIPES OBJECTS
      this.setState({
        recipes: results,
        isLoading: false
      });
      console.log(this.state);
    });
  };

  //CREATING A 2ND FUNCTION THAT WILL REQUEST OUR API CALL TO EXTRACT URL
  getRecipeUrl = url => {
    axios({
      method: "GET",
      url: `https://api.yummly.com/v1/api/recipe/url`,
      dataResponse: "json",
      params: {
        _app_key: "aaf99c9fd90f66999849bafbff2e01ff",
        _app_id: "ff2d06e9",
        format: "json"
      }
    }).then(results => {
      //STORING OUR DESIRED DATA(ARRAY OF RECIPES OBJECTS) IN THE RESPONSE VARIABLE - JUST TO BE CLEANER
      // results = results.data.matches;
      console.log(results);
      // UPDATE OUR EMPTY RECIPES ARRAY FROM STATE AND FILL IT WITH THE DATA RESPONSE THAT CONTAINS THE ARRAY OF RECIPES OBJECTS
      this.setState({
        // recipes: results,
        isLoading: false
      });
    });
  };

  render() {
    return (
      <div className="App">
        <form action="submit" onSubmit={this.handleSubmit}>
          {/* ADD NAME SO WE CAN ATTACH TO EVENT.TARGET.NAME TO NAME STATE */}

          <label htmlFor="meal">Select a meal?</label>
          <select
            name="meal"
            value={this.state.meal}
            onChange={this.handleChange}
          >
            <optgroup label="Pick a Meal">
              <option value="Breakfast and Brunch">Breakfast</option>
              <option value="Lunch and Snacks">Lunch</option>
              <option value="Main Dishes">Dinner</option>
              <option value="Desserts">Desserts</option>
            </optgroup>
          </select>

          {console.log(this.state.meal)}

          <label htmlFor="time">Choose Total Cook and Prep Time</label>
          <select
            name="time"
            value={this.state.time}
            onChange={this.handleChange}
          >
            <optgroup label="Pick a time">
              <option value="1800">Half Hour or Less</option>
              <option value="3600">One Hour or Less</option>
              <option value="">More than One Hour</option>
            </optgroup>
          </select>

          {console.log(this.state.time)}

          <input
            type="text"
            placeholder="recipe search"
            onChange={this.handleChange}
            // the name attribute here is used to make the handlechange method reusable
            name="userInput"
            //we're binding the value of this input to the value that exists for it in state
            //this is called a "controlled input"
            value={this.state.userInput}
          />
          {console.log(this.state.userInput)}
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default App;
