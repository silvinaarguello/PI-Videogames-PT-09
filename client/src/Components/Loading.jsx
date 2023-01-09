import React from "react";
import "./Home/HomeStyle.css";

export default function Loading() {
    return (
        <div className="gif">
        <img
          src="https://www.olympicvideogames.com/sonic/assets/img/loading.gif"
          alt="Loading"
        />

        <h1 className="b">Loading...</h1>
      </div>
    );
  }