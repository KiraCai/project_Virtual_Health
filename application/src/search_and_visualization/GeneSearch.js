import React, {useState} from 'react';
import axios from 'axios';
import ProteinViewer from './ProteinViewer';
import {hexToRgb} from "@mui/material";

/*const PdbViewer = ({crossRefPdbIds, setSelectedCrossPdbId}) => {
    const [selectedPdbId, setSelectedPdbId] = useState(crossRefPdbIds?.[0] || '');

    if (!crossRefPdbIds || crossRefPdbIds.length === 0) return null;

    return (
        <div>
            <label>
                Sélectionnez PDB ID:&nbsp;
                <select
                    value={selectedPdbId}
                    onChange={(e) => setSelectedPdbId(e.target.value)}
                >
                    {crossRefPdbIds.map((id) => (
                        <option key={id} value={id}>
                            {id}
                        </option>
                    ))}
                </select>
            </label>

            <button
                onClick={() => setSelectedCrossPdbId(selectedPdbId)}
                style={{marginLeft: '10px'}}
            >
                Afficher la structure 3D
            </button>
        </div>
    );
};*/


const GeneSearchForm = ({onResult}) => {
    const [query, setQuery] = useState('');
    //const [selectedCrossPdbId, setSelectedCrossPdbId] = useState(null);

    const handleSearch = async () => {
        //const token = sessionStorage.getItem("token");
        try {
            console.log("Recherche par demande:", query);
            const res = await axios.get(`/api/v0.1/users/visualization?query=${query}`, {
                /*headers: {
                    Authorization: `Bearer ${token}`
                }*/
            });
            console.log('Réponse du serveur:', res.data);
            console.log('Articles', res.data.articles); //res.data.proteins
            console.log("protein", JSON.stringify(res.data.proteins, null, 2));
            //console.log("articles", JSON.stringify(res.data.articles, null, 2));
            onResult(res.data);
        } catch (error) {
            console.error("Erreur lors de la recherche:", error);
            alert("Erreur. Veuillez recharger la page..");
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

const SearchResults = ({articles = [], proteins = []}) => {

    return (

        <div>
            <h3>Articles:</h3>
            <ul>
                {articles.map((article, index) => (
                    <li key={index}>
                        <a href={article.url} target="_blank" rel="noopener noreferrer">
                            {article.title}
                        </a>
                        <p><strong>Résumé :</strong> {article.abstractText || "Pas de résumé disponible."}</p>
                        <p><strong>Auteurs
                            :</strong> {Array.isArray(article.authors) ? article.authors.join(', ') : "Aucun auteur listé"}
                        </p>
                        <p><strong>Journal :</strong> {article.journal || "Non spécifié"}</p>
                        <p><strong>PMID :</strong> {article.pmid}</p>
                    </li>
                ))}
            </ul>

            <h3>Protéines:</h3>
            <ul>
                {proteins.map((protein, index) => {

                    const [localSelectedPdbId, setLocalSelectedPdbId] = useState(null);

                    const crossRefPdbIds = protein.uniProtKBCrossReferences
                        ?.filter(ref => ref.database === "PDB")
                        ?.map(ref => ref.id);

                    return (
                        <li key={index}>
                            {protein.primaryAccession} - <a
                            href={`https://www.uniprot.org/uniprot/${protein.primaryAccession}`}
                            target="_blank" rel="noopener noreferrer">Lien vers Uniprot avec une
                            description complète de la protéine {protein.primaryAccession}</a>
                            <p>
                                Identifiant unique principal de protéine dans la base de données
                                UniProt: {protein.uniProtkbId}
                            </p>

                            <p>
                                Liste des identifiants alternatifs: {Array.isArray(protein.secondaryAccessions)
                                ? protein.secondaryAccessions.join(', ')
                                : "Aucune donnée"}
                            </p>

                            <p>
                                Score d'annotation (indique dans quelle mesure la protéine est décrite. 5 est le
                                maximum,
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
                                        .join(', ') : "Aucune donnée"
                            }
                            </p>

                            <p>
                                Le nom du gène codant pour cette protéine est: {protein.genes?.geneName?.value}
                            </p>

                            <div>
                                <strong>Séquence d'acides aminés:</strong>
                                <pre style={{whiteSpace: "pre-wrap", wordBreak: "break-word"}}>
                                {protein.sequence?.value || "Aucune donnée"}
                            </pre>
                            </div>

                            <p><strong>PDB ID (à partir de cross
                                References):</strong> {crossRefPdbIds?.length > 0 ? crossRefPdbIds.join(', ') : "Aucune donnée"}
                            </p>


                            {crossRefPdbIds?.length > 0 && (
                                <div>
                                    <label>Sélectionnez PDB ID:&nbsp;
                                        <select
                                            onChange={(e) => setLocalSelectedPdbId(e.target.value)}
                                        >
                                            <option value="">-- Choisir --</option>
                                            {crossRefPdbIds.map(id => (
                                                <option key={id} value={id}>{id}</option>
                                            ))}
                                        </select>
                                    </label>
                                </div>
                            )}

                            {localSelectedPdbId && (
                                <div style={{ marginTop: '10px' }}>
                                    <strong>Structure 3D pour {localSelectedPdbId}</strong>
                                    <ProteinViewer pdbId={localSelectedPdbId} />
                                </div>
                            )}

                            <p>
                                <strong>Fonctions des protéines:</strong>{" "}
                                {
                                    protein.comments?.find(c => c.commentType === "FUNCTION")
                                        ?.texts?.[0]?.value || "Aucune donnée"
                                }
                            </p>

                            <p>
                                <strong>Expression:</strong>{" "}
                                {
                                    protein.comments?.find(c => c.commentType === "TISSUE SPECIFICITY")
                                        ?.texts?.[0]?.value || "Aucune donnée"
                                }
                            </p>

                            <div>
                                <strong>Maladies apparentées:</strong>
                                <ul>
                                    {protein.comments
                                        ?.filter(c => c.commentType === "DISEASE")
                                        ?.map((c, index) => (
                                            <li key={index}>
                                                <p>
                                                    <strong>{c.disease?.diseaseId || "Sans titre"}</strong> ({c.disease?.acronym})
                                                </p>

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
                        </li>)
                })}
            </ul>
        </div>
    )
};

const GeneSearch = () => {
    //const [selectedCrossPdbId, setSelectedCrossPdbId] = useState(null);
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
                /*selectedCrossPdbId={selectedCrossPdbId}
                setSelectedCrossPdbId={setSelectedCrossPdbId}*/

            />}
        </div>
    );
};

export default GeneSearch;


