import React, { Component } from "react";

// this functional stateless component renders a bootstrap heart icon

// functional stateless component
// grab liked and handleLike function from props
const Heart = ({ liked, handleLike }) => {
  return (
    // props.liked instead of this.props.liked for component extension syntax
    <i
      // logic for whether heart is filled in or not (bootstrap)
      className={liked === true ? "bi-heart-fill" : "bi-heart"}
      // handleLike is defined in components/movies.jsx
      onClick={handleLike}
    ></i>
  );
};

export default Heart;
