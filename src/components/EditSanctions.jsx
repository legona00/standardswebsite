import { useState, useRef, useEffect } from "react";
import {
    Form,
    json,
    redirect,
    useActionData,
    useSubmit,
} from "react-router-dom";

import TableEditRow from "./TableEditRow";

import classes from "./EditSanctions.module.css";
import Sanctions from "./Sanctions";

import { checkValidChange } from "../util/standards";

export default function EditSanctions({ balances }) {
    const submit = useSubmit();
    const [emailChecked, setEmailChecked] = useState(false);
    const [amount, setAmount] = useState(0);
    const [operation, setOperation] = useState("add");

    //State to store the updated sanction balances from the Table Rows
    const [rowsState, setRowsState] = useState(
        balances.map(item => ({
            name: item.Name,
            balance: item.Balance,
            selected: false,
        }))
    );

    function handleRowChange(index, selected) {
        setRowsState(prevState => {
            const updatedRows = [...prevState];
            updatedRows[index] = { ...updatedRows[index], selected };
            return updatedRows;
        });
    }

    function handleEmailCheck() {
        setEmailChecked(prev => !prev);
    }

    function handleOperationChange() {
        setOperation(prev => (prev === "add" ? "sub" : "add"));
    }

    //Save the value we will be adding/subtracting to balance, TODO check if new Balance is < 0 and prevent this from being an input
    function handleAmountChange(event) {
        const value =
            event.target.value === "" ? 0 : parseFloat(event.target.value);

        setAmount(value);
    }

    async function handleSubmitBalanceChange(event) {
        event.preventDefault();

        const formData = new FormData(event.target);

        //Get rid of items with value of 0, nothing will change
        const changedData = rowsState.filter(obj => obj.selected);

        if (changedData.length === 0) {
            window.confirm(
                "Please select a brother to apply balance change to"
            );
        } else if (amount <= 0) {
            window.confirm("Please enter an amount to add/subtract to balance");
        } else {
            //Check if any operations result in balances < 0
            const invalidChanges = checkValidChange(
                changedData,
                operation,
                amount
            );

            if (invalidChanges.length > 0) {
                let errorString = "";
                invalidChanges.forEach(element => {
                    errorString =
                        errorString +
                        `Operation results in balance < 0 for Don ${element.name}\n`;
                });

                window.confirm(errorString);
            } else {
                formData.append("rowsState", JSON.stringify(changedData));
                formData.append("emailChecked", JSON.stringify(emailChecked));
                formData.append("amount", JSON.stringify(amount));
                formData.append("operation", operation);

                console.log(formData.get("rowsState"));

                submit(formData, { action: "/submit", method: "PUT" });
            }
        }
    }

    return (
        <>
            {/* 
                Can only add a single sanction to selected users, the row will consists of:
                NAME | BALANCE | CHECKMARK
                Bottom row will have: 
                send email can only do something if the value if adding balance
                ADD/SUB | AMOUNT | SEND EMAIL? | SUBMIT

            */}
            <Form method="PUT" onSubmit={handleSubmitBalanceChange}>
                <Sanctions
                    title="Edit Sanctions"
                    rowTitles={["Name", "Balance", "Apply Change?"]}
                >
                    {rowsState.map((item, index) => (
                        <TableEditRow
                            key={index}
                            index={index}
                            name={item.name}
                            balance={item.balance}
                            onRowChange={handleRowChange}
                        />
                    ))}
                    <tr>
                        <td>
                            <select
                                value={operation}
                                onChange={handleOperationChange}
                            >
                                <option value="add">Add</option>
                                <option value="sub">Subtract</option>
                            </select>
                        </td>
                        <td>
                            <input
                                type="number"
                                value={amount === 0 ? "" : amount}
                                onChange={handleAmountChange}
                                placeholder="Amount"
                                min="0"
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className={classes.checkbox}>
                            <input
                                type="checkbox"
                                onChange={handleEmailCheck}
                            />
                            <p>Notify Sanctions?</p>
                        </td>
                        <td></td>
                        <td>
                            <button type="submit">Save Balance Changes</button>
                        </td>
                    </tr>
                </Sanctions>
            </Form>
        </>
    );
}
