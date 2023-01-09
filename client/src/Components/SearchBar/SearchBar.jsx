import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameVideoGames } from "../../Redux/actions";
import "./SearchBarStyle.css";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handInputChange(p) {
    p.preventDefault();
    setName(p.target.value);
    //console.log(name)
  }
  function handleSubmit(p) {
    p.preventDefault();
    dispatch(getNameVideoGames(name));
  }

  return (
    <div>
      <form onSubmit={(p) => handleSubmit(p)}>
        <input
          className="search"
          type="text"
          placeholder="Search game..."
          onChange={(p) => handInputChange(p)}
        />

        <button type="submit" className="btnSearch">
          Search
        </button>
      </form>
    </div>
  )
}
