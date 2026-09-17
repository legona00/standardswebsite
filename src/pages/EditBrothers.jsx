import { useLoaderData } from "react-router-dom";
import EditBrothers from "../components/EditBrothers";

export default function EditBrothersPage() {
    const sanctionsBalances = useLoaderData();

    return <EditBrothers balances={sanctionsBalances} />;
}
