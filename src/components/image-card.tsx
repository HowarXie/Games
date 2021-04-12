import React from "react";
import { Link } from "react-router-dom";

import "./image-card.css";

const ImageCard = (props: ImageCardProps): JSX.Element => {
    return (
        <div className="image-card card">
            <Link
                to={props.path}
                onClick={(e) => { e.preventDefault(); props.clickHanlder(props.path); }}
            >
                <div className="image-card-picture" >
                    <img src={props.imagePath} alt={props.title}></img>
                </div>
                <dl className="image-card-message">
                    <dt className="image-card-title">{props.title}</dt>
                    <dd>{props.description}</dd>
                </dl>
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