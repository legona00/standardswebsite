import { Await, useRouteLoaderData } from "react-router-dom";
import { Suspense } from "react";

import EditSanctions from "../components/EditSanctions";

export default function EditPage() {
    const sanctionsBalances = useRouteLoaderData("root");

    return (
        <>
            <Suspense fallback={<p>Loading...</p>}>
                <Await resolve={sanctionsBalances}>
                    {loadedSanctionsBalances => (
                        <EditSanctions balances={loadedSanctionsBalances} />
                    )}
                </Await>
            </Suspense>
        </>
    );
}
