import React from "react";
import image from "../Multimedia/error-404.jpg";
import s from"./NotFound.module.css";



export default function NotFound() {

    return (
        <div>
            <div>
                <img className={s.notFound} src={image} alt='' />

            </div>
        </div>
    )
}