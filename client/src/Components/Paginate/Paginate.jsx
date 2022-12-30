import React from "react";
import s from "./Paginate.module.css";

export default function Paginado({ gamesPage, allGames, paginado }) {
  const pageNumbers = [];

  for (var i = 1; i <= Math.ceil(allGames / gamesPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={s.pag4}>
      {pageNumbers &&
        pageNumbers.map((number, i) => (
          <ul className={s.ull} key={i}>
            <button className={s.pag3} onClick={() => paginado(number)}>
              {number}
            </button>
          </ul>
        ))}
    </div>
  );
}
