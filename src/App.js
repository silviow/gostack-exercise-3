import React, { useState, useEffect } from "react";
import api from './services/api';
import "./styles.css";

function App() {
    const [repositories, setRepositories] = useState([]);

    useEffect(() => {
        api.get('/repositories').then(response => {
            setRepositories(response.data);
        });
    }, []);

    async function handleAddRepository() {
        const response = await api.post('/repositories', {
            title: 'GoBarber',
            url: 'https://github.com/silviow/gobarber',
            techs: ['Node.js', 'React.js']
        });

        setRepositories([ ...repositories, response.data ]);
    }

    async function handleRemoveRepository(id) {
        await api.delete(`/repositories/${id}`);

        setRepositories(repositories.filter(
            repository => repository.id !== id
        ));
    }

    return (
        <div>
            <ul data-testid="repository-list">
                {repositories.map(repository => (
                    <li key={repository.id}>
                    {repository.title}
                    <button onClick={() => handleRemoveRepository(repository.id)}>
                        Delete
                    </button>
                </li>
                ))}
            </ul>
            <button onClick={handleAddRepository}>Add new repository</button>
        </div>
    );
}

export default App;
