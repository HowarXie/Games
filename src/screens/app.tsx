import React from "react";
import Header from "./header";
import NavigationMenu from "./navigation-menu";
import { useHistory } from "react-router-dom";
import Main from "./main";

import "./../content/styles/common.css"
import "./app.css";

const App = (): JSX.Element => {
    const history = useHistory();

    const redirect = (path: string) => {
        history.push(path);
    };

    return (
        <div className="react-games">
            <Header></Header>
            <div className="react-games-center">
                <NavigationMenu redirect={redirect}></NavigationMenu>
                <Main redirect={redirect}></Main>
            </div>
        </div>
    );
};

export default App;