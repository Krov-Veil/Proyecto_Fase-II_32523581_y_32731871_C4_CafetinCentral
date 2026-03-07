const productos = [
    { id: 1, nombre: "Café Negro", precio: 1.50 },
    { id: 2, nombre: "Empanada", precio: 2.00 },
    { id: 3, nombre: "Jugo Natural", precio: 2.50 },
    { id: 4, nombre: "Sandwich", precio: 4.00 }
];

let carrito = [];

// Cargar productos al iniciar
document.addEventListener('DOMContentLoaded', () => {
    const contenedor = document.getElementById('lista-productos');
    productos.forEach(p => {
        contenedor.innerHTML += `
            <div class="card-producto">
                <h4>${p.nombre}</h4>
                <p>$${p.precio.toFixed(2)}</p>
                <button onclick="agregarAlCarrito(${p.id})">Añadir al Carrito</button>
            </div>
        `;
    });
});

function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id);
    carrito.push(producto);
    actualizarInterfaz();
}

function actualizarInterfaz() {
    // Contador
    document.getElementById('cart-count').innerText = carrito.length;
    
    // Lista de carrito
    const itemsContenedor = document.getElementById('items-carrito');
    itemsContenedor.innerHTML = "";
    let subtotal = 0;

    carrito.forEach((p, index) => {
        subtotal += p.precio;
        itemsContenedor.innerHTML += `
            <div class="item-cart">
                <span>${p.nombre} - $${p.precio.toFixed(2)}</span>
                <button onclick="eliminarDelCarrito(${index})">❌</button>
            </div>
        `;
    });

    document.getElementById('subtotal').innerText = subtotal.toFixed(2);
}

function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarInterfaz();
}

function mostrarSeccion(id) {
    document.querySelectorAll('.content-section').forEach(s => s.style.display = 'none');
    document.getElementById(id).style.display = 'block';
}

// Botón Salir
document.getElementById('logoutBtn').addEventListener('click', () => {
    window.location.href = "../login/index.html";
});

function finalizarCompra() {
    if (carrito.length === 0) {
        alert("Tu carrito está vacío. Añade algo antes de pagar.");
        return;
    }

    // 1. Obtener la fecha actual
    const fecha = new Date().toLocaleDateString();

    // 2. Juntar los nombres de los productos comprados
    const nombresProductos = carrito.map(p => p.nombre).join(", ");

    // 3. Obtener el total que se calculó en la interfaz
    const totalCompra = document.getElementById('subtotal').innerText;

    // 4. Crear la nueva fila para el historial (HTML)
    const tablaHistorial = document.querySelector('.tabla-historial tbody');
    const nuevaFila = `
        <tr>
            <td>${fecha}</td>
            <td>${nombresProductos}</td>
            <td>$${totalCompra}</td>
        </tr>
    `;

    // 5. Agregar la fila al inicio de la tabla
    tablaHistorial.innerHTML = nuevaFila + tablaHistorial.innerHTML;

    // 6. Vaciar el carrito y actualizar la interfaz
    alert("¡Pedido realizado con éxito! Puedes verlo en tu historial.");
    carrito = [];
    actualizarInterfaz();
    
    // Opcional: Llevar al usuario al historial para que vea su compra
    mostrarSeccion('historial');
}