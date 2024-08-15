//TODO: Pass state setting function so I can add the object in here if the

import { useState } from "react";

export default function TableEditRow({
    name,
    balance,
    operation,
    amount,
    index,
    onRowChange,
}) {
    //Switch between adding and subtracting balance
    function handleOperationChange(event) {
        onRowChange(index, event.target.value, amount);
    }

    //Save the value we will be adding/subtracting to balance, TODO check if new Balance is < 0 and prevent this from being an input
    function handleAmountChange(event) {
        const value =
            event.target.value === "" ? 0 : parseFloat(event.target.value);

        onRowChange(index, operation, value);
    }

    return (
        <tr>
            <td>Don {name}</td>
            <td>${balance}</td>
            <td>
                <select value={operation} onChange={handleOperationChange}>
                    <option value="add">Add</option>
                    <option value="sub">Subtract</option>
                </select>
                <input
                    type="number"
                    value={amount === 0 ? "" : amount}
                    onChange={handleAmountChange}
                    placeholder="Amount"
                    min="0"
                />
            </td>
        </tr>
    );
}
