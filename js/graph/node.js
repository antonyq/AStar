function Node (x, y, nodesCount, number) {
	this.properties = {
        neighbors: null,
        isDiagonalNeighbor: null,
        parent: null,
        f: null,
        h: null,
        g: 0
    },

    this.position = {
        x: x,
        y: y,
        
        top: (y == 0) ? true : false,
        bottom: (y == Math.sqrt(nodesCount)) ? true : false,
        left: (x == 0) ? true : false,
        right: (x == Math.sqrt(nodesCount)) ? true : false,
        leftTopAngle: (this.left && this.top) ? true : false,
        rightTopAngle: (this.right && this.top) ? true : false,
        leftBottomAngle: (this.left && this.bottom) ? true : false,
        rightBottomAngle: (this.right && this.bottom) ? true : false,
    },

    this.number = {
        serialNumber: number,
        positionalNumber: Math.sqrt(nodesCount) * this.position.y + this.position.x    
    }
}