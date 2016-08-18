function SquareMatrix (dimension, defaultValue) {
	const matrix = new Array(dimension);
    for (let i = 0; i < dimension; i++) {
        matrix[i] = new Array(dimension);
        for (let j = 0; j < dimension; j++) matrix[i][j] = defaultValue;
    }
    return matrix;
}