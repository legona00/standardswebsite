import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";

import RootLayout from "./pages/Root";
import HomePage, { loader as loadSanctions } from "./pages/Home";
import ErrorPage from "./pages/Error";

//All pages have root component which contains the Nav Bar component and the children
const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <HomePage />,
                loader: loadSanctions,
            },
        ],
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
