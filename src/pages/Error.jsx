import { useRouteError } from "react-router-dom";

import MainNavigation from "../components/MainNavigation";

export default function ErrorPage() {
    const error = useRouteError();

    let title = "An error occurred";
    let message = "Something went wrong!";

    if (error.status === 500) {
        message = error.data.message;
    }

    if (error.status === 404) {
        title = "Not found";
        message = "Could not find resource or page";
    }

    return (
        <>
            <MainNavigation />
            <div style={{ color: "black" }}>
                <h1>{title}</h1>
                <p>{message}</p>
            </div>
        </>
    );
}
