import React, { useLayoutEffect } from "react";
import { Link } from "react-router-dom";

function Card({ className, image, title, body, button, link, width, height }) {
  useLayoutEffect(() => {
    const blankCards = document.querySelectorAll(".blankCard");
    blankCards.forEach((c) => {
      c.style.width = width;
      c.style.height = height;
    });
  }, [width, height]);

  return (
    <div className="figure m-4">
      <div className="blankCard image-main"></div>
      <div className={className}>
        <div className="card" style={{ width: width, height: height }}>
          <img src={image} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{body}</p>
            <Link to={link}>
              <button className="btn btn-primary card-button">{button}</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
