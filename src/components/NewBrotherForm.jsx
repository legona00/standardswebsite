import classes from "./CustomForm.module.css";

export default function NewBrotherForm({ newDonData, children, updateData }) {
    function handleChange(event) {
        const { name, value } = event.target;
        updateData(name, value);
    }

    return (
        <>
            <h1>Add a Brother</h1>
            <div className={classes.formContainer}>
                <div className={classes.inputContainer}>
                    <label htmlFor="name">Don</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={newDonData.name}
                        onChange={handleChange}
                        placeholder="Enter the name of the new brother"
                    />
                </div>
                <div className={classes.inputContainer}>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        value={newDonData.email}
                        onChange={handleChange}
                        placeholder="Enter the email of the new brother"
                    />
                </div>
                {children}
            </div>
        </>
    );
}
