//TODO: Pass state setting function so I can add the object in here if the

import { useState } from "react";

export default function TableEditRow({ name, balance, index, onRowChange }) {
    //Send back whether or not the input is checked

    function handleCheckboxChange(event) {
        onRowChange(index, event.target.checked);
    }

    return (
        <tr>
            <td>Don {name}</td>
            <td>${balance}</td>
            <td>
                <input type="checkbox" onChange={handleCheckboxChange} />
            </td>
        </tr>
    );
}
