document.getElementById('loginBtn').addEventListener('click', function() {
    const user = document.getElementById('userInput').value;
    const pass = document.getElementById('passInput').value;
    const error = document.getElementById('errorMessage');

    // Limpiar mensaje de error
    error.style.display = "none";

    // 1. Caso Cliente
    if (user === "ClienteUCV" && pass === "Central_123") {
        alert("¡Bienvenido, Cliente! Redirigiendo al Menú...");
        // SALE de login, ENTRA a la carpeta cliente y busca el index.html
        window.location.href = "../cliente/index.html"; 
    } 
    // 2. Caso Cajero
    else if (user === "caja_01" && pass === "Cajero#123") {
        alert("Acceso Personal de Caja. Cargando Sistema de Ventas");
        // SALE de login, ENTRA a la carpeta caja y busca el index.html
        window.location.href = "../caja/index.html";
    } 
    // 3. Caso Administrador
    else if (user === "adminRoot" && pass === "cafetinAdmin") {
        alert("Acceso Administrador. Entrando al Panel de Control");
        // SALE de login, ENTRA a la carpeta admin y busca el index.html
        window.location.href = "../admin/index.html";
    } 
    else {
        error.style.display = "block";
    }
});