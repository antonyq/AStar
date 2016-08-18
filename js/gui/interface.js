var Interface = {
	startPromptSet: (request) => {
		const data = request.map((record) => prompt(record.text, record.default)).map((record) => parseFloat(record));
		if (!Validator.isPerfectSquare(data[0]) || !Validator.isProbability(data[1])) window.location.reload();
		else return data;
	}
}
