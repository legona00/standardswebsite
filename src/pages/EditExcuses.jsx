import { Await, useRouteLoaderData } from 'react-router-dom';
import { Suspense } from 'react';

import EditExcuses from '../components/EditExcuses';

export default function EditExcusesPage() {
   const sanctionsBalances = useRouteLoaderData('root');

   return (
      <>
         <Suspense fallback={<p>Loading...</p>}>
            <Await resolve={sanctionsBalances}>
               {(loadedSanctionsBalances) => (
                  <EditExcuses balances={loadedSanctionsBalances} />
               )}
            </Await>
         </Suspense>
      </>
   );
}
