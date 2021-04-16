import React from "react";
import Header from "./shell/header";
import NavigationMenu from "./shell/navigation-menu";
import Main from "./shell/main";
import { EventContext, eventAggregator } from "./context";
import { BrowserRouter as Router } from "react-router-dom";

import "./../content/styles/common.css"
import "./app.css";

const App = (): JSX.Element => {
    return (
        <EventContext.Provider value={eventAggregator}>
            <Router>
                <div className="react-games">
                    <Header></Header>
                    <div className="react-games-center">
                        <NavigationMenu></NavigationMenu>
                        <Main></Main>
                    </div>
                </div>
            </Router>
        </EventContext.Provider>
    );
};

export default App;