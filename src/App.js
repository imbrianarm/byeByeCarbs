import React, { Component } from "react";
import "./App.css";
import "./animate.css";
import axios from "axios";
import Header from "./components/header/Header.js";
import Results from "./components/results/Results.js";
import Footer from "./components/footer/Footer.js";

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
        maxResult: 100,
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
          isLoading: false,
          recipes: []
        });
      } else {
        //DEFINING VARIABLE THAT HOLDS RECIPE IDS FROM RESULTS TO BE PASSED INTO 2ND API CALL
        const recipeIds = results.map(item => {
          return item.id;
        });
        // DEFINE VARIABLE WHICH WILL MAP RECIPE IDS THROUGH 2ND API CALL FOR EACH RESULT RETURNED FROM 1ST API CALL
        const recipePromises = recipeIds.map(item => {
          return this.getRecipeDetails(item);
        });
        // CREATE PROMISE TO RUN 2ND API ONLY ONCE RESULTS HAVE BEEN RETURNED FROM 1ST API
        Promise.all(recipePromises).then(values => {
          //MAP OVER 2ND API RESULTS AND EXTRACT ATTRIBUTION OBJECT, WHICH CONTAINS THE INFO NEEDED
          const recipeUrlResults = values.map(item => {
            return [item.data];
          });
          // APPEND ATTRIBUTION RESULTS FROM EACH ITEM BACK TO RESULTS
          recipeUrlResults.forEach((attributes, i) => {
            results[i].recipeApiResults = attributes;
          });

          // UPDATE OUR EMPTY RECIPES ARRAY FROM STATE AND FILL IT WITH THE RESULTS DATA RETURNED FROM BOTH API CALL
          this.setState({
            hasNoResults: false,
            recipes: results,
            isLoading: false
          });
        });
      }
    });
  };

  //CREATING A 2ND API CALL FUNCTION THAT WILL REQUEST OUR API CALL TO EXTRACT URL
  getRecipeDetails = url => {
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
        <Header
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          mealValue={this.state.meal}
          timeValue={this.state.time}
          userInputValue={this.state.userInput}
        />

        <main>
          <section className="results">
            <div className="wrapper">
              {/* WILL DISPLAY LOADING STATE AND THEN RENDER SEARCH RESULTS FROM THIS.STATE ONCE LOADED */}
              {this.state.isLoading ? (
                <p className="loading animated heartBeat">Loading...</p>
              ) : (
                this.state.recipes.map(item => {
                  return (
                    <Results
                      key={item.id}
                      name={item.recipeName}
                      image={item.recipeApiResults[0].images[0].hostedLargeUrl}
                      time={item.totalTimeInSeconds}
                      url={item.recipeApiResults[0].attribution.url}
                    />
                  );
                })
              )}

              {/* WILL DISPLAY NO SEARCH RESULTS ERROR MESSAGE */}
              {this.state.hasNoResults && (
                <p className="error">
                  Sorry there were no results. Please search again!
                </p>
              )}
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }
}

export default App;
