import { json, useRouteLoaderData, Await } from "react-router-dom";
import { Suspense } from "react";

import HomeBanner from "../components/HomeBanner";
import Sanctions from "../components/Sanctions";

export default function HomePage() {
    const sortedSanctionsBalances = useRouteLoaderData("root");

    return (
        <>
            <HomeBanner />
            <Suspense fallback={<p>Loading...</p>}>
                <Await resolve={sortedSanctionsBalances}>
                    {(loadedSanctionsBalances) => (
                        <Sanctions
                            balances={loadedSanctionsBalances}
                            title="Sanctions Leaderboard"
                            rowTitles={["Name", "Balance", "Excuses"]}
                        >
                            {sortedSanctionsBalances.map((item, index) => (
                                <tr key={index}>
                                    <td>Don {item.Name}</td>
                                    <td>${item.Balance}</td>
                                    <td>{item.Excuses}</td>
                                </tr>
                            ))}
                        </Sanctions>
                    )}
                </Await>
            </Suspense>
        </>
    );
}

export async function loader() {
    // Get the current VP of standards information
    // (Balance, Excuses, Name, email, venmoTag, cashappTag Balance, isVP, )
    const res = await fetch(
        "https://1ydhatqodd.execute-api.us-east-2.amazonaws.com/vpstandards"
    );

    if (!res.ok) {
        throw json(
            {
                message: "Could not get VP data",
            },
            { status: 500 }
        );
    } else {
        const b = await res.json();
        return b[0];
    }
}
