import { redirect, json } from "react-router-dom";
import { getToken } from "../util/auth";

export async function action({ request }) {
    //Check for PUT
    const method = request.method;
    const data = await request.formData();
    const email = data.get("emailChecked");
    const amount = parseInt(data.get("amount"));
    const operation = data.get("operation");
    const token = getToken();

    let successString = [];

    if (method === "PUT") {
        const rows = data.get("rowsState");
        const rowsData = JSON.parse(rows);
        //Iterate through changed values to calculate new balance and send request to API
        for (const row of rowsData) {
            const { name, balance } = row;

            let newBalance;

            const balanceInt = parseInt(balance);

            if (operation == "add") {
                newBalance = balanceInt + amount;
            } else if (operation == "sub") {
                newBalance = balanceInt - amount;
            }

            if (newBalance < 0) {
                throw json(
                    {
                        message: `Updated balance for Don ${name} is less than 0. Please enter a new value`,
                    },
                    { status: 500 }
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

            //TODO Now send email if the operation is add and the email is checked
            if (operation === "add" && email) {
                const subject = "Sanction Statement";
                const emailBody = `Saludos Don ${name}\n\n You have`;
            }
        }

        //All request were done successfully
        window.confirm(successString);
        window.location.reload();
    }

    return redirect("/edit");
}
