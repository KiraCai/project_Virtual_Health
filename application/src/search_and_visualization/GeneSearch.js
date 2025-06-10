    import React, {useState} from 'react';
    import axios from 'axios';
    import ProteinViewer from './ProteinViewer';
    import {hexToRgb} from "@mui/material";

    const GeneSearchForm = ({onResult}) => {
        const [query, setQuery] = useState('');
        const [selectedCrossPdbId, setSelectedCrossPdbId] = useState(null);

        const handleSearch = async () => {
            const token = sessionStorage.getItem("token");
            try {
                console.log("Ищу по запросу:", query);
                const res = await axios.get(`/api/v0.1/users/visualization?query=${query}`, {
                    headers: {
                        //Authorization: `Bearer ${token}`
                    }
                });
                console.log('Ответ от сервера:', res.data);
                console.log('Статьи', res.data.articles); //res.data.proteins
                console.log("protein", JSON.stringify(res.data.proteins, null, 2));
                //console.log("articles", JSON.stringify(res.data.articles, null, 2));

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

    const SearchResults = ({articles = [], proteins = [], selectedCrossPdbId, setSelectedCrossPdbId}) => {

        return (

        <div>
            <h3>Статьи:</h3>
            <ul>
                {articles.map((article, index) => (
                    <li key={index}>
                        <a href={article.url} target="_blank" rel="noopener noreferrer">
                            {article.title}
                        </a>
                        <p><strong>Résumé :</strong> {article.abstractText || "Pas de résumé disponible."}</p>
                        <p><strong>Auteurs :</strong> {Array.isArray(article.authors) ? article.authors.join(', ') : "Aucun auteur listé"}</p>
                        <p><strong>Journal :</strong> {article.journal || "Non spécifié"}</p>
                        <p><strong>PMID :</strong> {article.pmid}</p>
                    </li>
                ))}
            </ul>

            <h3>Белки:</h3>
            <ul>
                {proteins.map((protein, index) => {


                    const crossRefPdbIds = protein.uniProtKBCrossReferences
                        ?.filter(ref => ref.database === "PDB")
                        ?.map(ref => ref.id);

                    return (
                    <li key={index}>
                        {protein.primaryAccession} - <a href={`https://www.uniprot.org/uniprot/${protein.primaryAccession}`}
                                                        target="_blank" rel="noopener noreferrer">Lien vers Uniprot avec une
                        description complète de la protéine {protein.primaryAccession}</a>
                        <p>
                            Identifiant unique principal de protéine dans la base de données UniProt: {protein.uniProtkbId}
                        </p>
                        <p>
                            Liste des identifiants alternatifs: {Array.isArray(protein.secondaryAccessions)
                            ? protein.secondaryAccessions.join(', ')
                            : "Нет данных"}
                        </p>
                        <p>
                            Score d'annotation (indique dans quelle mesure la protéine est décrite. 5 est le maximum,
                            beaucoup de données vérifiées): {protein.annotationScore}
                        </p>
                        <p>
                            Lineage: {protein.organism?.lineage?.join(' > ')}
                        </p>
                        <p>
                            Organism: {protein.organism?.scientificName} ({protein.organism?.commonName})
                        </p>
                        <p>
                            Niveau de preuve de l’existence des protéines: {protein.proteinExistence}
                        </p>
                        <p>
                            Noms alternatifs pour les
                            protéines: {
                            Array.isArray(protein.proteinDescription?.alternativeNames)
                                ? protein.proteinDescription.alternativeNames
                                    .map(name => name.fullName?.value)
                                    .filter(Boolean)
                                    .join(', ') : "Нет данных"
                        }
                                </p>
                        <p>
                            Le nom du gène codant pour cette protéine est: {protein.genes?.geneName?.value}
                        </p>

                        <p>
                            <strong>Функции белка:</strong>{" "}
                            {
                                protein.comments?.find(c => c.commentType === "FUNCTION")
                                    ?.texts?.[0]?.value || "Нет данных"
                            }
                        </p>

                        <p><strong>PDB ID (из crossReferences):</strong> {crossRefPdbIds?.length > 0 ? crossRefPdbIds.join(', ') : "Нет данных"}</p>

                        {crossRefPdbIds?.[0] && (
                            <button onClick={() => setSelectedCrossPdbId(crossRefPdbIds[0])}>
                                Показать 3D структуру (по crossRef)
                            </button>
                        )}

                        <p>
                            <strong>Экспрессия:</strong>{" "}
                            {
                                protein.comments?.find(c => c.commentType === "TISSUE SPECIFICITY")
                                    ?.texts?.[0]?.value || "Нет данных"
                            }
                        </p>

                        <div>
                            <strong>Связанные болезни:</strong>
                            <ul>
                                {protein.comments
                                    ?.filter(c => c.commentType === "DISEASE")
                                    ?.map((c, index) => (
                                        <li key={index}>
                                            <p><strong>{c.disease?.diseaseId || "Без названия"}</strong> ({c.disease?.acronym})</p>
                                            <p>{c.disease?.description}</p>
                                            {c.disease?.diseaseCrossReference && (
                                                <p>
                                                    Ссылка: {c.disease.diseaseCrossReference.database} —{" "}
                                                    {c.disease.diseaseCrossReference.id}
                                                </p>
                                            )}
                                        </li>
                                    ))}
                            </ul>
                        </div>


                        <div>
                            <strong>Аминокислотная последовательность:</strong>
                            <pre style={{whiteSpace: "pre-wrap", wordBreak: "break-word"}}>
                                {protein.sequence?.value || "Нет данных"}
                            </pre>
                        </div>

                        {selectedCrossPdbId && (
                            <div style={{ marginTop: '20px' }}>
                                <h4>Визуализация белка: {selectedCrossPdbId}</h4>
                                <ProteinViewer pdbId={selectedCrossPdbId} />
                            </div>
                        )}

                    </li>)
            })}
            </ul>

        </div>
        )


    };

    const GeneSearch = () => {
        const [selectedCrossPdbId, setSelectedCrossPdbId] = useState(null);
        const [results, setResults] = useState(null);

        const handleResult = (data) => {
            setResults(data);
        };

        return (
            <div>
                <GeneSearchForm onResult={handleResult}/>
                {results && <SearchResults
                    articles={results.articles || []}
                    proteins={results.proteins || []}
                    selectedCrossPdbId={selectedCrossPdbId}
                    setSelectedCrossPdbId={setSelectedCrossPdbId}

                />}
            </div>
        );
    };

    export default GeneSearch;


