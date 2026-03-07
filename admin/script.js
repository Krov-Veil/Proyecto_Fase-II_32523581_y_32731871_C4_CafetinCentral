// Inventario inicial simulado
let inventario = [
    { id: 1, nombre: "Café con Leche", usd: 2.50, bs: 90.50 },
    { id: 2, nombre: "Empanada de Pollo", usd: 1.80, bs: 65.20 },
    { id: 3, nombre: "Reseña Cliente #402: Qué mal cafetín!", tipo: "reseña" }
];

document.addEventListener('DOMContentLoaded', () => {
    actualizarLista();

    // Manejo del Formulario
    document.getElementById('form-producto').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nombre = document.getElementById('nombreProd').value;
        const usd = document.getElementById('precioUSD').value;
        const bs = document.getElementById('precioBS').value;
        const url = document.getElementById('urlProd').value;

        // Crear objeto nuevo
        const nuevoProd = { 
            id: Date.now(), 
            nombre: nombre, 
            usd: parseFloat(usd).toFixed(2),
            bs: parseFloat(bs).toFixed(2)
        };

        // Guardar en la lista temporal
        inventario.push(nuevoProd);

        alert(`Producto guardado con éxito:\n${nombre}\nPrecio: $${usd} / Bs.${bs}\nImagen: imagenes/${url}`);
        
        // Limpiar campos y refrescar vista
        this.reset();
        actualizarLista();
    });
});

// Función para renderizar la lista en pantalla
function actualizarLista() {
    const contenedor = document.getElementById('lista-gestion');
    contenedor.innerHTML = "";

    inventario.forEach((item, index) => {
        // Formateamos cómo se ve el precio o si es una reseña
        const detallePrecio = item.usd ? `($${item.usd} / Bs.${item.bs})` : "";
        
        contenedor.innerHTML += `
            <div class="item-gestion">
                <div class="info-item">
                    <strong>${item.nombre}</strong><br>
                    <span class="precio-texto">${detallePrecio}</span>
                </div>
                <button class="btn-eliminar" onclick="eliminarItem(${index})">Eliminar</button>
            </div>
        `;
    });
}

function eliminarItem(index) {
    if(confirm("¿Seguro que desea eliminar este elemento del sistema?")) {
        inventario.splice(index, 1);
        actualizarLista();
    }
}

// Botón de salida
document.getElementById('logoutBtn').addEventListener('click', () => {
    window.location.href = "../login/index.html";
});