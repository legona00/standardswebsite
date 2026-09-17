import { useLoaderData } from 'react-router-dom';

import EditExcuses from '../components/EditExcuses';

export default function EditExcusesPage() {
   const sanctionsBalances = useLoaderData();

   return <EditExcuses balances={sanctionsBalances} />;
}
