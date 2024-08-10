import { json, useLoaderData, Await } from "react-router-dom";
import { Suspense } from "react";

import HomeBanner from "../components/HomeBanner";
import Sanctions from "../components/Sanctions";

export default function HomePage() {
    const sanctionsBalances = useLoaderData();

    return (
        <>
            <HomeBanner />
            <Suspense fallback={<p>Loading...</p>}>
                <Await resolve={sanctionsBalances}>
                    {loadedSanctionsBalances => (
                        <Sanctions balances={loadedSanctionsBalances} />
                    )}
                </Await>
            </Suspense>
        </>
    );
}

//Load data for Contact information for HomeBanner and for Sanctions table
export async function loader({ request, params }) {
    const response = await fetch(
        "https://1ydhatqodd.execute-api.us-east-2.amazonaws.com/items"
    );

    if (!response.ok) {
        throw json(
            {
                message: "Could not sanction balances",
            },
            { status: 500 }
        );
    } else {
        const resData = await response.json();
        return resData;
    }
}
