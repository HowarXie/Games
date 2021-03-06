import React from "react";
import { Route, useLocation } from "react-router-dom";
import { navigations, Navigation } from "../index";
import Home from "../home/home";

import "./main.css";

function getValidNavs(navs: Navigation[]): Navigation[] {
    let validNavs: Navigation[] = [];

    for (let nav of navs) {
        if (nav.to) {
            validNavs.push(nav);
        }

        if (nav.items) {
            validNavs = validNavs.concat(getValidNavs(nav.items));
        }
    }

    return validNavs;
}

const Main = (): JSX.Element => {
    const location = useLocation();
    const validNavigations = getValidNavs(navigations);

    return (
        <main className="react-games-main">
            <h2 className="react-games-main-title">{location.pathname.slice(1) || "home"}</h2>
            <div className="react-games-main-content">
                {
                    validNavigations.map(nav => {
                        return (
                            <Route exact path={nav.to} render={() => nav.component && nav.component()} key={nav.key}></Route>
                        );
                    })
                }
                <Route exact path="/" component={Home}></Route>
            </div>
        </main>
    );
}

export default Main;