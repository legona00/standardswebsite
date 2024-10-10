import {
   createBrowserRouter,
   Navigate,
   RouterProvider,
} from 'react-router-dom';

import './App.css';

import RootLayout from './pages/Root';
import HomePage, { loader as loadSanctions } from './pages/Home';
import ErrorPage from './pages/Error';
import LoginPage, { action as loginAction } from './pages/Login';
import EditSanctionsPage from './pages/EditSanctions';

import { action as submitBalanceAction } from './pages/SubmitBalanceEdit';
import { action as submitExcuseAction } from './pages/SubmitExcuseEdit';

import { checkAuthLoader, checkLoginLoader } from './util/auth';
import EditExcusesPage from './pages/EditExcuses';

//All pages have root component which contains the Nav Bar component and the children
const router = createBrowserRouter([
   {
      path: '/',
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      id: 'root',
      loader: loadSanctions,
      children: [
         {
            index: true,
            element: <HomePage />,
         },
         {
            path: 'login',
            action: loginAction,
            loader: checkLoginLoader,
            element: <LoginPage />,
         },
         {
            path: 'edit',
            loader: checkAuthLoader,
            element: <EditSanctionsPage />,
         },
         {
            path: 'edit-excuses',
            loader: checkAuthLoader,
            element: <EditExcusesPage />,
         },
         {
            path: 'submit',
            element: <Navigate to="edit" replace />,
            action: submitBalanceAction,
         },
         {
            path: 'submit-excuses',
            element: <Navigate to="submit-excuses" replace />,
            action: submitExcuseAction,
         },
      ],
   },
]);

function App() {
   return <RouterProvider router={router} />;
}

export default App;
