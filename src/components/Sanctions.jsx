import React, { useEffect, useState } from 'react';

export default function Sanctions() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    'https://1ydhatqodd.execute-api.us-east-2.amazonaws.com/items'
                );
                if (!response.ok) {
                    throw new Error('Invalid response');
                }
                const result = await response.json();
                //Sort result data alphabetically
                result.sort((a, b) =>
                    a.Balance < b.Balance ? 1 : b.Balance < a.Balance ? -1 : 0
                );

                setData(result);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="sanctions-leaderboard">
            <h1>Sanctions Leaderboard</h1>
            <div className="sanctions-table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Balance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                <td>{item.Name}</td>
                                <td>{item.Balance}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
