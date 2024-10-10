import { redirect, json } from 'react-router-dom';
import { getToken } from '../util/auth';

export async function action({ request }) {
   //Check for PUT
   const method = request.method;
   const data = await request.formData();
   const token = getToken();

   let successString = [];

   if (method === 'PUT') {
      const rows = data.get('rowsState');
      const rowsData = JSON.parse(rows);
      for (const row of rowsData) {
         //Verify input once again.
         const { name, balance, excuses, email } = row;

         if (excuses < 0 || excuses > 5) {
            throw json(
               {
                  message: `Updated excuses for Don ${name} are < 0 or > 5. Please enter a new value`,
               },
               { statsu: 500 }
            );
         }

         const response = await fetch(
            'https://1ydhatqodd.execute-api.us-east-2.amazonaws.com/excuses',
            {
               method: method,
               headers: {
                  'Content-Type': 'application/json',
                  Authorization: token,
               },
               body: JSON.stringify({
                  Name: name,
                  Balance: balance,
                  email: email,
                  Excuses: excuses,
               }),
            }
         );

         if (!response.ok) {
            throw json(
               {
                  message: `Could not update excuses for Don ${name}`,
               },
               { status: 500 }
            );
         }

         successString = [
            ...successString,
            `Updated excuses of Don ${name} to ${excuses}\n`,
         ];
      }

      window.confirm(successString);
      window.location.reload();
   }

   return redirect('/edit-excuses');
}
