import { redirect, json } from "react-router-dom";
import { getToken } from "../util/auth";

export async function action({ request }) {
    //Check for PUT
    const method = request.method;
    const data = await request.formData();
    const token = getToken();

    let successString = [];

    if (method === "PUT") {
        const rows = data.get("rowsState");
        const rowsData = JSON.parse(rows);
        //Iterate through changed values to calculate new balance and send request to API
        for (const row of rowsData) {
            const { name, operation, amount } = row;
            let newBalance;

            const balance = parseInt(row.balance);

            if (operation === "add") {
                newBalance = balance + amount;
            } else if (operation === "sub") {
                newBalance = balance - amount;
            }

            if (newBalance < 0) {
                throw json(
                    { message: "Updated balance is < 0" },
                    { status: 400 }
                );
            } else if (newBalance === 0) {
                newBalance = "0";
            }

            //Prepare request
            const response = await fetch(
                "https://1ydhatqodd.execute-api.us-east-2.amazonaws.com/items",
                {
                    method: method,
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": token,
                    },
                    body: JSON.stringify({ Name: name, Balance: newBalance }),
                }
            );

            if (!response.ok) {
                throw json(
                    {
                        message: `Could not update balance for Don ${name}`,
                    },
                    { status: 500 }
                );
            }

            //Add to success string
            successString = [
                ...successString,
                `Updated balance of Don ${name} to ${newBalance}\n`,
            ];
        }

        //All request were done successfully
        console.log(successString);
        window.confirm(successString);
        window.location.reload();
    }

    return redirect("/edit");
}
