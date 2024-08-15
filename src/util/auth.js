import { redirect } from "react-router-dom";

//Saves token and expiration date to localStorage
export function setToken(token) {
    localStorage.setItem("token", token);

    const expiration = new Date();
    expiration.setHours(expiration.getHours() + 1);
    localStorage.setItem("expiration", expiration.toISOString());

    setTimeout(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("expiration");
    }, 3600000);
}

export function getTokenDuration() {
    const storedExpirationDate = localStorage.getItem("expiration");
    const expirationDate = new Date(storedExpirationDate);
    const now = new Date();
    const duration = expirationDate.getTime() - now.getTime();
    return duration;
}

export function getToken() {
    const token = localStorage.getItem("token");

    if (!token) {
        return null;
    }

    const tokenDuration = getTokenDuration();
    if (tokenDuration < 0) {
        return "EXPIRED";
    }

    return token;
}

export function checkAuthLoader() {
    const token = getToken();
    if (!token) {
        return redirect("/login");
    }

    return null;
}
