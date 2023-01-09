import React from "react";
import { NavLink } from "react-router-dom";
import "./Card.css";

export default function Card({ image, name, rating, genre, id }) {
  // console.log(genre)
  return (
    <div>
      <div className="cards2">
        <div className="card">
          <NavLink className={"NavLink"} to={"/videogames/" + id}>
            <div>
              <img
                className="image2"
                src={image}
                alt="no se encontro"
                width="330px"
                height="250px"
              />
              <h2 className="title2">{name}</h2>
              <h5 className="genres2">Genres: {genre.join(", ")} </h5>
              <h5 className="rat">Rating: {rating} </h5>
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
