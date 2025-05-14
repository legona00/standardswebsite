import classes from "./HomeBanner.module.css";

import fraternityLogo from "../assets/phi-iota-alpha-logo.png";
import { useLoaderData } from "react-router-dom";

//This will contain the image and the VP of Standards payment information
export default function HomeBanner() {
    const data = useLoaderData();
    console.log(data);

    return (
        <div className={classes.phiotabanner}>
            <div>
                <img
                    src={fraternityLogo}
                    alt="Phi Iota Alpha Fraternity Inc. crest"
                />
            </div>

            <div className={classes.text}>
                <h1>VP of Standards: John C. Muñoz</h1>
                <p>Phone: {"(956) 335-7791"}</p>
                <p>CashApp: $JohnCMunoz</p>
            </div>
        </div>
    );
}
