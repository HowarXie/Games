import React, { useContext } from "react"
import gameConfigurations from "../games/index";
import ImageCard from "./../../components/image-card"
import { EventContext } from "../context";
import { UpdateNavMenuEvent } from "../../status-manager/events";

import "./home.css";

const Home = (): JSX.Element => {
    const eventAggregator = useContext(EventContext);

    const clickHandler = (path: string) => {
        eventAggregator.publish(new UpdateNavMenuEvent(), path);
    }

    return (
        <div className="react-game-home">
            {
                gameConfigurations.map((config, index) => {
                    return (
                        <ImageCard
                            key={index}
                            clickHandler={clickHandler}
                            path={config.to}
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