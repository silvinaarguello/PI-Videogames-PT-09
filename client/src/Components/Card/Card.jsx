import React from "react";
import { Link } from "react-router-dom";
import s from "./Card.module.css";

export default function Card({ image, name, rating, genre, id }) {
  // console.log(genre)
  return (
    <div>
      <div className={s.cards2}>
        <div className={s.cards}>
          <Link className={s.NavLink} to={"/videogames/" + id}>
            <div>
              <img
                className={s.image2}
                src={image}
                alt="no se encontro"
                width="330px"
                height="250px"
              />
              <h2 className={s.title2}>{name}</h2>
              <h5 className={s.genres2}>Genres: {genre.join(", ")} </h5>
              <h5 className={s.rat}>Rating: {rating} </h5>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}