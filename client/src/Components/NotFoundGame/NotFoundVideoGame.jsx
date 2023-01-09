import React from "react";
 import image from "../../Multimedia/notFound.gif"
import "./NotFoundVg.css";



export default function NotFound() {

    return (
        <div>
            <div>
                <img className="image" src={image} alt='' />
                <h1 className="h1"> GENRE NOT FOUND </h1>

            </div>
        </div>
    )
}