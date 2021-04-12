import React from "react";
import gameConfigurations from "./games/index";
import Home from "./home/home";
import Pay from "./pay/pay";
import { HomeOutlined, PayCircleOutlined, AimOutlined } from "@ant-design/icons";

export const navigations: Navigation[] = [
    {
        key: "home",
        title: "Home",
        icon: <HomeOutlined className="nav-icon" />,
        to: "/Home",
        component: (props: any) => <Home {...props}></Home>
    },
    {
        key: "games",
        title: "Games",
        icon: <AimOutlined className="nav-icon" />,
        items: gameConfigurations.map(c => {
            return {
                key: c.name,
                title: c.title,
                to: "/Games/" + c.name,
                component: (props: any) => c.component(props)
            }
        }),
    },
    {
        key: "pay",
        title: "Pay",
        icon: <PayCircleOutlined className="nav-icon" />,
        to: "/Pay",
        component: (props: any) => <Pay {...props}></Pay>
    }
];

export interface Navigation {
    key: string;
    title: string;
    to?: string;
    icon?: JSX.Element;
    items?: Navigation[];
    component?: (props: any) => JSX.Element;
}