import { NavLink } from 'react-router-dom';

import classes from './MainNavigation.module.css';
import tamuLogo from '../assets/tamu-logo.png';

import { getToken } from '../util/auth';

export default function MainNavigation() {
   const token = getToken();

   return (
      <header className={classes.header}>
         <img src={tamuLogo} alt="Texas A&M Logo" />
         <nav>
            <ul className={classes.list}>
               <li>
                  <NavLink
                     to="/"
                     className={({ isActive }) =>
                        isActive ? classes.active : undefined
                     }
                     end
                  >
                     Home
                  </NavLink>
               </li>
               {!token && (
                  <li>
                     <NavLink
                        to="/login"
                        className={({ isActive }) =>
                           isActive ? classes.active : undefined
                        }
                     >
                        Login
                     </NavLink>
                  </li>
               )}
               {token && (
                  <li>
                     <NavLink
                        to="/edit"
                        className={({ isActive }) =>
                           isActive ? classes.active : undefined
                        }
                     >
                        Edit Balances
                     </NavLink>
                  </li>
               )}
               {token && (
                  <li>
                     <NavLink
                        to="/edit-excuses"
                        className={({ isActive }) =>
                           isActive ? classes.active : undefined
                        }
                     >
                        Edit Excuses
                     </NavLink>
                  </li>
               )}
            </ul>
         </nav>
      </header>
   );
}
