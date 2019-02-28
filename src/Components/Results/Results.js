import React from "react";

const Results = props => {
  return (
    <div key={props.id}>
      <h2>{props.name}</h2>
      <img src={props.image} alt={props.name} />
      <p>Total Cook/Prep Time: {props.time / 60} minutes</p>
      <div dangerouslySetInnerHTML={{ __html: props.url }} />
    </div>
  );
};

export default Results;
