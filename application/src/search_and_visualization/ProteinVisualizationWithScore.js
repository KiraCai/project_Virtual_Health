import React, { useState, useEffect, useMemo } from 'react';
import ProteinViewer from './ProteinViewer';
import { calculateConservationMutationCorrelationScore } from './utils';

const ProteinVisualizationWithScore = ({ protein, pathogenic }) => {
    console.log("внутри скора")
    console.log(pathogenic);
    const pathogenicPositions = useMemo(() =>
            (pathogenic || [])
                .map(v => parseInt(v.begin, 10))
                .filter(Number.isInteger),
        [pathogenic]
    );
    console.log("позиции чистые")
    console.log(pathogenicPositions)
    const correlationResult = useMemo(() =>
        calculateConservationMutationCorrelationScore(
            protein.shannonEntropy || {},
            pathogenicPositions
        ), [protein.shannonEntropy, pathogenicPositions]
    );

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '1rem',
                backgroundColor: '#f9f9f9',
                maxWidth: '500px'
            }}>
                <h4>🧠 Консервативность vs. Патогенные мутации</h4>
                <p><strong>Средняя энтропия (всего):</strong> {correlationResult.averageAllEntropy.toFixed(3)}</p>
                <p><strong>Средняя энтропия (патогенные):</strong> {correlationResult.averagePathogenicEntropy.toFixed(3)}</p>
                <p><strong>Скор (разница):</strong> {correlationResult.score.toFixed(3)}</p>
                <p><small>Мутаций учтено: {correlationResult.usedPathogenicCount} из {correlationResult.totalPathogenicCount}</small></p>
            </div>
        </div>
    );
};

export default ProteinVisualizationWithScore;
