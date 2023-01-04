import React from "react";
import s from "./Paginate.module.css";

export default function Paginado({ gamesPage, allGames, paginado }) {
  const pageNumbers = [];

  for (var i = 1; i <= Math.ceil(allGames / gamesPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className={s.nav_container}>
       <ul className={s.ul_container}>
      {pageNumbers &&
        pageNumbers.map((number, i) => (
          <li className={s.li_container} key={i}>
            <button  onClick={() => paginado(number)}>
              {number}
            </button>
          </li>
        ))}
        </ul>
    </nav>
  );
}
