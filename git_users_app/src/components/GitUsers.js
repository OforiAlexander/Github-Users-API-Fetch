import { useState, useEffect } from 'react';
import axios from 'axios';

const GitUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [debugInfo, setDebugInfo] = useState(null);

    const API_URL = 'http://localhost:5000';

    // Function to fetch users from the backend API
    const fetchUsers = async (method = 'GET') => {
        try {
            // loading starts
            setLoading(true);    
            setError(null);      
            setDebugInfo(null);  

            const response = await axios({
                method,
                url: `${API_URL}/users`,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            });

            setDebugInfo({
                status: response.status,
                statusText: response.statusText,
                headers: response.headers,
            });

            // Update state with fetched users
            setUsers(response.data.data || []);
        } catch (error) {
            setError(error.response?.data?.message || error.message);
            setDebugInfo(error.response || null);
        } finally {
            setLoading(false);   // End loading
        }
    };

    useEffect(() => {
        fetchUsers('GET');
    }, []);

    const fetchGithubUsers = () => fetchUsers('POST');

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-xl animate-pulse">Loading...</div>
            </div>
        );
    }

    
    return (
        <div className="p-2">
            <div className="flex justify-between items-center mb-6 bg-black text-white p-4 rounded-md bg-opacity-75 sticky top-2">
                <h1 className="text-2xl font-bold">GitHub Users</h1>
                <button 
                    onClick={fetchGithubUsers}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                    Fetch New Users
                </button>
            </div>
            <div className="container mx-auto p-4">
                {error && (
                    <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                        <h2 className="font-bold mb-2">Error:</h2>
                        <p>{error}</p>
                        {debugInfo && (
                            <div className="mt-4">
                                <h3 className="font-bold mb-2">Debug Information:</h3>
                                <pre className="bg-gray-100 p-2 rounded text-sm overflow-auto">
                                    {JSON.stringify(debugInfo, null, 2)}
                                </pre>
                            </div>
                        )}
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {users.map((user) => (
                        <div key={user.id} className="bg-white rounded-lg shadow-md p-4 flex items-center space-x-4">
                            <img 
                                src={user.avatar_url} 
                                alt={`${user.username}'s avatar`}
                                className="w-16 h-16 rounded-full"
                            />
                            <div className="flex-1">
                                <h2 className="text-lg font-semibold">{user.username}</h2>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GitUsers;