    function Graph (size=225, edgeProbability=0.5) {
    this.properties = {
        size: size,
        adjacencyMatrix: SquareMatrix(size, Infinity),
        maze: SquareMatrix(Math.sqrt(size), null),
        startNode: null,
        finishNode: null
    }

    this.exceptions = {
        NonExistentNodeException: new Error('NonExistentNodeException')
    }

    this.constructors = {
        initMaze: () => {
            let number = 0;
            let node = null;
            let nodeBySerialNumberArray = [];
            const sqrtSize = Math.sqrt(this.properties.size);
            for (let i = 0; i < sqrtSize; i++) {
                for (let j = 0; j < sqrtSize; j++) {
                    if (Math.random() < edgeProbability) {
                        node = new Node(j, i, this.properties.size, number++);
                        this.properties.maze[i][j] = node;
                        nodeBySerialNumberArray[node.number.serialNumber] = node;
                    }   
                    else this.properties.maze[i][j] = null;
                }
            }
            this.properties.startNode = nodeBySerialNumberArray[Math.ceil(number * Math.random())];
            this.properties.finishNode = nodeBySerialNumberArray[Math.ceil(number * Math.random())];
            do this.properties.finishNode = nodeBySerialNumberArray[Math.ceil(1 + number * Math.random())];
            while (this.properties.finishNode.number.positionalNumber == this.properties.startNode.number.positionalNumber); 
        },

        initAdjacencyMatrix: () => {
            this.constructors.initMaze();
            const sqrtSize = Math.sqrt(this.properties.size);
            let node = neighbors = null;
            for (let i = 0; i < sqrtSize; i++) {
                for (let j = 0; j < sqrtSize; j++) {
                    if (this.properties.maze[i][j] != null) { 
                        this.properties.adjacencyMatrix[j][j] = Infinity;
                        node = this.properties.maze[i][j];
                        node.properties.neighbors = this.methods.findNeighbors(node);
                        let neighbors = node.properties.neighbors;
                        for (neighbor of neighbors) this.properties.adjacencyMatrix[node.number.serialNumber][neighbor.number.serialNumber] = 1;
                    }
                }
            }
        }
    }

    this.methods = {
        findNeighbors: (node) => {
            if (node == null) throw this.exceptions.NonExistentNodeException;
            let neighbors = [];
            let x = node.position.x;
            let y = node.position.y;
            for (let i = y - 1; i <= y + 1; i++) {
                for (let j = x - 1; j <= x + 1; j++) {
                    try {
                        if (this.properties.maze[i][j] == null) continue;
                        else if (i != y || j != x) {
                            if (i != y && j != x) this.properties.maze[i][j].properties.isDiagonalNeighbor = [true, node];
                            else this.properties.maze[i][j].properties.isDiagonalNeighbor = [false, node];
                            neighbors.push(this.properties.maze[i][j]);
                        }
                    } finally {
                        continue;
                    }
                }
            }
            return neighbors;
        },

        minObjectByProperty: (array, namespace, property) => {
            let minoranta = [Infinity, null];
            for (item of array) if (eval(item[namespace][property]) < minoranta[0] && item[namespace].hasOwnProperty(property.toString()))  minoranta = [eval(item[namespace][property]), item];
            return minoranta[1] 
        }
    }    

    this.algorithms = {
        AStar: () => {
            try {
                const start = this.properties.startNode; 
                const finish = this.properties.finishNode;
                let current = this.properties.startNode;
                let closed = [];
                let opened = [];
                let neighbors = null;
                let estimation = null;
                opened.push(start);

                while (opened.indexOf(finish) == -1 || opened.length == 0 || current != finish) {
                    estimation = Infinity;
                    current = this.methods.minObjectByProperty(opened, 'properties', 'f');
                    opened.splice(opened.indexOf(current), 1);
                    closed.push(current);
                    neighbors = this.methods.findNeighbors(current).filter((neighbor) => (closed.indexOf(neighbor) != -1) ? false : true);
                    neighbors.forEach((neighbor) => {
                        if (opened.indexOf(neighbor) == -1) {
                            opened.push(neighbor);
                            neighbor.properties.parent = current;
                            neighbor.properties.g += (neighbor.properties.isDiagonalNeighbor[0] && neighbor.properties.isDiagonalNeighbor[1] == neighbor.properties.parent) ? SQRT2 : 1;
                            neighbor.properties.h = Distance.manhattan(neighbor, finish);
                            neighbor.properties.f = neighbor.properties.g + neighbor.properties.h;   
                        } else {
                            // if (Distance.manhattan(current.properties.parent, current) + Distance.manhattan(current, neighbor) > neighbor.properties.g) {
                            //     neighbor.properties.parent = current;
                            //     closed.push(current);
                            //     opened.splice(opened.indexOf(current), 1);
                            //     current = neighbor;
                            // }
                        } 
                    });
                    estimation = Infinity;
                    for (node of opened) {
                        if (node.properties.f < estimation) {
                            estimation = node.properties.f;
                            current = node;
                        }
                    }
                }
                let path = [];
                while (current != start) {
                    path.push(current);
                    current = current.properties.parent;
                }
                path = path.reverse();
                path.pop();
                return path;
            } catch (error) {
                alert('Path not found');
                return error;
            } 
        }
    }
}