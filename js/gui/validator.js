var Validator = {
	isProbability: (probability) => (parseFloat(probability) != NaN) && !isNaN(probability) && probability >= 0 && probability <= 1,
	isNaturalNumber: (number) => (parseInt(number) != NaN) && !isNaN(number) && number >= 0,
	isPerfectSquare: (number) => (parseInt(number) != NaN) && !isNaN(number) && number >= 0 && (parseInt(Math.sqrt(number)) != NaN)  
}