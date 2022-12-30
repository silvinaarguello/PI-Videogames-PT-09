import React from "react";
import image from "../Multimedia/robot.png"
import s from "./NotFoundVg.module.css";



export default function NotFound() {

    return (
        <div>
            <div>
                <img className={s.image} src={image} alt='' />

            </div>
        </div>
    )
}