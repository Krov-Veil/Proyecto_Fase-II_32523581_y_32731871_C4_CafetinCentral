// pedido inicial simulado
const pedidoCapturado = [
    { nombre: "Pan con Queso", precio: 866.34 },
    { nombre: "Malta 250ml", precio: 433.17 },
    { nombre: "Palmeritas Crujientes", precio: 433.17 }
];

// Al cargar la página, muestra los productos y calcula el total
document.addEventListener('DOMContentLoaded', () => {
    inicializarVenta();
});

function inicializarVenta() {
    const lista = document.getElementById('lista-items');
    const subtotalElem = document.getElementById('subtotal-fiscal');
    const ivaElem = document.getElementById('iva-fiscal');
    const totalElem = document.getElementById('total-final');
    const tarjetaElem = document.getElementById('pago-tarjeta');
    
    let subtotal = 0;
    lista.innerHTML = "";

    // Llena el recibo con los productos iniciales
    pedidoCapturado.forEach(p => {
        subtotal += p.precio;
        lista.innerHTML += `
            <div class="item-linea">
                <span>1 X Bs ${p.precio.toFixed(2)}</span>
                <div class="item-detalles">
                    <span>${p.nombre}</span>
                    <span>Bs ${p.precio.toFixed(2)}</span>
                </div>
            </div>
        `;
    });

    const iva = subtotal * 0.16; // IVA 16% 
    const total = subtotal + iva;

    // Colocamos los montos reales iniciales
    subtotalElem.innerText = `Bs ${subtotal.toFixed(2)}`;
    ivaElem.innerText = `Bs ${iva.toFixed(2)}`;
    totalElem.innerText = `Bs ${total.toFixed(2)}`;
    tarjetaElem.innerText = `Bs ${total.toFixed(2)}`;
}

// Esta función se ejecuta cuando el cajero hace clic
function emitirRecibo() {
    //  Mensaje de confirmación
    alert("Recibo Emitido ¡Gracias por su compra!");
    
    // Limpiar productos del pedido
    document.getElementById('lista-items').innerHTML = `
        <div style="text-align:center; padding: 20px 0; font-style: italic; color: #808d7f;">
        </div>
    `;

    //  Resetear los contadores a 0,00
    document.getElementById('subtotal-fiscal').innerText = "Bs 0,00";
    document.getElementById('iva-fiscal').innerText = "Bs 0,00";
    document.getElementById('total-final').innerText = "Bs 0,00";
    document.getElementById('pago-tarjeta').innerText = "Bs 0,00";
    
    //  Desactiva el botón (se pone gris y no se puede tocar)
    const btn = document.querySelector('.btn-confirmar');
    btn.disabled = true;
    btn.style.opacity = "0.5";
    btn.style.cursor = "not-allowed";
    btn.style.backgroundColor = "#5bdd33";
}

// Botón Salir para volver al Login
document.getElementById('logoutBtn').addEventListener('click', () => {
    window.location.href = "../login/index.html";
});