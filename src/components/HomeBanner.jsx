import classes from "./HomeBanner.module.css";

import { useState, useEffect } from "react";

import fraternityLogo from "../assets/phi-iota-alpha-logo.png";
import { useLoaderData } from "react-router-dom";

//This will contain the image and the VP of Standards payment information
export default function HomeBanner() {
    const data = useLoaderData();
    const [currentVP, setCurrentVP] = useState(() => {
        const saved = localStorage.getItem("currentVP");
        return saved ? JSON.parse(saved) : null;
    });

    useEffect(() => {
        setCurrentVP(data);
        localStorage.setItem("currentVP", JSON.stringify(data));
    }, [data]);

    console.log(currentVP);

    return (
        <div className={classes.phiotabanner}>
            <div>
                <img
                    src={fraternityLogo}
                    alt="Phi Iota Alpha Fraternity Inc. crest"
                />
            </div>

            <div className={classes.text}>
                <h1>VP of Standards: Don {currentVP.Name}</h1>
                <p>Phone Number: {currentVP.phoneNumber}</p>
                {currentVP.cashappTag && (
                    <p>CashApp: ${currentVP.cashappTag}</p>
                )}
                {currentVP.venmoTag && <p>Venmo: @{currentVP.venmoTag}</p>}
            </div>
        </div>
    );
}
