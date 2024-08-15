import { json, redirect } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import { setTokenAndExpiration } from "../util/auth";

export default function LoginPage() {
    return <LoginForm />;
}

export async function action({ request }) {
    //If the token already exists, just return, do not need to redo login

    const data = await request.formData();

    const authData = {
        email: data.get("email"),
        password: data.get("password"),
    };

    try {
        const response = await fetch(
            "https://1ydhatqodd.execute-api.us-east-2.amazonaws.com/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(authData),
            }
        );

        if (response.status === 422 || response.status === 401) {
            return response;
        }

        if (!response.ok) {
            throw json(
                { message: "Could not authenticate user" },
                { status: 500 }
            );
        }

        const resData = await response.json();
        const token = resData.token;
        const expiration = resData.expiresAt;
        setTokenAndExpiration(token, expiration);
    } catch (error) {
        console.log(error);
    }

    return redirect("/edit");
}
