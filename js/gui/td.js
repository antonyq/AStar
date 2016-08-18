function Td (id, className) {
	const instance = document.createElement('td');
	instance.setAttribute('id', id);
    instance.className = className;
    return instance;
}