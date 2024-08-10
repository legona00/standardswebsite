export function sortStandards(balances) {
    console.log("SORT");
    const sorted = balances.sort((a, b) => {
        if (a.Balance !== b.Balance) {
            return b.Balance - a.Balance;
        }
        return a.Name.localeCompare(b.Name);
    });

    return sorted;
}
