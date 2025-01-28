import { Form } from "react-router-dom";
import Sanctions from "./Sanctions";
import EditBrothersRow from "./EditBrothersRow";
import { getToken } from "../util/auth";
import NewBrotherForm from "./NewBrotherForm";
import { useState } from "react";

export default function EditBrothers({ balances }) {
    const token = getToken();

    const [newDonData, setNewDonData] = useState({ name: "", email: "" });

    function updateNewDonData(name, value) {
        setNewDonData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    async function deleteRow(index) {
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

        window.location.reload();
    }

    async function addBrother() {
        // Validate data before sending request
        if (newDonData.name === "" || newDonData.email === "") {
            window.alert("Please fill out all fields to add a new brother.");
        }

        const response = await fetch(
            "https://1ydhatqodd.execute-api.us-east-2.amazonaws.com/newbrother",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
                body: JSON.stringify(newDonData),
            }
        );

        if (!response.ok) {
            throw new Error("Could not add brother");
        }

        window.alert(await response.json());
        window.location.reload();
    }

    return (
        <>
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
            <NewBrotherForm
                newDonData={newDonData}
                updateData={updateNewDonData}
            >
                <button onClick={addBrother}>SUBMIT</button>
            </NewBrotherForm>
        </>
    );
}
