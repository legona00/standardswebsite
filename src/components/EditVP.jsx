import Sanctions from "./Sanctions";

export default function EditVP({ balances }) {
    return (
        <>
            <Sanctions
                title="Change VP of Standards"
                rowTitles={["Name", "Edit?"]}
            >
                {balances.map((item, index) => (
                    <tr key={index}>
                        <td>Don {item.Name}</td>
                    </tr>
                ))}
            </Sanctions>
        </>
    );
}
