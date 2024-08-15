import { Outlet, useLoaderData } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";

export default function RootLayout() {
    const token = useLoaderData();

    return (
        <>
            <MainNavigation />
            <main>
                <Outlet />
            </main>
        </>
    );
}
