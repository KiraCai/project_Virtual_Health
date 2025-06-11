import React, { useEffect, useRef } from 'react';
import { Stage } from 'ngl';

const ProteinViewer = ({ pdbId, variants = [], highlightPos, showAll }) => {
    const viewerRef = useRef(null);
    const stageRef = useRef(null);

    useEffect(() => {
        if (!pdbId || !viewerRef.current) return;

        if (!stageRef.current) {
            stageRef.current = new Stage(viewerRef.current);
        } else {
            stageRef.current.removeAllComponents();
        }

        stageRef.current.loadFile(`https://files.rcsb.org/download/${pdbId}.pdb`, {
            defaultRepresentation: true
        }).then(component => {
            component.addRepresentation('cartoon', { color: 'skyblue' });

            if (showAll && variants.length > 0) {
                // Подсветить все позиции
                const positions = variants.map(v => v.begin).join(',');
                component.addRepresentation('spacefill', {
                    color: 'red',
                    sele: positions
                });
            } else if (highlightPos) {
                // Подсветить одну мутацию
                component.addRepresentation('spacefill', {
                    color: 'orange',
                    sele: `${highlightPos}`
                });
            }

            stageRef.current.autoView();
        });

        return () => {
            if (stageRef.current) {
                stageRef.current.removeAllComponents();
            }
        };

    }, [pdbId, highlightPos, showAll, variants]);

    return <div ref={viewerRef} style={{ width: '500px', height: '500px' }} />;
};

export default ProteinViewer;
