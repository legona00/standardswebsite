import React, { useEffect, useState } from "react";

import classes from "./Sanctions.module.css";

import { sortStandards } from "../util/standards";

export default function Sanctions({ balances }) {
    const sortedData = sortStandards(balances);

    return (
        <div className={classes.sanctionleaderboard}>
            <h1>Sanctions Leaderboard</h1>
            <div className={classes.sanctionstablecontainer}>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Balance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedData.map((item, index) => (
                            <tr key={index}>
                                <td>Don {item.Name}</td>
                                <td>{item.Balance}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
