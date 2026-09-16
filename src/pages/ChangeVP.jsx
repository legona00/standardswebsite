import { useLoaderData, Form, json, redirect } from "react-router-dom";
import { useState } from "react";
import { getToken } from "../util/auth";
import InputMask from "react-input-mask";

import classes from "./ChangeVP.module.css";

export default function ChangeVP() {
    const data = useLoaderData();
    const name = data.Name;
    const phoneNumInit = data.phoneNumber || "";
    const venmoInit = data.venmoTag || "";
    const cashappInit = data.cashappTag || "";

    const [phoneNumber, setPhoneNumber] = useState(phoneNumInit);
    const [venmo, setVenmo] = useState(venmoInit);
    const [cashApp, setCashApp] = useState(cashappInit);

    return (
        <Form method="PATCH">
            <h1>Change VP of Standards</h1>
            <h2>Don {name}</h2>
            <div className={classes.container}>
                <div>
                    <h3>Phone Number</h3>
                    <InputMask
                        mask="(999) 999-9999"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    >
                        {(inputProps) => (
                            <input
                                className={classes.inputbox}
                                required
                                type="tel"
                                name="phoneNumber"
                                pattern="\(\d{3}\)\s\d{3}-\d{4}"
                                title="Enter full phone as (123) 456-7890"
                                {...inputProps}
                                defaultValue={phoneNumInit}
                            />
                        )}
                    </InputMask>
                </div>
                <div>
                    <h3>Venmo</h3>
                    <strong>@</strong>
                    <input
                        className={classes.inputbox}
                        type="text"
                        name="venmoTag"
                        defaultValue={venmo}
                    />
                </div>
                <div>
                    <h3>CashApp</h3>
                    <strong>$</strong>
                    <input
                        className={classes.inputbox}
                        type="text"
                        name="cashAppTag"
                        defaultValue={cashApp}
                    />
                </div>
            </div>
            <button type="submit" className={classes.submitBtn}>
                Submit Changes
            </button>
        </Form>
    );
}

export async function loader({ params }) {
    const name = params.Name;

    const response = await fetch(
        `https://1ydhatqodd.execute-api.us-east-2.amazonaws.com/items/${name}`
    );

    const data = await response.json();

    return data;
}

export async function action({ request, params }) {
    const name = params.Name;

    const formData = await request.formData();
    const phoneNumber = formData.get("phoneNumber"); // string or null
    const cashAppTag = formData.get("cashAppTag");
    const venmoTag = formData.get("venmoTag");

    console.log(phoneNumber, cashAppTag, venmoTag);

    const res = await fetch(
        "https://1ydhatqodd.execute-api.us-east-2.amazonaws.com/vpstandards",
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: getToken(),
            },
            body: JSON.stringify({
                Name: name,
                phoneNumber: phoneNumber,
                cashappTag: cashAppTag,
                venmoTag: venmoTag,
            }),
        }
    );

    if (!res.ok) {
        throw json(
            {
                message: "Could not update VP of Standards",
            },
            { status: 500 }
        );
    }

    const data = await res.json();
    console.log(data);

    return redirect("/");
}
