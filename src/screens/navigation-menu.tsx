import React, { Fragment, Key } from "react";
import { Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import { Navigation, navigations } from "./index";

import "./navigation-menu.css";

const findKeys = (navigations: Navigation[], path: string): [Key, Key[]] => {
    for (let nav of navigations) {
        if (nav?.to === path) {
            return [nav.key, []];
        }

        if (nav.items) {
            const [selectKey, openKeys] = findKeys(nav.items, path);
            if (selectKey) {
                return [selectKey, openKeys.concat(nav.key)];
            }
        }
    }

    return ["", []];
}

const NavigationMenu = (props: { redirect: (path: string) => void }): JSX.Element => {
    const loc = useLocation();

    let [selectedKey, openedKeys] = findKeys(navigations, loc.pathname);
    selectedKey = selectedKey || navigations[0].key;

    const getMenuItems = (navigations: Navigation[]): JSX.Element => {
        return (
            <Fragment>
                {
                    navigations.map(nav => {
                        if (nav.items) {
                            return <Menu.SubMenu key={nav.key} title={nav.title} icon={nav.icon}>
                                {getMenuItems(nav.items)}
                            </Menu.SubMenu>
                        }

                        return <Menu.Item
                            key={nav.key}
                            title={nav.title}
                            onClick={() => { props.redirect(nav.to ?? "#") }}
                            onItemHover={() => { }}
                            icon={nav.icon}
                        >
                            <Link to={nav.to ?? "#"}>{nav.title}</Link>
                        </Menu.Item>;
                    })
                }
            </Fragment>
        )
    };

    return (
        <nav className="react-games-navigation">
            <Menu
                theme="light"
                triggerSubMenuAction="click"
                mode="inline"
                selectedKeys={[selectedKey as string]}
                defaultOpenKeys={openedKeys as string[]}
            >
                {getMenuItems(navigations)}
            </Menu>
        </nav>
    );
};

export default NavigationMenu;
