import React from "react";
import "./Header.css";
import Form from "../form/Form.js";

const Header = props => {
  return (
    <header className="header">
      <div className="wrapper">
        <div className="headingContainer">
          <h1>Food App</h1>
        </div>
      </div>
      <div className="bannerContainer">
        <div className="wrapper">
          <div className="subheadingContainer">
            <h2>The Keto Recipe Finder</h2>
          </div>

          {/* FORM FOR USER TO SELECT CRITERIA FOR API CALL */}
          <Form
            handleSubmit={props.handleSubmit}
            handleChange={props.handleChange}
            mealValue={props.meal}
            timeValue={props.time}
            userInputValue={props.userInput}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
