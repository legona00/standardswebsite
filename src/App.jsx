import {
    createBrowserRouter,
    Navigate,
    RouterProvider,
} from "react-router-dom";

import "./App.css";

import RootLayout, { loader as loadSanctions } from "./pages/Root";
import HomePage, { loader as loadVP } from "./pages/Home";
import ErrorPage from "./pages/Error";
import LoginPage, { action as loginAction } from "./pages/Login";
import EditSanctionsPage from "./pages/EditSanctions";
import TransitionPowerPage from "./pages/TransitionPowerPage";
import ChangeVP, {
    loader as loadMemberVP,
    action as changeVPAction,
} from "./pages/ChangeVP";

import { action as submitBalanceAction } from "./pages/SubmitBalanceEdit";
import { action as submitExcuseAction } from "./pages/SubmitExcuseEdit";

import { checkAuthLoader, checkLoginLoader } from "./util/auth";
import EditExcusesPage from "./pages/EditExcuses";
import EditBrothersPage from "./pages/EditBrothers";
import EditVPPage from "./pages/EditVPPage";

//All pages have root component which contains the Nav Bar component and the children
const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        id: "root",
        loader: loadSanctions,
        children: [
            {
                index: true,
                element: <HomePage />,
                loader: loadVP,
            },
            {
                path: "login",
                action: loginAction,
                loader: checkLoginLoader,
                element: <LoginPage />,
            },
            {
                path: "edit",
                loader: checkAuthLoader,
                element: <EditSanctionsPage />,
            },
            {
                path: "edit-excuses",
                loader: checkAuthLoader,
                element: <EditExcusesPage />,
            },
            {
                path: "edit-brothers",
                element: <EditBrothersPage />,
            },
            {
                path: "submit",
                element: <Navigate to="edit" replace />,
                action: submitBalanceAction,
            },
            {
                path: "submit-excuses",
                element: <Navigate to="submit-excuses" replace />,
                action: submitExcuseAction,
            },
            {
                path: "transition-power",
                id: "transtionPower",
                element: <TransitionPowerPage />,
                children: [
                    {
                        index: true,
                        element: <EditVPPage />,
                        loader: loadVP,
                    },
                    {
                        path: ":Name",
                        element: <ChangeVP />,
                        loader: loadMemberVP,
                        action: changeVPAction,
                    },
                ],
            },
        ],
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
