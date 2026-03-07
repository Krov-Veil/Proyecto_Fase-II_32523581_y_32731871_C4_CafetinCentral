document.getElementById('loginBtn').addEventListener('click', function() {
    const user = document.getElementById('userInput').value;
    const pass = document.getElementById('passInput').value;
    const error = document.getElementById('errorMessage');

    // Limpiar mensaje de error
    error.style.display = "none";

    // Caso Cliente
    if (user === "ClienteUCV" && pass === "Central_123") {
        alert("¡Bienvenido, Cliente! Redirigiendo al Menú...");
        // sale de login, entra a la carpeta cliente y busca el index.html
        window.location.href = "../cliente/index.html"; 
    } 
    // Caso Caja
    else if (user === "caja_01" && pass === "Cajero#123") {
        alert("Acceso Personal de Caja. Cargando Sistema de Ventas");
        // sale de login, entra a la carpeta caja y busca el index.html
        window.location.href = "../caja/index.html";
    } 
    // Caso Administrador
    else if (user === "adminRoot" && pass === "cafetinAdmin") {
        alert("Acceso Administrador. Entrando al Panel de Control");
        // sale de login, entra a la carpeta admin y busca el index.html
        window.location.href = "../admin/index.html";
    } 
    else {
        error.style.display = "block";
    }
});