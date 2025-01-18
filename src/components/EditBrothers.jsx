import { Form } from "react-router-dom";
import Sanctions from "./Sanctions";
import EditBrothersRow from "./EditBrothersRow";
import { getToken } from "../util/auth";

export default function EditBrothers({ balances }) {
    const token = getToken();

    async function deleteRow(index) {
        console.log(balances[index]);
        const response = await fetch(
            `https://1ydhatqodd.execute-api.us-east-2.amazonaws.com/items/${balances[index].Name}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
                body: JSON.stringify({ index }),
            }
        );

        if (!response.ok) {
            throw new Error("Could not delete row");
        }

        console.log(await response.json());
        window.location.reload();
    }

    return (
        <Sanctions
            title="Edit Brothers"
            rowTitles={["Name", "Excuses", "Balance", "Email"]}
        >
            {balances.map((item, index) => (
                <EditBrothersRow
                    key={item.Name}
                    name={item.Name}
                    excuses={item.Excuses}
                    balance={item.Balance}
                    email={item.email}
                    index={index}
                    deleteRow={deleteRow}
                />
            ))}
        </Sanctions>
    );
}
