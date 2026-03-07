// SIMULACIÓN: Estos son los datos que "ya vienen" del sistema
const pedidoCapturado = [
    { nombre: "Café con Leche XL", precio: 2.50 },
    { nombre: "Empanada de Pabellón", precio: 2.00 },
    { nombre: "Jugo de Mora", precio: 1.80 }
];

document.addEventListener('DOMContentLoaded', () => {
    mostrarPedido();
});

function mostrarPedido() {
    const lista = document.getElementById('lista-items');
    const totalElem = document.getElementById('monto-total');
    
    let total = 0;
    lista.innerHTML = "";

    pedidoCapturado.forEach(p => {
        total += p.precio;
        lista.innerHTML += `
            <div class="ticket-linea">
                <span>${p.nombre}</span>
                <span>$${p.precio.toFixed(2)}</span>
            </div>
        `;
    });

    totalElem.innerText = `$${total.toFixed(2)}`;
}

function emitirRecibo() {
    // El mensaje exacto que pide tu instrucción
    alert("Recibo Emitido ¡Gracias por su compra!");
    
    // Al terminar, limpiamos la pantalla simunlando que ya no hay pedidos pendientes
    document.getElementById('lista-items').innerHTML = "<p style='text-align:center;'</p>";
    document.getElementById('monto-total').innerText = "$0.00";
    
    // Desactivamos el botón para que no vuelvan a darle clic
    document.querySelector('.btn-confirmar').disabled = true;
    document.querySelector('.btn-confirmar').style.opacity = "0.5";
}

// Botón Salir
document.getElementById('logoutBtn').addEventListener('click', () => {
    window.location.href = "../login/index.html";
});