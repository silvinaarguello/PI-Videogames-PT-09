import React from "react";
import "./PaginadoStyle.css";

export default function Paginado({ gamesPage, allGames, paginado }) {
  const pageNumbers = [];

  for (var i = 1; i <= Math.ceil(allGames / gamesPage); i++) {
    pageNumbers.push(i);
  }


  return (
    <nav className="nav_container">
       <ul className="ul_container">
      {pageNumbers &&
        pageNumbers.map((number, i) => (
          <li className="li_container" key={i}>
            <button  onClick={() => paginado(number)}>
              {number}
            </button>
          </li>
        ))}
        </ul>
    </nav>
  );
}
