// Inventario inicial 
let inventario = [
    { id: 1, nombre: "Cappuccino", usd: "5.00", bs: "2165.85" },
    { id: 2, nombre: "Chocolate Caliente", usd: "3.50", bs: "1516.10" },
    { id: 3, nombre: "Café con Leche", usd: "3.00", bs: "1299.51" },
    { id: 4, nombre: "Café Frío", usd: "4.00", bs: "1732.68" },
    { id: 5, nombre: "Papelón con Limón", usd: "1.50", bs: "649.76" },
    { id: 6, nombre: "Jugos Naturales", usd: "3.00", bs: "1299.51" },
    { id: 7, nombre: "Croissants", usd: "1.50", bs: "649.76" },
    { id: 8, nombre: "Donas Glaseadas", usd: "2.00", bs: "866.34" },
    { id: 9, nombre: "Paquete de Galletas de Vainilla", usd: "6.00", bs: "2599.02" },
    { id: 10, nombre: "Porción de Quesillo", usd: "2.50", bs: "1082.93" },
    { id: 11, nombre: "Pastelitos", usd: "2.00", bs: "866.34" },
    { id: 12, nombre: "Sandwich de Jamón y Queso", usd: "2.00", bs: "866.34" },
    { id: 13, nombre: "Tequeños", usd: "3.00", bs: "1299.51" },
    { id: 14, nombre: "Pan con Queso", usd: "2.00", bs: "866.34" },
    { id: 15, nombre: "Malta 250ml", usd: "1.00", bs: "433.17" },
    { id: 16, nombre: "Palmeritas Crujientes", usd: "1.00", bs: "433.17" },
    { id: 17, nombre: "Coca-Cola 2 Lt", usd: "1.50", bs: "649.76" },
    { id: 18, nombre: "Empanadas", usd: "2.00", bs: "866.34" },
    { id: 19, nombre: "Reseña ClienteUCV: Qué mal cafetín!", tipo: "reseña" }
];

document.addEventListener('DOMContentLoaded', () => {
    actualizarLista();

    // Manejo del Formulario de Nuevo Producto
    document.getElementById('form-producto').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nombre = document.getElementById('nombreProd').value;
        const usd = document.getElementById('precioUSD').value;
        const bs = document.getElementById('precioBS').value;

        const nuevoProd = { 
            id: Date.now(), 
            nombre: nombre, 
            usd: parseFloat(usd).toFixed(2),
            bs: parseFloat(bs).toFixed(2)
        };

        inventario.push(nuevoProd);
        actualizarLista();
        this.reset();
        alert(`¡${nombre} añadido al menú!`);
    });

    // Botón Cerrar Sesión
    document.getElementById('logoutBtn').addEventListener('click', () => {
        window.location.href = "../login/index.html";
    });
});

function actualizarLista() {
    const contenedor = document.getElementById('lista-gestion');
    contenedor.innerHTML = "";

    inventario.forEach((item, index) => {
        // Formato: ($5.00 / Bs.2165.85)
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