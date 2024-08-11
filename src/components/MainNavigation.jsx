import { NavLink } from "react-router-dom";

import classes from "./MainNavigation.module.css";
import tamuLogo from "../assets/tamu-logo.png";

export default function MainNavigation() {
    return (
        <header className={classes.header}>
            <img src={tamuLogo} alt="Texas A&M Logo" />
            <nav>
                <ul className={classes.list}>
                    <li>
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                isActive ? classes.active : undefined
                            }
                            end
                        >
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/login"
                            className={({ isActive }) =>
                                isActive ? classes.active : undefined
                            }
                        >
                            Login
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
