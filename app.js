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

// Function to draw secret friends (previous implementation remains the same)
function sortearAmigo() {
    const resultado = document.getElementById('resultado');

    // Validate number of friends
    if (amigos.length < 3) {
        alert("Debe agregar al menos 3 amigos para sortear.");
        return;
    }

    // Shuffle algorithm (Fisher-Yates)
    const amigosBarajados = [...amigos];
    for (let i = amigosBarajados.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [amigosBarajados[i], amigosBarajados[j]] = [amigosBarajados[j], amigosBarajados[i]];
    }

    // Ensure no one gets themselves
    const amigosSecretos = amigosBarajados.map((amigo, index) => {
        return amigo === amigos[index] ? amigosBarajados[(index + 1) % amigos.length] : amigo;
    });

    // Display results
    resultado.innerHTML = amigos.map((amigo, index) => 
        `<li>${amigo} → ${amigosSecretos[index]}</li>`
    ).join('');
}