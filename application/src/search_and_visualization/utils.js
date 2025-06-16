//Sans tenir compte de la répétition des mutations dans les positions (pondération linéaire).
export function calculateConservationMutationCorrelationScore(shannonEntropy, pathogenicPositions) {
    const allPositions = Object.keys(shannonEntropy).map(Number);

    const allEntropies = allPositions
        .map(pos => shannonEntropy[pos])
        .filter(e => typeof e === 'number');

    const pathogenicEntropies = pathogenicPositions
        .map(pos => shannonEntropy[pos])
        .filter(e => typeof e === 'number');

    const avg = arr => arr.length === 0 ? 0 : arr.reduce((a, b) => a + b, 0) / arr.length;

    return {
        averageAllEntropy: avg(allEntropies),
        averagePathogenicEntropy: avg(pathogenicEntropies),
        score: avg(allEntropies) - avg(pathogenicEntropies),
        usedPathogenicCount: pathogenicEntropies.length,
        totalPathogenicCount: pathogenicPositions.length,
    };
}

// Fonction de calcul du poids des positions avec logarithme
export function calculateWeightedPathogenicScore(shannonEntropy, pathogenicPositions) {
    const allPositions = Object.keys(shannonEntropy).map(Number);

    const allEntropies = allPositions
        .map(pos => shannonEntropy[pos])
        .filter(e => typeof e === 'number');

    const avg = arr => arr.length === 0 ? 0 : arr.reduce((a, b) => a + b, 0) / arr.length;

    // Nombre de mutations à chaque position
    const positionCounts = {};
    pathogenicPositions.forEach(pos => {
        if (!Number.isInteger(pos)) return;
        positionCounts[pos] = (positionCounts[pos] || 0) + 1;
    });

    // Entropies pondérées : logarithme du nombre de mutations à une position
    const weightedEntropies = [];
    let totalWeight = 0;

    for (const [posStr, count] of Object.entries(positionCounts)) {
        const pos = parseInt(posStr, 10);
        const entropy = shannonEntropy[pos];

        if (typeof entropy === 'number') {
            const weight = Math.log2(1 + count); // pondération logarithmique
            weightedEntropies.push(entropy * weight);
            totalWeight += weight;
        }
    }

    const weightedAvgPathogenicEntropy =
        totalWeight > 0 ? weightedEntropies.reduce((a, b) => a + b, 0) / totalWeight : 0;

    return {
        averageAllEntropy: avg(allEntropies),
        averagePathogenicEntropy: weightedAvgPathogenicEntropy,
        score: avg(allEntropies) - weightedAvgPathogenicEntropy,
        usedPathogenicCount: Object.keys(positionCounts).length,
        totalPathogenicCount: pathogenicPositions.length
    };
}
