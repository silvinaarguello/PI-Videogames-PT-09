import React from "react";
 import s from "./Home/Home.module.css";

export default function Loading() {
    return (
        <div className={s.gif}>
        <img
          src="https://phoneky.co.uk/thumbs/screensavers/down/games/pacman_o349lxiw.gif"
          alt="Loading"
        />

        <h1 className={s.b}>Loading...</h1>
      </div>
    );
  }