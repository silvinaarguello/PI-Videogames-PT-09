import React from "react";
 import s from "./Home/Home.module.css";

export default function Loading() {
    return (
        <div className={s.gif}>
        <img
          src="https://www.olympicvideogames.com/sonic/assets/img/loading.gif"
          alt="Loading"
        />

        <h1 className={s.b}>Loading...</h1>
      </div>
    );
  }