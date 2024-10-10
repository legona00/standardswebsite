import { redirect, json } from 'react-router-dom';
import { getToken } from '../util/auth';

export async function action({ request }) {
   //Check for PUT
   const method = request.method;
   const data = await request.formData();
   const emailChecked = data.get('emailChecked');
   const amount = parseInt(data.get('amount'));
   const operation = data.get('operation');
   const token = getToken();

   const reason = data.get('reason');
   const date = data.get('date');

   let successString = [];

   if (method === 'PUT') {
      const rows = data.get('rowsState');
      const rowsData = JSON.parse(rows);
      //Iterate through changed values to calculate new balance and send request to API
      for (const row of rowsData) {
         const { name, balance, excuses, email } = row;

         let newBalance;

         const balanceInt = parseInt(balance);

         if (operation == 'add') {
            newBalance = balanceInt + amount;
         } else if (operation == 'sub') {
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
            newBalance = '0';
         }

         //Prepare request
         //Make sure to include excuse balance and email, otherwise it will be overwritten
         const response = await fetch(
            'https://1ydhatqodd.execute-api.us-east-2.amazonaws.com/items',
            {
               method: method,
               headers: {
                  'Content-Type': 'application/json',
                  Authorization: token,
               },
               body: JSON.stringify({
                  Name: name,
                  Balance: newBalance,
                  email: email,
                  Excuses: excuses,
               }),
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
         if (operation === 'add' && emailChecked) {
            const subject = 'Sanction Statement';
            const emailBody = `Saludos Hermano,\n\nUnfortunately you have been sanctioned $${amount}. \nReason: ${reason} on ${date}\nPlease reach out to me if you have any questions regarding your sanction or would like to appeal.\n\nSPSJ,\nVP of Standards: Carlos Bernal\ntamufiastandards@gmail.com | (346) 218-4160\n`;

            const response = await fetch(
               `https://1ydhatqodd.execute-api.us-east-2.amazonaws.com/email/${name}`,
               {
                  method: 'POST',
                  headers: {
                     'Content-Type': 'application/json',
                     Authorization: token,
                  },
                  body: JSON.stringify({
                     subject: subject,
                     text: emailBody,
                  }),
               }
            );

            if (!response.ok) {
               throw json(
                  {
                     message: `Could not send email for Don ${name}`,
                  },
                  { status: 500 }
               );
            }
         }
      }

      //All request were done successfully
      window.confirm(successString);
      window.location.reload();
   }

   return redirect('/edit');
}
