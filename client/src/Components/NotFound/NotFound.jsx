import React from "react";
import image from "../../Multimedia/error-404.gif";
import "../NotFound/NotFound.css";




export default function NotFound() {

    return (
        <div>
            <div>
                <img className="notFound" src={image} alt='' />

            </div>
        </div>
    )
}