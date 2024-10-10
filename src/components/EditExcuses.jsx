import { useEffect, useState, useRef } from 'react';
import { Form, useSubmit } from 'react-router-dom';

import Sanctions from './Sanctions';

import classes from './Edit.module.css';
import EditExcusesRow from './EditExcusesRow';

export default function EditSanctions({ balances }) {
   const submit = useSubmit();

   const [rowsState, setRowsState] = useState(
      balances.map((item) => ({
         name: item.Name,
         excuses: item.Excuses,
         balance: item.Balance,
         email: item.email,
      }))
   );

   const [isLoading, setIsLoading] = useState(false);

   //Store original sanctions balances to reset later on if user wants to
   const originalRows = useRef(null);

   useEffect(() => {
      if (!originalRows.current) {
         originalRows.current = rowsState;
      }
   }, [rowsState]);

   //Function to reset to backup state
   function resetExcuses() {
      setRowsState([...originalRows.current]);
   }

   //Used to get value from child component into this component for use in API calls
   function handleRowChange(index, changedVal) {
      setRowsState((prevState) => {
         const updatedRows = [...prevState];
         updatedRows[index] = { ...updatedRows[index], excuses: changedVal };
         return updatedRows;
      });
   }

   function handleSubmitExcuseChange(event) {
      setIsLoading(true);
      event.preventDefault();

      //Check what values have been changed
      let changedData = [];
      for (let i = 0; i < rowsState.length; i++) {
         if (rowsState[i].excuses !== originalRows.current[i].excuses) {
            changedData = [...changedData, rowsState[i]];
         }
      }

      //Verify data, making sure
      if (changedData.length == 0) {
         window.confirm('No change to excuses made.');
      } else {
         //Perform API call
         const formData = new FormData(event.target);
         formData.append('rowsState', JSON.stringify(changedData));

         submit(formData, {
            action: '/submit-excuses',
            method: 'PUT',
         });
      }

      setIsLoading(false);
   }

   return (
      <Form method="PUT" onSubmit={handleSubmitExcuseChange}>
         <Sanctions title="Edit Excuses" rowTitles={['Name', 'Excuses']}>
            {rowsState.map((item, index) => {
               return (
                  <EditExcusesRow
                     key={index}
                     index={index}
                     name={item.name}
                     excuses={item.excuses}
                     onRowChange={handleRowChange}
                  />
               );
            })}
            <tr>
               <td>
                  <button type="button" onClick={resetExcuses}>
                     RESET
                  </button>
               </td>
               <td>
                  <button type="submit" disabled={isLoading}>
                     SUBMIT
                  </button>
               </td>
            </tr>
         </Sanctions>
      </Form>
   );
}
