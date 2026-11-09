document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search');
    const clientsList = document.getElementById('clients-list');

    function renderClients(clients) {
        if (!clientsList) {
            return;
        }

        clientsList.textContent = '';

        if (!Array.isArray(clients) || clients.length === 0) {
            const emptyMsg = document.createElement('p');
            emptyMsg.textContent = 'Aucun client trouvé.';
            clientsList.appendChild(emptyMsg);
            return;
        }

        const ul = document.createElement('ul');
        ul.className = 'clients-container';

        clients.forEach((client) => {
            const li = document.createElement('li');
            li.className = 'client-card';

            const nameEl = document.createElement('strong');
            nameEl.textContent = client.name || '';

            const emailEl = document.createElement('span');
            emailEl.textContent = client.email ? ` - ${client.email}` : '';

            li.appendChild(nameEl);
            li.appendChild(emailEl);
            ul.appendChild(li);
        });

        clientsList.appendChild(ul);
    }

    async function fetchClients(query = '') {
        try {
            const response = await fetch(`php/clients.php?search=${encodeURIComponent(query)}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const clients = await response.json();
            renderClients(clients);
        } catch (error) {
            if (clientsList) {
                clientsList.textContent = 'Erreur lors du chargement des données.';
            }
        }
    }

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const target = e.target;
            if (target instanceof HTMLInputElement) {
                fetchClients(target.value);
            }
        });
    }

    fetchClients();
});