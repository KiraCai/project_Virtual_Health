import React, { useState } from 'react';
import axios from 'axios';
import ProteinViewer from './ProteinViewer';

const GeneSearchForm = ({ onResult }) => {
    const [query, setQuery] = useState('');

    const handleSearch = async () => {
        const token = sessionStorage.getItem("token");
        try {
            console.log("Ищу по запросу:", query);
            const res = await axios.get(`/api/v0.1/users/visualization?query=${query}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Ответ от сервера:', res.data);
            console.log(res.data.articles, res.data.proteins);
            console.log("protein", JSON.stringify(res.data.proteins, null, 2));

            onResult(res.data);
        } catch (error) {
            console.error("Ошибка при поиске:", error);
            alert("Ошибка авторизации. Пожалуйста, войдите в систему.");
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Введите ген / болезнь / мутацию"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button onClick={handleSearch}>Поиск</button>
        </div>
    );
};

const SearchResults = ({ articles = [], proteins = [] }) => (
    <div>
        <h3>Статьи:</h3>
        <ul>
            {articles.map((article, index) => (
                <li key={index}>
                    <a href={article.url} target="_blank" rel="noopener noreferrer">
                        {article.title}
                    </a>
                </li>
            ))}
        </ul>

        <h3>Белки:</h3>
        <ul>
            {proteins.map((protein, index) => (
                <li key={index}>
                    {protein.name} - <a href={`https://www.uniprot.org/uniprot/${protein.primaryAccession}`} target="_blank" rel="noopener noreferrer">Подробнее</a>
                </li>
            ))}
        </ul>
    </div>

);

const GeneSearch = () => {
    const [results, setResults] = useState(null);

    const handleResult = (data) => {
        setResults(data);
    };

    return (
        <div>
            <GeneSearchForm onResult={handleResult} />
            {results && <SearchResults
                articles={results.articles || []}
                proteins={results.proteins || []}
            />}
        </div>
    );
};

export default GeneSearch;


