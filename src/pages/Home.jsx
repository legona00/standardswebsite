import { json, useRouteLoaderData, Await } from "react-router-dom";
import { Suspense } from "react";

import HomeBanner from "../components/HomeBanner";
import Sanctions from "../components/Sanctions";
import { sortStandards } from "../util/standards";

export default function HomePage() {
    const sortedSanctionsBalances = useRouteLoaderData("root");

    return (
        <>
            <HomeBanner />
            <Suspense fallback={<p>Loading...</p>}>
                <Await resolve={sortedSanctionsBalances}>
                    {loadedSanctionsBalances => (
                        <Sanctions
                            balances={loadedSanctionsBalances}
                            title="Sanctions Leaderboard"
                            rowTitles={["Name", "Balance"]}
                        >
                            {sortedSanctionsBalances.map((item, index) => (
                                <tr key={index}>
                                    <td>Don {item.Name}</td>
                                    <td>${item.Balance}</td>
                                </tr>
                            ))}
                        </Sanctions>
                    )}
                </Await>
            </Suspense>
        </>
    );
}

//Load data for Contact information for HomeBanner and for Sanctions table
export async function loader() {
    const response = await fetch(
        "https://1ydhatqodd.execute-api.us-east-2.amazonaws.com/items"
    );

    if (!response.ok) {
        throw json(
            {
                message: "Could not get sanction balances",
            },
            { status: 500 }
        );
    } else {
        const resData = await response.json();
        const sortedData = sortStandards(resData);
        return sortedData;
    }
}
