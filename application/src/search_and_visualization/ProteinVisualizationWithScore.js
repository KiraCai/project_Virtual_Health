import React, {useState, useEffect} from 'react';
import {
    calculateConservationMutationCorrelationScore, calculateLinearlyWeightedPathogenicScore,
    calculateWeightedPathogenicScore
} from './utils';

const extractPositionsByImpact = (variants, keyword) => {
    return variants
        .filter(v =>
            Array.isArray(v.descriptions) &&
            v.descriptions.some(d => d.value?.toUpperCase().includes(keyword))
        )
        .map(v => parseInt(v.begin, 10))
        .filter(Number.isInteger);
};

const ProteinVisualizationWithScore = ({protein, pathogenic}) => {
    const emptyScore = {
        averageAllEntropy: 0,
        averagePathogenicEntropy: 0,
        score: 0,
        usedPathogenicCount: 0,
        totalPathogenicCount: 0
    };
    const allPositions = (pathogenic || [])
        .map(v => parseInt(v.begin, 10))
        .filter(Number.isInteger);

    const moderatePositions = extractPositionsByImpact(pathogenic, 'MODERATE');
    const highPositions = extractPositionsByImpact(pathogenic, 'HIGH');

    const resultAll = protein && protein.shannonEntropy
        ? calculateConservationMutationCorrelationScore(protein.shannonEntropy, allPositions)
        : emptyScore;

    const resultModerate = protein && protein.shannonEntropy
        ? calculateConservationMutationCorrelationScore(protein.shannonEntropy, moderatePositions)
        : emptyScore;

    const resultHigh = protein && protein.shannonEntropy
        ? calculateConservationMutationCorrelationScore(protein.shannonEntropy, highPositions)
        : emptyScore;

    const resultWeighted = protein && protein.shannonEntropy
        ? calculateWeightedPathogenicScore(protein.shannonEntropy, allPositions)
        : emptyScore;

    const resultWeightedModerate = protein && protein.shannonEntropy
        ? calculateWeightedPathogenicScore(protein.shannonEntropy, moderatePositions)
        : emptyScore;

    const resultWeightedHigh = protein && protein.shannonEntropy
        ? calculateWeightedPathogenicScore(protein.shannonEntropy, highPositions)
        : emptyScore;

    return (
        <div className="resultScore">
            <div className="blocScore thin btn buttonStyleDark">
                <h4> Toutes les mutations pathogènes</h4>
                <ScoreResult result={resultAll}/>
            </div>
            <div className="blocScore thin btn buttonStyleDark">
                <h4>Score pondéré (avec logarithme)</h4>
                <ScoreResult result={resultWeighted}/>
            </div>

            <div className="blocScore thin btn buttonStyleDark">
                <h4>Mutations à influence "MODERATE"</h4>
                <ScoreResult result={resultModerate}/>
            </div>
            <div className="blocScore thin btn buttonStyleDark">
                <h4>Score pondéré pour "MODERATE"</h4>
                <ScoreResult result={resultWeightedModerate}/>
            </div>
            <div className="blocScore thin btn buttonStyleDark">
                <h4>Mutations à influence pour "HIGH"</h4>
                <ScoreResult result={resultHigh}/>
            </div>
            <div className="blocScore thin btn buttonStyleDark">
                <h4>Score pondéré pour "HIGH"</h4>
                <ScoreResult result={resultWeightedHigh}/>
            </div>


        </div>
    );
};

const ScoreResult = ({result}) => (
    <div>
        <p><strong>Entropie moyenne (totale): </strong> {result.averageAllEntropy.toFixed(3)}</p>
        <p><strong>Entropie moyenne (pathogène): </strong> {result.averagePathogenicEntropy.toFixed(3)}</p>
        <p><strong>Score (différence): </strong> {result.score.toFixed(3)}</p>
        <p><small>Mutations prises en compte: {result.usedPathogenicCount} из {result.totalPathogenicCount}</small></p>
    </div>
);

export default ProteinVisualizationWithScore;



