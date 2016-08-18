const SQRT2 = Math.sqrt(2);

window.onload = () => {
	const REQUEST = [
		{ text: "Количество вершин: ", default: 225 },
		{ text: "Вероятность существования ребра: ", default: 0.5 } 
	];
	const response = Interface.startPromptSet(REQUEST); 
	const vertexCount = response[0];
	const edgeProbability = response[1];

	const graph = new Graph(vertexCount, edgeProbability);
	graph.constructors.initAdjacencyMatrix();

	const container = Container('container');
	const table = new Table(graph, 'table', 'container');
	table.init();
	
	const path = graph.algorithms.AStar();
	if (path instanceof Error) window.location.reload();
	else table.drawPath(path);
}

// TODO
 
// Lee algorithm
// AStar algorithm stable
// GUI grade : node numbers, start/finish by click, go button

// BUGS

// one extremal node appearance
// diagonal path priority