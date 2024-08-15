import {
    createBrowserRouter,
    Navigate,
    RouterProvider,
} from "react-router-dom";

import "./App.css";

import RootLayout from "./pages/Root";
import HomePage, { loader as loadSanctions } from "./pages/Home";
import ErrorPage from "./pages/Error";
import LoginPage, { action as loginAction } from "./pages/Login";
import EditPage from "./pages/Edit";
import { action as submitEditAction } from "./pages/SubmitEdit";

import { checkAuthLoader } from "./util/auth";

//All pages have root component which contains the Nav Bar component and the children
const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        id: "root",
        loader: loadSanctions,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: "login",
                action: loginAction,
                element: <LoginPage />,
            },
            {
                path: "edit",
                loader: checkAuthLoader,
                element: <EditPage />,
            },
            {
                path: "submit",
                element: <Navigate to="edit" replace />,
                action: submitEditAction,
            },
        ],
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
