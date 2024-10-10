//Pass state setting function so I can add the object in here if the

export default function EditSanctionsRow({
   name,
   balance,
   index,
   onRowChange,
}) {
   //Send back whether or not the input is checked

   function handleCheckboxChange(event) {
      //Checked is a bool that determines if a checkbox is marked or not
      //This will be used by parent to determine if the sanction change
      //Should be applied to the element at the given index
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
