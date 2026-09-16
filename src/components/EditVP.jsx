import { useNavigate } from "react-router-dom";
import Sanctions from "./Sanctions";

export default function EditVP({ balances }) {
    const navigate = useNavigate();

    return (
        <>
            <Sanctions
                title="Change VP of Standards"
                rowTitles={["Name", "Edit?"]}
            >
                {balances.map((item, index) => (
                    <tr key={index}>
                        <td>Don {item.Name}</td>
                        <td>
                            <button onClick={() => navigate(`${item.Name}`)}>
                                &#x2713;
                            </button>
                        </td>
                    </tr>
                ))}
            </Sanctions>
        </>
    );
}
