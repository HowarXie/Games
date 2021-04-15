import React, { Fragment, Key, useEffect, useContext, useState } from "react";
import { Menu } from "antd";
import { Link, useHistory } from "react-router-dom";
import { Navigation, navigations } from "../index";
import { EventContext } from "../context";
import { UpdateNavMenuEvent } from "../../status-manager/events";

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

const NavigationMenu = (): JSX.Element => {
    const history = useHistory();
    const eventAggregator = useContext(EventContext);

    const [curKey, openedKeys] = findKeys(navigations, history.location.pathname);
    const [selectedKey, setSelectedKey] = useState(curKey || navigations[0].key);

    useEffect(() => {
        return eventAggregator.subsribe(new UpdateNavMenuEvent(), updateUrl)
    });

    const updateUrl = (path: string) => {
        history.push(path);
        const [curKey] = findKeys(navigations, path);
        setSelectedKey(curKey);
    };

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
                            onClick={() => { updateUrl(nav.to ?? "#") }}
                            onItemHover={() => { }}
                            icon={nav.icon}
                        >
                            <Link to={nav.to ?? "#"} onClick={(e) => { e.preventDefault(); }}>{nav.title}</Link>
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

