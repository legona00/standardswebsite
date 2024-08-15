import { Form, useActionData, useNavigation } from "react-router-dom";

import classes from "./LoginForm.module.css";

export default function LoginForm() {
    const data = useActionData();
    const navigation = useNavigation();
    const isSubmitting = navigation === "submitting";

    return (
        <>
            <Form method="post" className={classes.form}>
                <h1>Login</h1>
                {data && <p>Invalid Login</p>}
                <p>
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        required
                    ></input>
                </p>
                <p>
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        required
                    ></input>
                </p>
                <div className={classes.action}>
                    <button disabled={isSubmitting}>Login</button>
                </div>
            </Form>
        </>
    );
}
