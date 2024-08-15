import classes from "./Sanctions.module.css";

import { sortStandards } from "../util/standards";

export default function Sanctions({ title, children }) {
    return (
        <div className={classes.sanctionleaderboard}>
            <h1>{title}</h1>
            <div className={classes.sanctionstablecontainer}>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Balance</th>
                        </tr>
                    </thead>
                    <tbody>{children}</tbody>
                </table>
            </div>
        </div>
    );
}
