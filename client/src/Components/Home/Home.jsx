import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getVideoGames,
  getGenres,
  filterVideogamesByGenre,
  filterCreated,
  orderByName,
  getPlataforms,
  orderByRating,
} from "../../Redux/actions";
import   "./HomeStyle.css";
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import SearchBar from "../SearchBar/SearchBar";
import Paginado from "../Paginado/Paginado";
import NotFoundVideoGame from "../NotFoundGame/NotFoundVideoGame";
import Loading from "../Loading";

export default function Home() {
  const dispatch = useDispatch();
  const allGames = useSelector((state) => state.videogames);
  const [order, setOrder] = useState(""); // es un estado local q arranca vacio para el Asc y Desc Order

  const [currentPage, setCurrentPage] = useState(1);
  const [gamesPage, setGamesPage] = useState(15);
  const indexOfLastGame = currentPage * gamesPage;
  const indexOfFirstGame = indexOfLastGame - gamesPage;
  const [loading, setLoading] = useState(true);

  // currentGames devuelve un arreglo q entra del 1 al 15
  // creo una constante de los Games en la pagina actual y me traigo el array del estado de los Games
  const currentGames = allGames?.slice(indexOfFirstGame, indexOfLastGame);
  const genres = useSelector((state) => state.genres); //estado global de Generos

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if(allGames.length > 0 && loading){
    setLoading(false);
}

  // ** TRAIGO DEL ESTADO LOS GENEROS CUANDO EL COMPONENTE SE MONTA
  useEffect(() => {
    dispatch(getVideoGames());
    dispatch(getGenres());
    dispatch(getPlataforms());
  }, [dispatch]);

  // ** PARA RESETEAR AL TOCAR EL BOTON volver a cargar los Juegos
  function handleClick(p) {
    window.location.reload();
  }

  // ** ORDENAMIENTO DE PAGINA ASCENDENTE O DESCENDENTE
  function handleSort(p) {
    p.preventDefault();
    dispatch(orderByName(p.target.value)); //despacho la accion
    setCurrentPage(1);
    setOrder(`Ordenado ${p.target.value}`); //es un estado local vacio, lo uso para modif estado local y renderize
  }

  function handleSortRating(p) {
    p.preventDefault();
    dispatch(orderByRating(p.target.value)); //despacho la accion
    setCurrentPage(1);
    setOrder(`Ordenado ${p.target.value}`); //es un estado local vacio, lo uso para modif estado local y renderize
  }


  function handleFilterGamesByGenre(p) {
    dispatch(filterVideogamesByGenre(p.target.value));
    // console.log(p.target.value)
  }

  
  function handlefilterCreated(p) {
    p.preventDefault();
    dispatch(filterCreated(p.target.value));
  }

  return (
    <div className="a">
      <div className="a">
        <div className="padre"></div>

        <div className="divFiltros">
          <Link to="/">
            <button className="selectfont">GO TO INITIAL PAGE</button>
          </Link>
          <button className="selectfont" onClick={(e) => handleClick(e)}>
            RELOAD GAMES
          </button>

          <Link to="/videogames">
            <button className="selectfont">CREATE NEW GAME</button>
          </Link>
        </div>
        <br />

        <SearchBar />
        <div className="divFiltros">
          
            <br />
            <select
              defaultValue={"DEFAULT"}
              className="selectfont2"
              onChange={(p) => handleSort(p)}
            >
              <option value="DEFAULT" disabled>
                In alphabetical order
              </option>
              <option value="asc"> A-Z</option>
              <option value="desc"> Z-A</option>
            </select>

            <select
              defaultValue={"DEFAULT"}
              className="selectfont2"
              onChange={(p) => handlefilterCreated(p)}
            >
              <option value="DEFAULT" disabled>
                Show Games
              </option>
              <option value="all">All games</option>
              <option value="api">From API</option>
              <option value="created">Created</option>
            </select>

            <select
              defaultValue={"DEFAULT"}
              className="selectfont2"
              onChange={(p) => handleSortRating(p)}
            >
              <option value="DEFAULT" disabled>
                Rating
              </option>
              <option value="rasd">Low Score</option>
              <option value="rdes">High Score</option>
            </select>

            <select
              defaultValue={"sinFiltro"}
              className="selectfont2"
              onChange={(p) => handleFilterGamesByGenre(p)}
            >
              <option value="sinFiltro">Genres</option>
              Genres :{" "}
              {genres?.map((p, i) => {
                return (
                  <option value={p.name} key={i}>
                    {" "}
                    {p.name}{" "}
                  </option>
                );
              })}
            </select>

            <br />
            <br />
            <br />
          
        </div>

        <div className="cc">
          {currentGames?.length > 0 && !loading ? (
            currentGames?.map((e) => {
              return (
                <Card
                  key={e.id}
                  image={e.image}
                  name={e.name}
                  rating={e.rating}
                  genre={e.genre}
                  id={e.id}
                />
              );
            })
          ) : !currentGames.length > 0 && loading ? (
            <Loading/>
          ) :(
            <NotFoundVideoGame/>
          )
          
          
          }
        </div>

        <Paginado
          gamesPage={gamesPage}
          allGames={allGames?.length}
          paginado={paginado}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}
