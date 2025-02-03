// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.
// Array to store friends
let amigos = [];

// Function to add a friend
function agregarAmigo() {
    const inputAmigo = document.getElementById('amigo');
    const nombreAmigo = inputAmigo.value.trim();
    const listaAmigos = document.getElementById('listaAmigos');
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

    // Create list item with delete button
    const li = document.createElement('li');
    li.innerHTML = `
        ${nombreAmigo} 
        <button onclick="eliminarAmigo('${nombreAmigo}')" class="delete-btn">✖</button>
    `;
    listaAmigos.appendChild(li);

    // Clear input
    inputAmigo.value = '';

    // Clear previous results
    resultado.innerHTML = '';
}

// Function to delete a friend
function eliminarAmigo(nombre) {
    const listaAmigos = document.getElementById('listaAmigos');
    const resultado = document.getElementById('resultado');

    // Remove from array
    amigos = amigos.filter(amigo => amigo !== nombre);

    // Remove from DOM
    listaAmigos.innerHTML = '';
    amigos.forEach(amigo => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${amigo} 
            <button onclick="eliminarAmigo('${amigo}')" class="delete-btn">✖</button>
        `;
        listaAmigos.appendChild(li);
    });

    // Clear previous results
    resultado.innerHTML = '';
}

// Function to draw secret friends
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