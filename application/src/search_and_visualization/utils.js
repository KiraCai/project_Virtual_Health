export function calculateConservationMutationCorrelationScore(shannonEntropy, pathogenicPositions) {
    const allPositions = Object.keys(shannonEntropy).map(Number);

    const allEntropies = allPositions
        .map(pos => shannonEntropy[pos])
        .filter(e => typeof e === 'number');

    const pathogenicEntropies = pathogenicPositions
        .map(pos => shannonEntropy[pos])
        .filter(e => typeof e === 'number');

    const avg = arr => arr.reduce((a, b) => a + b, 0) / (arr.length || 1);

    return {
        averageAllEntropy: avg(allEntropies),
        averagePathogenicEntropy: avg(pathogenicEntropies),
        score: avg(allEntropies) - avg(pathogenicEntropies), // >0 — мутации в консервативных участках
        //coveredPositions: coveredPositionsSet ? [...coveredPositionsSet] : null,
        usedPathogenicCount: pathogenicEntropies.length,
        totalPathogenicCount: pathogenicPositions.length,
    };
}