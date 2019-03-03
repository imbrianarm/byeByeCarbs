import React from "react";
import "./Results.css";

const Results = props => {
  return (
    <div key={props.id} className="cardContainer">
      <div className="cardTextContainer">
        <a href={props.url} target="_blank">{props.name}</a>
      </div>
      <figure className="cardImageContainer">
        <img className="cardImage" src={props.image} alt={props.name} />
        {/* FIGCAPTION IS INFO THAT WILL DISPLAY ON IMAGE HOVER */}
        <figcaption className="cardCaption">
          <p>Total Cook/Prep Time: {props.time / 60} minutes</p>
          <a href={props.url} target="_blank">
            {props.name}
          </a>{" "}
          information powered by{" "}
          <img alt="Yummly" src="https://static.yummly.co/api-logo.png" />
        </figcaption>
      </figure>
    </div>
  );
};

export default Results;
