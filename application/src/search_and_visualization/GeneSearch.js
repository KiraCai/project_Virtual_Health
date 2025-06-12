import React, {useState, useEffect} from 'react';
import axios from 'axios';
import ProteinViewer from './ProteinViewer';

const GeneSearchForm = ({onResult}) => {
    const [query, setQuery] = useState('');


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
    //const [highlightPos, setHighlightPos] = useState(null);
    const [showAll, setShowAll] = useState(false);
    const [selectedPositions, setSelectedPositions] = useState([]);
    const [localSelectedPdbId, setLocalSelectedPdbId] = useState(null);

    const toggleHighlight = (pos) => {
        console.log("Клик по позиции:", pos);
        setShowAll(false);
        setSelectedPositions(prev => {
            const newPositions = prev.includes(pos) ? prev.filter(p => p !== pos) : [...prev, pos];
            console.log("Новое selectedPositions:", newPositions);
            return newPositions;
        });
    };



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
                    //const [localSelectedPdbId, setLocalSelectedPdbId] = useState(null);
                    const pathogenicVariants = (protein.features || []).filter(f =>
                        Array.isArray(f.association) &&
                        f.association.some(a => a.disease === true)
                    );
                    const crossRefPdbIds = protein.uniProtKBCrossReferences
                        ?.filter(ref => ref.database === "PDB")
                        ?.map(ref => {
                            const method = ref.properties?.find(p => p.key === "Method")?.value || "—";
                            const resolution = ref.properties?.find(p => p.key === "Resolution")?.value || "—";
                            const chains = ref.properties?.find(p => p.key === "Chains")?.value || "—";
                            return {
                                id: ref.id,
                                method,
                                resolution,
                                chains
                            };
                        });

                    const pdbIds = crossRefPdbIds?.map(pdb => pdb.id) || [];
                    const showAllPathogenic = (pathogenicVariants) => {
                        setShowAll(true);
                    };
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

                            {crossRefPdbIds.length > 0 ? (
                                <div>
                                    <strong>Structures PDB (из UniProt):</strong>
                                    <table border="1" cellPadding="5" style={{ marginTop: "10px", borderCollapse: "collapse" }}>
                                        <thead>
                                        <tr>
                                            <th>PDB ID</th>
                                            <th>Method</th>
                                            <th>Resolution</th>
                                            <th>Chains</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {crossRefPdbIds.map((pdb, idx) => (
                                            <tr key={idx}>
                                                <td>{pdb.id}</td>
                                                <td>{pdb.method}</td>
                                                <td>{pdb.resolution}</td>
                                                <td>{pdb.chains}</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <p><strong>PDB:</strong> Aucune donnée</p>
                            )}

                            <h4>Патогенные мутации:</h4>
                            <div style={{display: "flex", flexWrap: "wrap", gap: "8px", maxWidth: "800px"}}>
                                {pathogenicVariants.map((v, idx) => {
                                    const label = `${v.original}${v.begin}${v.variation}`;
                                    const tooltip = `Позиция: ${v.begin}, ${v.original} → ${v.variation} (${v.mutatedType || 'n/a'}), ${v.somaticStatus ? 'somatic' : 'inherited'}`;
                                    const isSelected = selectedPositions.includes(v.begin);
                                    return (
                                        <div key={idx} style={{
                                            border: "1px solid gray",
                                            borderRadius: "8px",
                                            padding: "6px 10px",
                                            backgroundColor: selectedPositions.includes(v.begin) ? "#ffcccc" : "#f9f9f9",
                                            cursor: "pointer"
                                        }} title={v.description || "pathogenic mutation"}
                                             onClick={() => toggleHighlight(v.begin)}>
                                            {v.begin} — {v.original}{v.begin}{v.variation}
                                        </div>)
                                })}
                            </div>


                            <div style={{ marginTop: "10px" }}>
                                <button onClick={() => setSelectedPositions([])}>Сбросить</button>
                                <button onClick={() => {
                                    const all = pathogenicVariants.map(v => v.begin);
                                    setSelectedPositions([...new Set(all)]);
                                    setShowAll(false);
                                }}>Показать все</button>
                            </div>


                            {pdbIds.length > 0 && (
                                <div>
                                    <label>Sélectionnez PDB ID:&nbsp;
                                        <select
                                            onChange={(e) => setLocalSelectedPdbId(e.target.value)}
                                        >
                                            <option value="">-- Choisir --</option>
                                            {pdbIds.map(id => (
                                                <option key={id} value={id}>{id}</option>
                                            ))}
                                        </select>
                                    </label>
                                </div>
                            )}

                            {localSelectedPdbId && (
                                <div style={{display: 'flex', gap: '20px', marginTop: '10px'}}>
                                    <div>
                                        {(() => {
                                            const selectedPdbData = crossRefPdbIds.find(pdb => pdb.id === localSelectedPdbId);
                                            const rawChain = selectedPdbData.chains;
                                            const chains = rawChain.split('=')[0].split('/');
                                            const firstChain = chains[0];
                                            return (
                                                <>
                                                <strong>
                                                    Structure 3D pour {localSelectedPdbId}
                                                    {selectedPdbData?.chains && ` avec chaînes: ${selectedPdbData.chains}`}
                                                </strong>
                                                    <ProteinViewer pdbId={localSelectedPdbId}
                                                                   chainId={firstChain}
                                                                   uniprotId={protein.primaryAccession}
                                                                   variants={pathogenicVariants}
                                                                   highlightPos={showAll ? pathogenicVariants.map(v => v.begin) : selectedPositions}
                                                                   showAll={showAll}
                                                    />


                                        </>
                                            );
                                        })()}


                                    </div>
                                    <div>
                                        <strong>Выделенные мутации:</strong>
                                        <ul>
                                            {(showAll ? pathogenicVariants : pathogenicVariants.filter(v => selectedPositions.includes(v.begin)))
                                                .map((v, idx) => (
                                                    <li key={idx}>
                                                        {v.original}{v.begin}{v.variation} — {v.mutatedType || 'n/a'} ({v.somaticStatus ? 'somatic' : 'inherited'})
                                                    </li>
                                                ))}
                                        </ul>

                                    </div>
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
            />}
        </div>
    );
};

export default GeneSearch;


