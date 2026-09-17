import { json, redirect } from "react-router-dom";

import { getToken } from "./auth";

const API_URL = "https://1ydhatqodd.execute-api.us-east-2.amazonaws.com";

export async function loadAdminItems() {
    const token = getToken();

    if (!token || token === "EXPIRED") {
        return redirect("/login");
    }

    const response = await fetch(`${API_URL}/admin/items`, {
        headers: {
            Authorization: token,
        },
    });

    if (response.status === 401) {
        return redirect("/login");
    }

    if (!response.ok) {
        throw json(
            { message: "Could not load administrative sanctions data" },
            { status: response.status }
        );
    }

    return response.json();
}
