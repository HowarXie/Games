import React from "react"
import gameConfigurations from "../games/index";
import ImageCard from "./../../components/image-card"

import "./home.css";

const Home = (props: { redirect: (path: string) => void }): JSX.Element => {
    return (
        <div className="react-game-home">
            {
                gameConfigurations.map((config, index) => {
                    return (
                        <ImageCard
                            key={index}
                            clickHanlder={props.redirect}
                            path={"/Games/" + config.name}
                            imagePath={config.imagePath}
                            title={config.title}
                            description={config.discription}
                        ></ImageCard>
                    );
                })
            }
        </div>
    );
};

export default Home;