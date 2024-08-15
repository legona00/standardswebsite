import { redirect } from "react-router-dom";

//Saves token and expiration date to localStorage
//Expiration passed as int/string
export function setTokenAndExpiration(token, expiration) {
    if (!token) {
        return null;
    }
    const expirationDate = new Date(expiration);

    localStorage.setItem("expiration", expirationDate);
    localStorage.setItem("token", token);

    const remainingTime = expiration - Date.now();

    //Create timer to remove values from browser memory
    setTimeout(() => {
        loginExpired();
    }, remainingTime);
    console.log(remainingTime);
}

export function getToken() {
    const token = localStorage.getItem("token");

    if (!token) {
        return null;
    }

    const tokenDuration = getTokenDuration();
    if (tokenDuration <= 0) {
        return "EXPIRED";
    }

    return token;
}

export function getExpiration() {
    const expiration = localStorage.getItem("expiration");

    if (!expiration) {
        return null;
    }

    return expiration;
}

//Returns time left until token expiration
export function getTokenDuration() {
    const storedExpiration = localStorage.getItem("expiration");
    const storedExpDate = new Date(storedExpiration);
    const currentTime = new Date();
    const duration = storedExpDate.getTime() - currentTime.getTime();
    return duration > 0 ? duration : 0;
}

export function loginExpired() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    window.location.reload();
}

//Loaders for edit and login pages ensuring only one is visible at a time
export function checkAuthLoader() {
    const token = getToken();
    if (!token) {
        return redirect("/login");
    }

    return null;
}

export function checkLoginLoader() {
    const token = getToken();
    if (token) {
        return redirect("/edit");
    }

    return null;
}
