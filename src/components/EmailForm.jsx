import classes from './EmailForm.module.css';

export default function EmailForm({ emailData, updateEmailData, children }) {
   function handleChange(event) {
      const { name, value } = event.target;
      updateEmailData(name, value);
   }

   return (
      <>
         <h1>Email Data</h1>
         <div className={classes.formContainer}>
            <div className={classes.inputContainer}>
               <label htmlFor="date">Date of Violation:</label>
               <input
                  type="date"
                  id="date"
                  name="date"
                  value={emailData.date}
                  onChange={handleChange}
               />
            </div>
            <div className={classes.inputContainer}>
               <label htmlFor="reason">Reason:</label>
               <input
                  type="text"
                  id="reason"
                  name="reason"
                  value={emailData.reason}
                  onChange={handleChange}
                  placeholder="Enter the reason for the sanction"
               />
            </div>
            {children}
         </div>
      </>
   );
}
