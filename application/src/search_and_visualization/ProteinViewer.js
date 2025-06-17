import React, {useEffect, useRef, useState} from 'react';
import {Stage} from 'ngl';
import axios from 'axios';

const ProteinViewer = ({pdbId, chainId, uniprotId, variants = [], highlightPos = [], showAll}) => {
    const viewerRef = useRef(null);
    const stageRef = useRef(null);
    const [mappedPositions, setMappedPositions] = useState([]);
    const [representationType, setRepresentationType] = useState('cartoon'); // Presentation type
    const [clickedAtom, setClickedAtom] = useState(null); // State of the selected atom


    useEffect(() => {
        console.log("начало")
        if (!pdbId) return;
        // Loading UniProt-PDB mapping (SIFTS)
        const fetchMapping = async () => {
            try {
                const {data} = await axios.get(`https://www.ebi.ac.uk/pdbe/api/mappings/uniprot/${pdbId.toLowerCase()}`);
                const entry = data?.[pdbId.toLowerCase()]?.UniProt?.[uniprotId];
                if (!entry) {
                    console.warn("UniProt ID", uniprotId, "not found in mapping");
                    return;
                }
                const chains = Array.isArray(chainId) ? chainId : [chainId];
                const allMapped = [];

                entry.mappings.forEach(m => {
                    if (chains.includes(m.chain_id)) {
                        allMapped.push({
                            uniprotPos: m.unp_start,
                            pdbStart: m.start.residue_number,
                            pdbEnd: m.end.residue_number,
                            chain: m.chain_id
                        });
                    }
                });

                setMappedPositions(allMapped);

                console.log("highlightPos:", highlightPos);
                console.log("mappedPositions (local):", allMapped);

                const missingPositions = variants
                    .map(v => v.begin)
                    .filter(pos => {
                        return !allMapped.some(m =>
                            pos >= m.uniprotPos &&
                            pos <= m.uniprotPos + (m.pdbEnd - m.pdbStart)
                        );
                    });

                if (missingPositions.length > 0) {
                    console.warn('These UniProt positions are not present in the PDB.:', missingPositions);
                } else {
                    console.log('All UniProt positions are covered by mapping.');
                }

            } catch (err) {
                console.error('Error loading UniProt↔PDB mapping:', err);
            }
        };
        fetchMapping();
    }, [pdbId, chainId]);

    useEffect(() => {
        console.log("useEffect for highlighting worked");
        console.log("highlightPos:", highlightPos);

        if (!pdbId || !viewerRef.current || mappedPositions.length === 0) return;

        if (!stageRef.current) {
            stageRef.current = new Stage(viewerRef.current);
        } else {
            stageRef.current.removeAllComponents();
        }

        stageRef.current.loadFile(`https://files.rcsb.org/download/${pdbId}.pdb`, {
            defaultRepresentation: true
        }).then(component => {
            component.addRepresentation('cartoon', {color: 'skyblue'});

            // We clear the old handler so that it is not duplicated
            stageRef.current.signals.clicked.removeAll();
            stageRef.current.signals.clicked.add(pickingProxy => {
                if (!pickingProxy || !pickingProxy.atom) {
                    console.log("Click not on the atom");
                    return;
                }
                const atom = pickingProxy.atom;
                const chain = atom.chainname;
                const resno = atom.resno;
                const resname = atom.resname;
                const atomname = atom.atomname;
                setClickedAtom({chain, resno, resname, atomname});
                if (chain && resno) {
                    console.log(`Cliquez sur un atome : chaîne ${chain}, résidu ${atom.resname} ${resno}`);

                    try {
                        component.addRepresentation('spacefill', {
                            sele: `${chain}:${resno}`,
                            color: 'orange'
                        });
                        stageRef.current.autoView();
                    } catch (e) {
                        console.error("Erreur lors de la mise en surbrillance de l'atome sélectionné:", e);
                    }
                }
            });

            // Подсветка UniProt-позиций
            const highlightResidues = () => {
                const positions = (showAll ? variants.map(v => v.begin) : highlightPos) || [];

                const pdbPositions = positions.flatMap(uniprotPos => {
                    const mapping = mappedPositions.find(m =>
                        uniprotPos >= m.uniprotPos && uniprotPos <= m.uniprotPos + (m.pdbEnd - m.pdbStart)
                    );
                    if (!mapping) return [];

                    const offset = uniprotPos - mapping.uniprotPos;
                    return [{
                        chain: mapping.chain,
                        pos: mapping.pdbStart + offset
                    }];
                });
                const unique = [...new Set(pdbPositions.map(({chain, pos}) => `${chain}:${pos}`))];


                if (pdbPositions.length > 0) {
                    const {chain, pos} = pdbPositions[0];
                    const selection = `${pos}`;
                    console.log("We will highlight (only the first one):", selection);

                    component.addRepresentation('spacefill', {
                        sele: selection,
                        color: 'yellow',
                    });

                    stageRef.current.autoView(selection);
                } else {
                    console.warn('There are no suitable positions for lighting');
                }
            };
            highlightResidues();
        });

        return () => {
            if (stageRef.current) {
                stageRef.current.removeAllComponents();
            }
        };
    }, [pdbId, chainId, mappedPositions, highlightPos, showAll, variants]);


    useEffect(() => {
        const stage = stageRef.current;
        if (!stage || stage.compList.length === 0) return;

        const component = stage.compList[0]; // first loaded component
        if (!component) return;

        component.removeAllRepresentations(); // delete old
        component.addRepresentation(representationType, {
            color: 'skyblue'
        });

        const positions = (showAll ? variants.map(v => v.begin) : highlightPos) || [];

        const pdbPositions = positions.flatMap(uniprotPos => {
            const mapping = mappedPositions.find(m =>
                uniprotPos >= m.uniprotPos && uniprotPos <= m.uniprotPos + (m.pdbEnd - m.pdbStart)
            );
            if (!mapping) return [];

            const offset = uniprotPos - mapping.uniprotPos;
            return [{
                chain: mapping.chain,
                pos: mapping.pdbStart + offset
            }];
        });

        const unique = [...new Set(pdbPositions.map(({chain, pos}) => `${chain}:${pos}`))];

        unique.forEach(selection => {
            component.addRepresentation('spacefill', {
                sele: selection,
                color: 'yellow'
            });
        });

        stage.autoView();

    }, [representationType, mappedPositions, highlightPos, showAll, variants]);


    return (
        <div>
            <div>
                <label>Type de présentation:&nbsp;
                    <select className="selectProt" value={representationType} onChange={(e) => setRepresentationType(e.target.value)}>
                        <option value="cartoon">Ribbon (cartoon)</option>
                        <option value="ball+stick">Ball-and-rod (ball+stick)</option>
                        <option value="surface">Surface</option>
                        <option value="spacefill">Spacefill</option>
                        <option value="licorice">Licorice</option>
                    </select>
                </label>
            </div>

            <div ref={viewerRef} className="picProt thin"/>

            {clickedAtom && (
                <div className="blocScore thin atom">
                    <strong>Atome sélectionné:</strong><br/>
                    Chaîne: {clickedAtom.chain}<br/>
                    Résidu: {clickedAtom.resname} {clickedAtom.resno}<br/>
                    Atome: {clickedAtom.atomname}
                </div>
            )}
        </div>
    );
};

export default ProteinViewer;


