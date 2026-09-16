import { Outlet, json } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";
import {
    getExpiration,
    getToken,
    getTokenDuration,
    loginExpired,
} from "../util/auth";
import { useEffect } from "react";

import { sortStandards } from "../util/standards";

export default function RootLayout() {
    const token = getToken();

    useEffect(() => {
        if (!token) {
            return;
        }

        if (token === "EXPIRED") {
            loginExpired();
        }

        const tokenDuration = getTokenDuration();

        setTimeout(() => {
            loginExpired();
        }, tokenDuration);
    }, [token]);

    return (
        <>
            <MainNavigation />
            <main>
                <Outlet />
            </main>
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
