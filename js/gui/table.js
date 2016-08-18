function Table (maze, id, parentId=document.getElementById('container')) {
	this.parent = document.getElementById(parentId);
	this.cellsCount = maze.properties.size;
	this.recordsCount = Math.sqrt(maze.properties.size);

	this.init = () => {
		let td = null;
		let tr = null;
		const table = document.createElement('table');
		table.setAttribute('id', id);
		for (let i = 0; i < this.recordsCount; i++) {
			tr = document.createElement('tr');
			for (let j = 0; j < this.recordsCount; j++) {
				if (maze.properties.maze[i][j] instanceof Node) {
					td = new Td(i + '_' + j, 'cell', tr);
					if (maze.properties.startNode == maze.properties.maze[i][j]) td.classList.add('startCell');
					if (maze.properties.finishNode == maze.properties.maze[i][j]) td.classList.add('finishCell');
					tr.appendChild(td);
				}
				else tr.appendChild(new Td(i + '_' + j, 'empty', tr));
			}
			table.appendChild(tr);
		}
	    this.parent.appendChild(table);
	}

	this.drawPath = (path) => {
		try {
			for (let i = 0; i < path.length; i++) setTimeout(() => document.getElementById(path[i].position.y + '_' + path[i].position.x).classList.add('closeCell'), i * 500);
		} catch (error) {
			return new Error('EmptyPathException');
		}
	}
}