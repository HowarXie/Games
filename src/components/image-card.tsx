import React from "react";
import { Link, useHistory } from "react-router-dom";

import "./image-card.css";

const ImageCard = (props: ImageCardProps): JSX.Element => {
    const history = useHistory();

    return (
        <div className="image-card card">
            <Link
                to={props.path}
                onClick={(e) => { e.preventDefault(); props.clickHanlder(props.path); }}
            >
                <div className="image-card-picture" >
                    <img src={props.imagePath} alt={props.title}></img>
                </div>
                <div className="image-card-message">
                    <h2 className="image-card-title">{props.title}</h2>
                    <p>{props.description}</p>
                </div>
            </Link>
        </div>
    );
}

export default ImageCard;

interface ImageCardProps {
    path: string;
    imagePath: string;
    title: string;
    description?: string;
    clickHanlder: (path: string) => void
}