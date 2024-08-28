import classes from "./Sanctions.module.css";

import { sortStandards } from "../util/standards";

//otherTitles allows to add other columns and provide a title for them, will be passed as an array
export default function Sanctions({ title, children, rowTitles }) {
    return (
        <div className={classes.sanctionleaderboard}>
            <h1>{title}</h1>
            <div className={classes.sanctionstablecontainer}>
                <table>
                    <thead>
                        <tr>
                            {rowTitles &&
                                rowTitles.map(title => (
                                    <th key={title}>{title}</th>
                                ))}
                        </tr>
                    </thead>
                    <tbody>{children}</tbody>
                </table>
            </div>
        </div>
    );
}
