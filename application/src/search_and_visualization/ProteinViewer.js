// ProteinViewer.jsx
import React, { useEffect } from 'react';
import { Stage } from 'ngl';

const ProteinViewer = ({ pdbId }) => {
    useEffect(() => {
        if (!pdbId) return;

        const stage = new Stage("nglViewer");
        stage.loadFile(`rcsb://${pdbId}`, { defaultRepresentation: true });
    }, [pdbId]);

    return <div id="nglViewer" style={{ width: '500px', height: '500px' }} />;
};

export default ProteinViewer;
