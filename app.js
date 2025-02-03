// Array to store friends
let amigos = [];

// Function to render friends list
function renderizarListaAmigos() {
    const listaAmigos = document.getElementById('listaAmigos');
    
    // Clear existing list
    listaAmigos.innerHTML = '';
    
    // Iterate through friends and create list items
    for (let i = 0; i < amigos.length; i++) {
        const li = document.createElement('li');
        li.innerHTML = `
            ${amigos[i]} 
            <button onclick="eliminarAmigo('${amigos[i]}')" class="delete-btn">✖</button>
        `;
        listaAmigos.appendChild(li);
    }
}

// Function to add a friend
function agregarAmigo() {
    const inputAmigo = document.getElementById('amigo');
    const nombreAmigo = inputAmigo.value.trim();
    const resultado = document.getElementById('resultado');

    // Validate input
    if (!nombreAmigo) {
        alert("Por favor, inserte un nombre.");
        return;
    }

    // Check for duplicates
    if (amigos.includes(nombreAmigo)) {
        alert("Este nombre ya ha sido agregado.");
        inputAmigo.value = '';
        return;
    }

    // Add friend to array
    amigos.push(nombreAmigo);

    // Render updated list
    renderizarListaAmigos();

    // Clear input
    inputAmigo.value = '';

    // Clear previous results
    resultado.innerHTML = '';
}

// Function to delete a friend
function eliminarAmigo(nombre) {
    const resultado = document.getElementById('resultado');

    // Remove from array
    amigos = amigos.filter(amigo => amigo !== nombre);

    // Render updated list
    renderizarListaAmigos();

    // Clear previous results
    resultado.innerHTML = '';
}

// Function to draw secret friends
function sortearAmigo() {
    const resultado = document.getElementById('resultado');

    // Validate that there are friends
    if (amigos.length === 0) {
        alert("No hay amigos para sortear. Agregue amigos primero.");
        return;
    }

    // Validate number of friends for drawing
    if (amigos.length < 3) {
        alert("Debe agregar al menos 3 amigos para sortear.");
        return;
    }

    // Generate random index
    const indiceAleatorio = Math.floor(Math.random() * amigos.length);
    
    // Get randomly selected friend
    const amigoSorteado = amigos[indiceAleatorio];

    // Show result
    resultado.innerHTML = `<li>Amigo sorteado: ${amigoSorteado}</li>`;
}