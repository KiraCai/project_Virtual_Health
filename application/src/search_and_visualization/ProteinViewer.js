// ProteinViewer.jsx
import React, { useEffect, useRef } from 'react';
import { Stage } from 'ngl';


const ProteinViewer = ({ pdbId }) => {

    const viewerRef = useRef(null);
    const stageRef = useRef(null);

    useEffect(() => {
        if (!pdbId || !viewerRef.current) return;

        // for update
        if (stageRef.current) {
            stageRef.current.removeAllComponents();
        } else {
            stageRef.current = new Stage(viewerRef.current);
        }

        stageRef.current.loadFile(`rcsb://${pdbId}`, { defaultRepresentation: true });

        return () => {
            if (stageRef.current) {
                stageRef.current.removeAllComponents();
            }
        };
    }, [pdbId]);

    return <div ref={viewerRef} style={{ width: '500px', height: '500px' }} />;
};

export default ProteinViewer;
