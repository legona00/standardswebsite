export function sortStandards(balances) {
    const sorted = balances.sort((a, b) => {
        if (a.Balance !== b.Balance) {
            return b.Balance - a.Balance;
        }
        return a.Name.localeCompare(b.Name);
    });

    return sorted;
}

export function sortByName(balances) {
    const sorted = balances.sort((a, b) => {
        return a.Name.localeCompare(b.Name);
    });

    return sorted;
}
