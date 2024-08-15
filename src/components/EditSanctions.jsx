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

export default function EditSanctions({ balances }) {
    const submit = useSubmit();

    //State to store the updated sanction balances from the Table Rows
    const [rowsState, setRowsState] = useState(
        balances.map(item => ({
            name: item.Name,
            balance: item.Balance,
            operation: "add",
            amount: 0,
        }))
    );
    // console.log(rowsState);

    function handleRowChange(index, operation, amount) {
        setRowsState(prevState => {
            const updatedRows = [...prevState];
            updatedRows[index] = { ...updatedRows[index], operation, amount };
            return updatedRows;
        });
    }

    async function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);

        //Get rid of items with value of 0, nothing will change
        const changedData = rowsState.filter(obj => obj.amount !== 0);

        if (changedData.length === 0) {
            window.confirm("Please enter an amount to add/subtract to balance");
        } else {
            formData.append("rowsState", JSON.stringify(changedData));

            submit(formData, { action: "/submit", method: "PUT" });
        }
    }

    return (
        <>
            {/* Need to make it so each table row has the option to delete the brother and change the balance */}
            {/* Add an option to add a brother at the bottom of the table */}
            <Form method="PUT" onSubmit={handleSubmit}>
                <Sanctions title="Edit Sanctions">
                    {rowsState.map((item, index) => (
                        <TableEditRow
                            key={index}
                            index={index}
                            name={item.name}
                            balance={item.balance}
                            operation={item.operation}
                            amount={item.amount}
                            onRowChange={handleRowChange}
                        />
                    ))}
                </Sanctions>
                <button type="submit">Save Balance Changes</button>
            </Form>
        </>
    );
}

//VALUES PASSED IN
//-----------------
//PUT:
//  - Array of selected names
//  - Balance to add to all
//POST:
//  - Name
//  - Balance
//DELETE:
//  - Name
