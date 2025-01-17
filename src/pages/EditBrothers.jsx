import { Await, useRouteLoaderData } from "react-router-dom";
import { Suspense } from "react";

export default function EditBrothersPage() {
    const sanctionsBalances = useRouteLoaderData("root");

    return (
        <>
            <Suspense fallback={<p>Loading...</p>}>
                <Await resolve={sanctionsBalances}></Await>
            </Suspense>
        </>
    );
}
