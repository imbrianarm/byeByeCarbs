import React from "react";
import "./Results.css";

const Results = props => {
  return (
    <div key={props.id} className="cardContainer">
      <h2>{props.name}</h2>
      <div className="cardImageContainer">
        <img className="cardImage" src={props.image} alt={props.name} />
      </div>
      <p>Total Cook/Prep Time: {props.time / 60} minutes</p>
      <a href={props.url} target="_blank">
        {props.name}
      </a>{" "}
      information powered by{" "}
      <img alt="Yummly" src="https://static.yummly.co/api-logo.png" />
    </div>
  );
};

export default Results;
