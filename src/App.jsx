import fraternityLogo from './assets/phi-iota-alpha-logo.png';
import './App.css';

import Sanctions from './components/Sanctions';

function App() {
    return (
        <>
            <div className="intro-page">
                <div className="phiota-banner">
                    <img
                        src={fraternityLogo}
                        className="logo"
                        alt="Vite logo"
                    />
                </div>

                <div className="title-text">
                    <h1>
                        <u>Welcome to Standards</u>
                    </h1>
                    <p>
                        Each brother has 5 excuses per semester. Sanction
                        amounts are decided during meetings and are enforced
                        when a member does not fulfill an obligation
                    </p>
                </div>
            </div>
            <Sanctions />
        </>
    );
}

export default App;
