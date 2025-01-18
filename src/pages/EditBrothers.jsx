import { Await, useRouteLoaderData } from "react-router-dom";
import { Suspense } from "react";
import EditBrothers from "../components/EditBrothers";

export default function EditBrothersPage() {
    const sanctionsBalances = useRouteLoaderData("root");

    return (
        <>
            <Suspense fallback={<p>Loading...</p>}>
                <Await resolve={sanctionsBalances}>
                    {(loadedSanctionsBalances) => (
                        <EditBrothers balances={loadedSanctionsBalances} />
                    )}
                </Await>
            </Suspense>
        </>
    );
}
