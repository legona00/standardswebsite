//Pass state setting function so I can add the object in here if the

import { useState } from 'react';

export default function EditExcusesRow({ name, excuses, index, onRowChange }) {
   const [newExcuseAmt, setNewExcuseAmt] = useState(excuses);

   function handleIncrease() {
      if (excuses < 5) {
         onRowChange(index, excuses + 1);
      }
   }
   function handleDecrease() {
      if (excuses > 0) {
         onRowChange(index, excuses - 1);
      }
   }

   return (
      <tr>
         <td>Don {name}</td>
         <td>
            {excuses}
            <button type="button" onClick={handleIncrease}>
               +
            </button>
            <button type="button" onClick={handleDecrease}>
               -
            </button>
         </td>
      </tr>
   );
}
