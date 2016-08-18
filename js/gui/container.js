function Container (id, parent=document.body) {
	const instance = document.createElement('div');
    instance.setAttribute('id', id);
    parent.appendChild(instance);
    return instance;
}