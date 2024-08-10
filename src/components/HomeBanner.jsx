import classes from "./HomeBanner.module.css";

import fraternityLogo from "../assets/phi-iota-alpha-logo.png";

//This will contain the image and the VP of Standards payment information
export default function HomeBanner() {
    return (
        <div className={classes.phiotabanner}>
            <div>
                <img
                    src={fraternityLogo}
                    alt="Phi Iota Alpha Fraternity Inc. crest"
                />
            </div>

            <div className={classes.text}>
                <h1>VP of Standards: Carlos Bernal</h1>
                <p>Phone: {"(346) 218-4160"}</p>
                <p>CashApp: $CarlosFBJ</p>
            </div>
        </div>
    );
}
