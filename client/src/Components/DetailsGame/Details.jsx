import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useEffect } from "react";
import { getDetails, deleteGame } from "../../Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import s from"./Details.module.css";

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
    <div className={s.m}>
      {info ? (
        <div className={s.nq}>
          <div>
            
            <Link to={"/home"}>
              <button className={s.buttton}>Back Home</button>
              
            </Link>
          </div>

          <div>
            <Link to="/home">
            <button className={s.buttton2} onClick={deleteG} >Delete Game </button>
            </Link>
          </div>
      

          <h1 className={s.detailName2}> Name: {info.name}</h1>

          <img className={s.im2} src={info.image} alt="img not found" />

          <h2> Rating: {info.rating}</h2>

          <h2>Released: {info.release_date} </h2>

          <p className={s.plt}>
            {" "}
            Platforms:{" "}
            {info.plataform?.map((g, i) => {
              return (
                <span className={s.span2} key={i}>
                  {g?.platform?.name ?? g}{" "}
                </span>
              );
            })}
          </p>

          <p className={s.genr}>
            Genres :{" "}
            {info.genre?.map((ge, i) => {
              // console.log(ge)
              return (
                <span className={s.genr} key={i}>
                  {" "}
                  {ge.name ?? ge}{" "}
                </span>
              );
            })}
          </p>

          <h2 className={s.descr}> Description: {info.description} </h2>
        </div>
      ) : <div></div>
      }
    </div>
  );
}
