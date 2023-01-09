import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postVideoGames, getGenres, getPlataforms } from "../../Redux/actions";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import "./CreateGameStyle.css";

export default function Form() {
  const myHistory = useHistory();
  const dispatch = useDispatch();
  const [newGame, setNewGame] = useState({ genre: [], plataform: [] });
  const [errores, setErrores] = useState({ genre: [], plataform: [] });
  const allGenres = useSelector((state) => state.genres);
  const allPlataforms = useSelector((state) => state.plataform);
  const genres = allGenres.map((e) => e.name);
  useEffect(() => {
    dispatch(getGenres());
    dispatch(getPlataforms());
  }, [dispatch]);

  const plataforms = allPlataforms?.map((e) => e.plataform);
  const plataformsFiltered = [].concat.apply([], plataforms);
  const repeatedPlataforms = {};
  for (let i = 0; i < plataformsFiltered?.length; i++) {
    repeatedPlataforms[plataformsFiltered[i]]
      ? (repeatedPlataforms[plataformsFiltered[i]] += 1)
      : (repeatedPlataforms[plataformsFiltered[i]] = 1);
  }
  const finalPlataforms = Object.keys(repeatedPlataforms);

  // console.log("soy genresssss", genres)
  // console.log("plataformasdas", finalPlataforms)
  // console.log(newGame)

  function validate(newGame) {
    const errors = {};

    if (!newGame.name) {
      errors.name = "Missing add the name";
    }

    if (!newGame.release_date) {
      errors.release_date = "Missing add game release date";
    } else if (
      !/^\d{4}([-/.])(0?[1-9]|1[1-2])\1(3[01]|[12][0-9]|0?[1-9])$/.test(
        newGame.release_date
      )
    ) {
      errors.release_date = "You must enter a valid format";
    }

    if (!newGame.rating) {
      errors.rating = " Enter the rating of the game ";
    } else if (!/^[0-5]([.][0-9]{1,2})?/.test(Number(newGame.rating))) {
      errors.rating = "The rating must be between 1 and 5";
    }

    if (!newGame.description) {
      errors.description = "Missing add description";
    }

    if (!newGame.image) {
      errors.image = "Missing add the URL of the image";
    } else if (!/^https?:\/\/[\w-]+(\.[\w-]+)+[/#?]?.*$/.test(newGame.image)) {
      errors.image = " You must enter a valid url";
    }

    if (!newGame.genre || newGame.genre.length === 0) {
      errors.genre = "Need to add genres";
    }

    if(newGame.plataform===""){
      errors.plataform = "Need to add platforms"
    }

    return errors;
  }

  function captureValue(e) {
    // console.log(e.target.value)

    if (e.target.name === "plataform") {
      newGame["plataform"].push(e.target.value);
    } else if (e.target.name === "genre") {
      newGame["genre"].push(e.target.value);
    } else {
      setNewGame({
        ...newGame,
        [e.target.name]: e.target.value,
      });
    }

    setErrores(
      validate({
        ...newGame,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(postVideoGames(newGame));
    alert("VideoGame created!!");
    myHistory.push("/home");
  }

  return (
    <div className="main">
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="main-content">
          <Link to="/home">
            <button className="selectfont3">GO HOME</button>
          </Link>
          <h3 className="name2">CREATE NEW VIDEOGAME</h3>
          <br></br>

          <div>
            <label>Name </label>
            {errores.name && <p className="alert">{errores.name}</p>}
            <br></br>
            <input
              className="name"
              type="text"
              name="name"
              placeholder="..."
              onChange={(e) => captureValue(e)}
            />
          </div>

          <div>
            <label>Release </label>
            {errores.release_date && (
              <p className="alert">{errores.release_date}</p>
            )}
            <br></br>
            <input
              className="name"
              type="date"
              name="release_date"
              onChange={(e) => captureValue(e)}
            />
          </div>

          <div>
            <label>Rating </label>
            {errores.rating && <p className="alert">{errores.rating}</p>}
            <br></br>
            <input
              className="name"
              type="text"
              name="rating"
              placeholder="1-5"
              onChange={(e) => captureValue(e)}
            />
          </div>

          <div>
            <label>Image url </label>
            <br></br>
            <input
              className="name"
              type="url"
              name="image"
              placeholder="URL"
              onChange={(e) => captureValue(e)}
            />
            {errores.image && <p className="alert">{errores.image}</p>}
            <br></br>
          </div>

          <div>
            <label className="name2">GENRES </label>
            {genres.map((g) => {
              return (
                
                  <div className="in" key={g}>
                    <input
                      className="input"
                      value={g}
                      type="checkbox"
                      name="genre"
                      onChange={(e) => captureValue(e)}
                    />
                    <label>{g}</label>
                  </div>
                
              );
            })}
            {errores.genre && <p className="alert2">{errores.genre}</p>}
          </div>

          <div>
            <label className="name2">PLATFORMS </label>

            {finalPlataforms.map((p) => {
              return (
                
                  <div className="in" key={p}>
                    <input
                      className="input"
                      value={p}
                      type="checkbox"
                      name="plataform"
                    
                      onChange={(e) => captureValue(e)}
                    />
                    <label>{p}</label>
                  </div>
                
              );
            })}
            {errores.plataform && <p className="alert2">{errores.plataform}</p>}
          </div>
          <div>
            

            <label className="name2">Description: </label>
            <div>
              <textarea
                className="comment"
                type="text"
                name="description"
                placeholder="Type a description of your game"
                cols="40"
                rows="6"
                onChange={(e) => captureValue(e)}
              />
              {errores.description && (
                <p className="alert">{errores.description}</p>
              )}
            </div>
          </div>

          {!errores.name &&
          !errores.plataform &&
          !errores.release_date &&
          !errores.genre &&
          !errores.rating &&
          !errores.description &&
          !errores.image ? (
            <button className="submit" type="submit">
              Create Game
            </button>
          ) : (
            <p className="alert">
              {" "}
              Check the errors <br /> Before create VideoGame
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
