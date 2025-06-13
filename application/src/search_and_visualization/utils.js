export function calculateConservationMutationCorrelationScore(shannonEntropy, pathogenicPositions) {
    const allPositions = Object.keys(shannonEntropy).map(Number);

    // Если передан mappedPositions, фильтруем только покрытые позиции
    /*const coveredPositionsSet = mappedPositions
        ? new Set(mappedPositions.flatMap(mapping => {
            const range = [];
            for (let i = 0; i <= (mapping.pdbEnd - mapping.pdbStart); i++) {
                range.push(mapping.uniprotPos + i);
            }
            return range;
        }))
        : null;

    const filteredAllPositions = coveredPositionsSet
        ? allPositions.filter(pos => coveredPositionsSet.has(pos))
        : allPositions;

    const filteredPathogenicPositions = coveredPositionsSet
        ? pathogenicPositions.filter(pos => coveredPositionsSet.has(pos))
        : pathogenicPositions;*/

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