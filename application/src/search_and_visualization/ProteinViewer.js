import React, {useEffect, useRef, useState} from 'react';
import {Stage} from 'ngl';
import axios from 'axios';

const ProteinViewer = ({pdbId, chainId, uniprotId, variants = [], highlightPos = [], showAll}) => {
    const viewerRef = useRef(null);
    const stageRef = useRef(null);
    const [mappedPositions, setMappedPositions] = useState([]);
    const [representationType, setRepresentationType] = useState('cartoon'); //  Тип представления
    const [clickedAtom, setClickedAtom] = useState(null); //  Состояние выбранного атома


    useEffect(() => {
        console.log("начало")
        if (!pdbId) return;
        // Загрузка UniProt-PDB маппинга (SIFTS)
        const fetchMapping = async () => {
            try {
                const {data} = await axios.get(`https://www.ebi.ac.uk/pdbe/api/mappings/uniprot/${pdbId.toLowerCase()}`);
                console.log("Весь маппинг:", data[pdbId.toLowerCase()]);
                const entry = data?.[pdbId.toLowerCase()]?.UniProt?.[uniprotId];
                if (!entry) {
                    console.warn("UniProt ID", uniprotId, "не найден в маппинге");
                    return;
                }
                const chains = Array.isArray(chainId) ? chainId : [chainId]; // <-- Вот это строка
                const allMapped = [];

                console.log(" Все маппинги:", entry.mappings);
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

                console.log("Проверка: какие позиции покрыты");
                console.log("highlightPos:", highlightPos);
                console.log("mappedPositions (локально):", allMapped);

                const missingPositions = variants
                    .map(v => v.begin)
                    .filter(pos => {
                        return !allMapped.some(m =>
                            pos >= m.uniprotPos &&
                            pos <= m.uniprotPos + (m.pdbEnd - m.pdbStart)
                        );
                    });

                if (missingPositions.length > 0) {
                    console.warn('Эти UniProt-позиции отсутствуют в PDB:', missingPositions);
                } else {
                    console.log('Все UniProt-позиции покрыты маппингом.');
                }

            } catch (err) {
                console.error('Ошибка при загрузке UniProt↔PDB маппинга:', err);
            }
        };
        fetchMapping();
    }, [pdbId, chainId]);

    useEffect(() => {
        console.log("useEffect для подсветки сработал");
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
            component.addRepresentation('cartoon', { color: 'skyblue' });

            // Очищаем старый обработчик, чтобы не дублировался
            stageRef.current.signals.clicked.removeAll();
            stageRef.current.signals.clicked.add(pickingProxy => {
                if (!pickingProxy || !pickingProxy.atom) {
                    console.log("Клик не по атому");
                    return;
                }
                const atom = pickingProxy.atom;
                const chain = atom.chainname;
                const resno = atom.resno;
                const resname = atom.resname;
                const atomname = atom.atomname;
                setClickedAtom({ chain, resno, resname, atomname });
                if (chain && resno) {
                    console.log(`Клик по атому: цепь ${chain}, остаток ${atom.resname} ${resno}`);

                    try {
                        component.addRepresentation('spacefill', {
                            sele: `${chain}:${resno}`,
                            color: 'orange'
                        });
                        stageRef.current.autoView();
                    } catch (e) {
                        console.error("Ошибка при подсветке выбранного атома:", e);
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

                console.log("Позиции UniProt:", positions);
                console.log("Mapped positions:", mappedPositions);
                console.log("PDB позиции для подсветки:", pdbPositions);

                const unique = [...new Set(pdbPositions.map(({ chain, pos }) => `${chain}:${pos}`))];

                // БЕРЕМ ПЕРВУЮ ПОЗИЦИЮ для примера
                if (pdbPositions.length > 0) {
                    const { chain, pos } = pdbPositions[0];
                    const selection = `${pos}`;
                    console.log("Будем подсвечивать (только одну):", selection);

                    component.addRepresentation('spacefill', {
                        sele: selection,
                        color: 'yellow',
                    });

                    stageRef.current.autoView(selection);
                } else {
                    console.warn('Нет подходящих позиций для подсветки');
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

        const component = stage.compList[0]; // первый загруженный компонент
        if (!component) return;

        component.removeAllRepresentations(); // удалить старые
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

        const unique = [...new Set(pdbPositions.map(({ chain, pos }) => `${chain}:${pos}`))];

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
            <div style={{ marginBottom: '10px' }}>
                <label>Тип представления:&nbsp;
                    <select value={representationType} onChange={(e) => setRepresentationType(e.target.value)}>
                        <option value="cartoon">Ленточное (cartoon)</option>
                        <option value="ball+stick">Шаростержневое (ball+stick)</option>
                        <option value="surface">Поверхность (surface)</option>
                        <option value="spacefill">Пространственное (spacefill)</option>
                        <option value="licorice">Лицорис (licorice)</option>
                    </select>
                </label>
            </div>

            <div ref={viewerRef} style={{ width: '500px', height: '500px', border: '1px solid #ccc' }} />

            {clickedAtom && (
                <div style={{ marginTop: '10px', background: '#f7f7f7', padding: '10px', borderRadius: '6px' }}>
                    <strong>Выбранный атом:</strong><br />
                    Цепь: {clickedAtom.chain}<br />
                    Остаток: {clickedAtom.resname} {clickedAtom.resno}<br />
                    Атом: {clickedAtom.atomname}
                </div>
            )}
        </div>
    );
};

export default ProteinViewer;


