var Distance = {
	manhattan: (point1, point2) => Math.abs(point1.position.x - point2.position.x) + Math.abs(point1.position.y - point2.position.y),
	chebyshev: (point1, point2) => Math.max(Math.abs(point1.position.x - point2.position.x), Math.abs(point1.position.y - point2.position.y)),
	euclid: (point1, point2) => Math.sqrt(Math.pow((point1.position.x - point2.position.x), 2) + Math.pow((point1.position.y - point2.position.y), 2)) 
}