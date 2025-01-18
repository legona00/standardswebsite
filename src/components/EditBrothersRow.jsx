export default function EditBrothersRow({
    name,
    excuses,
    balance,
    email,
    index,
    deleteRow,
}) {
    function handleDelete() {
        const confirmation = window.confirm(
            `Are you sure you want to delete ${name}?`
        );

        if (confirmation) {
            deleteRow(index);
        }
    }

    return (
        <>
            <tr>
                <td>
                    Don {name} <button onClick={handleDelete}>X</button>
                </td>

                <td>{excuses}</td>
                <td>${balance}</td>
                <td>{email}</td>
            </tr>
        </>
    );
}
