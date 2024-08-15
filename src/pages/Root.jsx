import { Outlet, useLoaderData } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";
import {
    getExpiration,
    getToken,
    getTokenDuration,
    loginExpired,
} from "../util/auth";
import { useEffect } from "react";

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
