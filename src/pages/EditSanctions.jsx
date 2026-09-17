import { useLoaderData } from 'react-router-dom';

import EditSanctions from '../components/EditSanctions';

export default function EditSanctionsPage() {
   const sanctionsBalances = useLoaderData();

   return <EditSanctions balances={sanctionsBalances} />;
}
