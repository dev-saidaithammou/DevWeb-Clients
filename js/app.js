// Function to load and render clients list
function renderClients(clients) {
    const container = document.getElementById('client-list');
    if (!container) return;
    
    container.innerHTML = '';
    clients.forEach(client => {
        const item = document.createElement('div');
        item.className = 'client-item';
        item.textContent = `${client.nom} - ${client.email}`;
        container.appendChild(item);
    });
}