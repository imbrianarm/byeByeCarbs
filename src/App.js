import React, { Component } from 'react';
import './App.css';
import axios from "axios";

class App extends Component {
  constructor() {
    super();
    //SETTING OUR APP COMPONENT INITIAL STATE TO AN EMPTY 'RECIPES' ARRAY
    this.state = {
      recipes: [],
      isLoading: true
    };
  }
  //WHEN APP COMPONENT IS FINALLY MOUNTED (CREATED) TO THE PAGE, CALL OUR FUNCTION
  componentDidMount() {
    this.getRecipes();
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
        requirePictures: true
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
    });
  };

  
  render() {
    return (
      <div className="App">
        <h2>Here are some Recipes</h2>
      </div>
    );
  }
}

export default App;
