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
    if(name.length > 1) {
      dispatch(getNameVideoGames(name))
      setName('')
    }else
    alert('No se encontró El nombre buscado')
  }

  return (
    <div>
      <form onSubmit={(p) => handleSubmit(p)}>
        <input
          className="search"
          type='text'
           id="rating"
            autoComplete="off"
            value={name}
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
