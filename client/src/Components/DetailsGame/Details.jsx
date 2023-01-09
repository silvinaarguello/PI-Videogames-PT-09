import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useEffect } from "react";
import { getDetails, deleteGame } from "../../Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./Details.css";

export default function Detail(p) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const info = useSelector((state) => state.videoGamesdetails);
  const gameId= useParams();
  const myHistory= useHistory();

  const deleteG = ()=>{
    if(info.hasOwnProperty("createInDb")){
      dispatch(deleteGame(gameId.id))
      alert("Game deleted!")
    
    }else{
      alert("This game cannot be deleted!")
    }
    myHistory.push("/home")
  }
 

  useEffect(() => {
    dispatch(getDetails(id));
  }, [dispatch, id]);

  // console.log(info)

  return (
    <div className="m">
      {info ? (
        <div className="nq">
          <div>
            
            <Link to={"/home"}>
              <button className="buttton">Back Home</button>
              
            </Link>
          </div>

          <div>
            <Link to="/home">
            <button className="buttton2" onClick={deleteG} >Delete Game </button>
            </Link>
          </div>
      

          <h1 className="detailName2"> Name: {info.name}</h1>

          <img className="im2" src={info.image} alt="img not found" />

          <h2> Rating: {info.rating}</h2>

          <h2>Released: {info.release_date} </h2>

          <p className="plt">
            {" "}
            Platforms:{" "}
            {info.plataform?.map((g, i) => {
              return (
                <span className="span2" key={i}>
                  {g?.platform?.name ?? g}{" "}
                </span>
              );
            })}
          </p>

          <p className="genr">
            Genres :{" "}
            {info.genre?.map((ge, i) => {
              // console.log(ge)
              return (
                <span className="genr" key={i}>
                  {" "}
                  {ge.name ?? ge}{" "}
                </span>
              );
            })}
          </p>

          <h2 className="descr"> Description: {info.description} </h2>
        </div>
      ) : <div></div>
      }
    </div>
  );
}
