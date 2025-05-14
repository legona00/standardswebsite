import { Await, useRouteLoaderData } from "react-router-dom";
import { Suspense } from "react";
import EditVP from "../components/EditVP";

export default function EditVPPage() {
    const sanctionsBalances = useRouteLoaderData("root");

    return (
        <>
            <Suspense fallback={<p>Loading...</p>}>
                <Await resolve={sanctionsBalances}>
                    {(loadedSanctionsBalances) => (
                        <EditVP balances={loadedSanctionsBalances} />
                    )}
                </Await>
            </Suspense>
        </>
    );
}
