import React, { useState } from "react"
import { NavLink } from "react-router-dom"
import styles from "./SideMenu.module.css"
import grid from "../assets/grid.svg"

const menuItems = [
    { text: "Dashboard", icon: grid },
    // { text: "Category", icon: alignjustify },
]
export default function SideNavBar() {
    const [showing, setShowing] = useState(false)
    return (
        <div
            className={
                showing
                    ? `${styles["side-nav-container"]}`
                    : `${styles["side-nav-container"]} ${styles["side-nav-container-NS"]}`
            }
        >
            <div className={styles["nav-upper"]}>
                <div className={styles["nav-heading"]}>
                    <button
                        className={
                            showing
                                ? `${styles["stack"]} ${styles["in"]}`
                                : `${styles["stack"]} ${styles["out"]}`
                        }
                        onClick={() => {
                            setShowing(!showing)
                        }}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
                <div className={styles["nav-menu"]}></div>
                {menuItems.map(({ text, icon }) => (
                    <NavLink
                        key={text}
                        to="/"
                        className={
                            showing
                                ? styles["menu-item"]
                                : `${styles["menu-item"]} ${styles["menu-item-NS"]}`
                        }
                    >
                        <img src={icon} alt="DBicon" />
                        {showing && <p>{text}</p>}
                        {!showing && (
                            <div className={styles["tooltip"]}>{text}</div>
                        )}
                    </NavLink>
                ))}
            </div>
        </div>
    )
}
