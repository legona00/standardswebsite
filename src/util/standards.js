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

//Check if subtraction is valid by calculating updated balance
//If the value is < 0. Add object {name, valid} to invalidBalances
//Will then check in parent if lenght of this is > 0 to see if any operations are invalid.
export function checkValidChange(changedRows, operation, amount) {
    let invalidBalances = [];
    if (operation === "sub") {
        for (let i = 0; i < changedRows.length; i++) {
            const updatedBalance = changedRows[i].balance - amount;
            if (updatedBalance < 0) {
                invalidBalances = [
                    ...invalidBalances,
                    { name: changedRows[i].name, valid: false },
                ];
            }
        }
    }
    return invalidBalances;
}
