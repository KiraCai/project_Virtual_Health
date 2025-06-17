import React, {useState, useEffect} from 'react';
import axios from 'axios';
import ProteinViewer from './ProteinViewer';
import ProteinVisualizationWithScore from "./ProteinVisualizationWithScore";

const GeneSearchForm = ({onResult}) => {
    const [query, setQuery] = useState('');

    const handleSearch = async () => {
        //const token = sessionStorage.getItem("token");
        try {
            console.log("Recherche par demande:", query);
            const res = await axios.get(`/api/v0.1/users/visualization?query=${query}`, {
                timeout: 300000
                /*headers: {
                    Authorization: `Bearer ${token}`
                }*/
            });
            onResult(res.data);
        } catch (error) {
            alert("Erreur. Veuillez recharger la page..");
        }
    };

    return (
        <div className="searchProt fat">
            <input
                type="text"
                placeholder="Entrez le gène/la maladie/la mutation"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button className="btn buttonStyleDark fat" onClick={handleSearch}>Recherche</button>
        </div>
    );
};

const SearchResults = ({articles = [], proteins = []}) => {
    const [selectedStates, setSelectedStates] = useState({});

    const toggleHighlight = (accession, pos) => {
        setSelectedStates(prev => {
            const current = prev[accession] || {};
            const selected = Array.isArray(current.selectedPositions)
                ? current.selectedPositions
                : [];
            const newPositions = selected.includes(pos)
                ? selected.filter(p => p !== pos)
                : [...selected, pos];
            return {
                ...prev,
                [accession]: {...current, selectedPositions: newPositions, pdbId: current.pdbId || "", showAll: false}
            };
        });
    };

    const selectPdb = (accession, pdbId) => {
        setSelectedStates(prev => ({
            ...prev,
            [accession]: {...(prev[accession] || {}), pdbId}
        }));
    };

    const resetSelection = (accession) => {
        setSelectedStates(prev => ({
            ...prev,
            [accession]: {...(prev[accession] || {}), selectedPositions: [], showAll: false}
        }));
    };

    const showAllMutations = (accession, variants) => {
        setSelectedStates(prev => ({
            ...prev,
            [accession]: {
                ...(prev[accession] || {}),
                selectedPositions: [...new Set(variants.map(v => v.begin))],
                showAll: true
            }
        }));
    };


    return (

        <div className="blocProt">
            <div className="linesNote buttonStyleDark">Articles:</div>
            <ul>
                {articles.map((article, index) => (
                    <li key={index}>
                        <a className="infoNote fat" href={article.url} target="_blank" rel="noopener noreferrer">
                            {article.title}
                        </a>
                        <div className="infoNote">
                            <p><strong>Résumé :</strong> {article.abstractText || "Pas de résumé disponible."}</p>
                            <p><strong>Auteurs
                                :</strong> {Array.isArray(article.authors) ? article.authors.join(', ') : "Aucun auteur listé"}
                            </p>
                            <p><strong>Journal :</strong> {article.journal || "Non spécifié"}</p>
                            <p><strong>PMID :</strong> {article.pmid}</p>
                        </div>
                    </li>
                ))}
            </ul>

            <div className="linesNote buttonStyleDark">Protéines:</div>
            <ul>
                {proteins.map((protein, index) => {

                    const state = selectedStates[protein.primaryAccession] || {
                        selectedPositions: [],
                        showAll: false,
                        pdbId: ''
                    };
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
                            className="infoNote fat"
                            href={`https://www.uniprot.org/uniprot/${protein.primaryAccession}`}
                            target="_blank" rel="noopener noreferrer">Lien vers Uniprot avec une
                            description complète de la protéine {protein.primaryAccession}</a>
                            <div>
                                <strong>Identifiant unique principal de protéine dans la base de données
                                UniProt:</strong> {protein.uniProtkbId}
                            </div>

                            <div>
                                <strong>Liste des identifiants alternatifs:</strong> {Array.isArray(protein.secondaryAccessions)
                                ? protein.secondaryAccessions.join(', ')
                                : "Aucune donnée"}
                            </div>

                            <div>
                                <strong>Score d'annotation (indique dans quelle mesure la protéine est décrite. 5 est le
                                maximum,                                beaucoup de données vérifiées):</strong> {protein.annotationScore}
                            </div>

                            <div>
                                <strong>Lineage:</strong> {protein.organism?.lineage?.join(' > ')}
                            </div>

                            <div>
                                <strong>Organism:</strong> {protein.organism?.scientificName} ({protein.organism?.commonName})
                            </div>

                            <div>
                                <strong>Niveau de preuve de l’existence des protéines:</strong> {protein.proteinExistence}
                            </div>

                            <div>
                                <strong>Noms alternatifs pour les
                                protéines:</strong> {
                                Array.isArray(protein.proteinDescription?.alternativeNames)
                                    ? protein.proteinDescription.alternativeNames
                                        .map(name => name.fullName?.value)
                                        .filter(Boolean)
                                        .join(', ') : "Aucune donnée"
                            }
                            </div>

                            <div>
                                <strong>Le nom du gène codant pour cette protéine est:</strong> {protein.genes?.geneName?.value}
                            </div>

                            <div>
                                <strong>Séquence d'acides aminés:</strong>
                                <pre style={{whiteSpace: "pre-wrap", wordBreak: "break-word"}}>
                                {protein.sequence?.value || "Aucune donnée"}
                            </pre>
                            </div>

                            {crossRefPdbIds.length > 0 ? (
                                <div>
                                    <strong>Structures PDB (из UniProt):</strong>
                                    <table className="tableProtChain" border="1" cellPadding="5">
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

                            <h4>Mutations pathogènes:</h4>
                            <div className="wrapMutation tableProt">
                                {pathogenicVariants.map((v, idx) => {
                                    const position = !v.end || v.begin === v.end ? `${v.begin}` : `${v.begin}–${v.end}`;
                                    const label = `${v.original}${v.begin}${v.variation}`;
                                    const tooltip = `Position: ${v.begin}, ${v.original} → ${v.variation} (${v.mutatedType || 'n/a'}), ${v.somaticStatus ? 'somatic' : 'inherited'}`;
                                    const isSelected = state?.selectedPositions?.includes(v.begin);

                                    return (
                                        <div key={idx}
                                             style={{
                                                 backgroundColor: state?.selectedPositions?.includes(v.begin) ? "#ffcccc" : "#f9f9f9",
                                             }} className="boxMutation" title={v.description || tooltip}
                                             onClick={() => toggleHighlight(protein.primaryAccession, v.begin)}>
                                            {position}
                                        </div>)
                                })}
                            </div>

                            <div className="btnWrapProt tableProt">
                                <button className="btn buttonStyleDark fat" onClick={() => resetSelection(protein.primaryAccession)}>Vider</button>
                                <button className="btn buttonStyleDark fat" onClick={() => {
                                    const all = pathogenicVariants.map(v => v.begin);
                                    showAllMutations(protein.primaryAccession, pathogenicVariants);
                                }}>Tout afficher
                                </button>
                            </div>

                            {pdbIds.length > 0 && (
                                <div className="tableProt">
                                    <label>Sélectionnez PDB ID:&nbsp;
                                        <select className="selectProt"
                                            value={state.pdbId || ''}

                                            onChange={(e) => {
                                                const pdbId = e.target.value;

                                                selectPdb(protein.primaryAccession, pdbId);
                                            }}
                                        >
                                            <option value="">-- Choisir --</option>
                                            {pdbIds.map(id => (
                                                <option key={id} value={id}>{id}</option>
                                            ))}
                                        </select>
                                    </label>
                                </div>
                            )}

                            {state.pdbId && (
                                <div style={{display: 'flex', gap: '20px', marginTop: '10px'}}>
                                    <div>
                                        {(() => {
                                            const selectedPdbData = crossRefPdbIds.find(pdb => pdb.id === state.pdbId);

                                            if (!selectedPdbData) {
                                                return <p>Données pour PDB ID {state.pdbId} non trouvées.</p>;
                                            }
                                            const rawChain = selectedPdbData.chains;
                                            const chains = rawChain.split('=')[0].split('/');
                                            const firstChain = chains[0];
                                            return (
                                                <div className="viewProt">
                                                    <div>
                                                        <strong>
                                                            Structure 3D pour {state.pdbId}
                                                            {selectedPdbData?.chains && ` avec chaînes: ${selectedPdbData.chains}`}
                                                        </strong>
                                                        {state.pdbId && (<ProteinViewer pdbId={state.pdbId}
                                                                                        chainId={firstChain}
                                                                                        uniprotId={protein.primaryAccession}
                                                                                        variants={pathogenicVariants}
                                                                                        highlightPos={state.showAll ? pathogenicVariants.map(v => v.begin) : state.selectedPositions}
                                                                                        showAll={state.showAll}
                                                        />)}
                                                    </div>
                                                    <div className="boxProtScore">
                                                        {selectedStates[protein.primaryAccession]?.pdbId && (
                                                            <ProteinVisualizationWithScore
                                                                key={protein.primaryAccession}
                                                                protein={{
                                                                    ...protein,
                                                                    shannonEntropy: {...protein.shannonEntropy}
                                                                }}
                                                                pathogenic={pathogenicVariants}
                                                                state={selectedStates[protein.primaryAccession]}
                                                            />
                                                        )}
                                                    </div>

                                                </div>
                                            );
                                        })()}

                                    </div>

                                </div>
                            )}

                            <div>
                                <strong>Mutations mises en évidence:</strong>
                                <ul>
                                    {(state.showAll ? pathogenicVariants : pathogenicVariants.filter(v => state?.selectedPositions?.includes(v.begin)))
                                        .map((v, idx) => {
                                            console.log('Variant object:', v);
                                            return(
                                                <>
                                                <li key={idx} style={{ marginBottom: '1rem' }}>
                                                <div>
                                            {v.original} {v.begin + ' - position '} {v.wildType} —> {v.mutatedType || 'n/a'} ({v.somaticStatus ? 'somatic' : 'inherited'})
                                            </div>

                                            {v.association?.length > 0 ? (
                                                <table style={{ borderCollapse: 'collapse', marginTop: '0.5rem', width: '100%', fontSize: '0.9rem' }}>
                                                    <thead>
                                                    <tr>
                                                        <th style={{ border: '1px solid #ccc', padding: '4px' }}>Maladie</th>
                                                        <th style={{ border: '1px solid #ccc', padding: '4px' }}>Description</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {v.association.map((a, i) => (
                                                        <tr key={i}>
                                                            <td style={{ border: '1px solid #ccc', padding: '4px', fontWeight: 'bold' }}>{a.name}</td>
                                                            <td style={{ border: '1px solid #ccc', padding: '4px' }}>
                                                                {a.description || <em style={{ color: '#888' }}>La description est manquante</em>}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                    </tbody>
                                                </table>
                                            ) : (
                                                <div style={{ fontStyle: 'italic', color: '#666' }}>Aucune donnée sur les maladies</div>
                                            )}
                                        </li>
                                                </>)
                                        })}
                                </ul>
                            </div>


                            <div>
                                <strong>Fonctions des protéines:</strong>{" "}
                                {
                                    protein.comments?.find(c => c.commentType === "FUNCTION")
                                        ?.texts?.[0]?.value || "Aucune donnée"
                                }
                            </div>

                            <div>
                                <strong>Expression:</strong>{" "}
                                {
                                    protein.comments?.find(c => c.commentType === "TISSUE SPECIFICITY")
                                        ?.texts?.[0]?.value || "Aucune donnée"
                                }
                            </div>

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
                                                        Lien: {c.disease.diseaseCrossReference.database} —{" "}
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
        <main className="thin">
            <div className="testTitle fat">Analyser une maladie, un gène ou une protéine.
            </div>
            <GeneSearchForm onResult={handleResult}/>
            {results && <SearchResults
                articles={results.articles || []}
                proteins={results.proteins || []}
            />}
        </main>
    );
};

export default GeneSearch;



