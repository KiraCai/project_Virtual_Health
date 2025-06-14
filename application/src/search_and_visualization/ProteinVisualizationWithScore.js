import React, { useState, useEffect, useMemo } from 'react';
import ProteinViewer from './ProteinViewer';
import { calculateConservationMutationCorrelationScore } from './utils';

const extractPositionsByImpact = (variants, keyword) => {
    return variants
        .filter(v =>
            Array.isArray(v.descriptions) &&
            v.descriptions.some(d => d.value?.toUpperCase().includes(keyword))
        )
        .map(v => parseInt(v.begin, 10))
        .filter(Number.isInteger);
};

const ProteinVisualizationWithScore = ({ protein, pathogenic }) => {

    console.log(pathogenic);
    const allPositions = useMemo(() =>
        (pathogenic || [])
            .map(v => parseInt(v.begin, 10))
            .filter(Number.isInteger), [pathogenic]
    );

    console.log("позиции чистые для всех видов мутаций")
    console.log(allPositions)

    const moderatePositions = useMemo(() =>
        extractPositionsByImpact(pathogenic, 'MODERATE'), [pathogenic]
    );
    console.log("позиции средних для всех видов мутаций")
    console.log(moderatePositions)

    const highPositions = useMemo(() =>
        extractPositionsByImpact(pathogenic, 'HIGH'), [pathogenic]
    );
    console.log("позиции высоких для всех видов мутаций")
    console.log(highPositions)

    const resultAll = useMemo(() =>
            calculateConservationMutationCorrelationScore(protein.shannonEntropy || {}, allPositions),
        [protein.shannonEntropy, allPositions]
    );

    const resultModerate = useMemo(() =>
            calculateConservationMutationCorrelationScore(protein.shannonEntropy || {}, moderatePositions),
        [protein.shannonEntropy, moderatePositions]
    );

    const resultHigh = useMemo(() =>
            calculateConservationMutationCorrelationScore(protein.shannonEntropy || {}, highPositions),
        [protein.shannonEntropy, highPositions]
    );


    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={boxStyle}>
                <h4> Все патогенные мутации</h4>
                <ScoreResult result={resultAll} />
            </div>
            <div style={boxStyle}>
                <h4>🧪 MODERATE impact</h4>
                <ScoreResult result={resultModerate} />
            </div>
            <div style={boxStyle}>
                <h4>🔥 HIGH impact</h4>
                <ScoreResult result={resultHigh} />
            </div>
        </div>
    );
};

const ScoreResult = ({ result }) => (
    <>
        <p><strong>Средняя энтропия (всего):</strong> {result.averageAllEntropy.toFixed(3)}</p>
        <p><strong>Средняя энтропия (патогенные):</strong> {result.averagePathogenicEntropy.toFixed(3)}</p>
        <p><strong>Скор (разница):</strong> {result.score.toFixed(3)}</p>
        <p><small>Мутаций учтено: {result.usedPathogenicCount} из {result.totalPathogenicCount}</small></p>
    </>
);

const boxStyle = {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '1rem',
    backgroundColor: '#f9f9f9',
    maxWidth: '500px'
};

export default ProteinVisualizationWithScore;
