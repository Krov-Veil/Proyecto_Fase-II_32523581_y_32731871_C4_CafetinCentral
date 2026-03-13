const productos = [
    { id: 1, nombre: "Cappuccino", bs: 2165.85, usd: 5.00, img: "../assets/img/capuccino.jpeg" }, 
    { id: 2, nombre: "Chocolate Caliente", bs: 1516.10, usd: 3.50, img: "../assets/img/chocolate-caliente.jpeg" },
    { id: 3, nombre: "Café con Leche", bs: 1299.51, usd: 3.00, img: "../assets/img/cafe-con-leche.jpeg" },
    { id: 4, nombre: "Café Frío", bs: 1732.68, usd: 4.00, img: "../assets/img/cafe-frio.jpeg" },
    { id: 5, nombre: "Papelón con Limón", bs: 649.76, usd: 1.50, img: "../assets/img/papelon-con-limon.jpeg" },
    { id: 6, nombre: "Jugos Naturales", bs: 1299.51, usd: 3.00, img: "../assets/img/jugos-naturales.jpeg" },
    { id: 7, nombre: "Croissants", bs: 649.76, usd: 1.50, img: "../assets/img/croissants.jpeg" },
    { id: 8, nombre: "Donas Glaseadas", bs: 866.34, usd: 2.00, img: "../assets/img/donas-glaseadas.jpeg" },
    { id: 9, nombre: "Galletas de Vainilla", bs: 2599.02, usd: 6.00, img: "../assets/img/galletas-vainilla.jpeg" },
    { id: 10, nombre: "Porción de Quesillo", bs: 1082.93, usd: 2.50, img: "../assets/img/quesillo.jpeg" },
    { id: 11, nombre: "Pastelitos", bs: 866.34, usd: 2.00, img: "../assets/img/pastelitos.jpeg" },
    { id: 12, nombre: "Sandwich de Jamón y Queso", bs: 866.34, usd: 2.00, img: "../assets/img/sandwich-jamon-queso.jpeg" },
    { id: 13, nombre: "Tequeños", bs: 1299.51, usd: 3.00, img: "../assets/img/tequenho.jpeg" },
    { id: 14, nombre: "Pan con Queso", bs: 866.34, usd: 2.00, img: "../assets/img/pan-queso.jpeg" },
    { id: 15, nombre: "Malta (250ml)", bs: 433.17, usd: 1.00, img: "../assets/img/malta.jpeg" },
    { id: 16, nombre: "Palmeritas Crujientes", bs: 433.17, usd: 1.00, img: "../assets/img/palmeritas.jpeg" },
    { id: 17, nombre: "Coca-Cola 2 Lt", bs: 649.76, usd: 1.50, img: "../assets/img/coca-cola.jpeg" },
    { id: 18, nombre: "Empanadas", bs: 866.34, usd: 2.00, img: "../assets/img/empanadas.jpeg" }
];

let carrito = [];

// DATOS ESTÁTICOS: Inicializamos con compras ficticias para cumplir el enunciado
let historialSesion = [
    { 
        id: "#4285", 
        fecha: "10/03/2026 09:15 AM", 
        detalles: "Empanadas, Malta (250ml)", 
        monto: "Bs. 1.299,51" 
    },
    { 
        id: "#3102", 
        fecha: "12/03/2026 03:45 PM", 
        detalles: "Cappuccino, Croissants", 
        monto: "Bs. 2.815,61" 
    }
]; 

document.addEventListener('DOMContentLoaded', () => { 
    cargarProductos(); 
    mostrarHistorial(); // Se ejecuta al cargar para que el historial no esté vacío
});

function cargarProductos() {
    const grid = document.getElementById('grid-productos');
    grid.innerHTML = productos.map(p => `
        <div class="card">
            <div class="contenedor-img">
                <img src="${p.img}" alt="${p.nombre}" class="img-producto">
            </div>
            <h3>${p.nombre}</h3>
            <div>
                <span class="bs-precio">Bs. ${p.bs.toLocaleString('es-VE', { minimumFractionDigits: 2 })}</span>
                <span class="usd-ref">Ref. $${p.usd.toFixed(2)}</span>
            </div>
            <button class="btn-añadir" id="btn-${p.id}" onclick="agregarCarrito(${p.id})">Añadir al Carrito</button>
        </div>
    `).join('');
}

function agregarCarrito(id) {
    const prod = productos.find(p => p.id === id);
    carrito.push(prod);
    const btn = document.getElementById(`btn-${id}`);
    btn.classList.add('btn-added-animation');
    btn.innerText = "¡Añadido! ✓";
    setTimeout(() => {
        btn.classList.remove('btn-added-animation');
        btn.innerText = "Añadir al Carrito";
    }, 800);
    actualizarInterfazCarrito();
}

function actualizarInterfazCarrito() {
    document.getElementById('cart-count').innerText = carrito.length;
    const listaItems = document.getElementById('items-carrito');
    const subtotalText = document.getElementById('monto-subtotal');
    let total = 0;
    
    listaItems.innerHTML = carrito.map(item => {
        total += item.bs;
        return `<div class="carrito-item"><span>${item.nombre}</span> <strong>Bs. ${item.bs.toLocaleString('es-VE', { minimumFractionDigits: 2 })}</strong></div>`;
    }).join('');
    
    subtotalText.innerText = `Bs. ${total.toLocaleString('es-VE', { minimumFractionDigits: 2 })}`;
}

function procesarCompra() {
    if (carrito.length === 0) return alert("Tu carrito está vacío.");
    
    const fechaActual = new Date();
    const ticket = {
        id: "#" + Math.floor(Math.random() * 10000),
        fecha: fechaActual.toLocaleDateString() + " " + fechaActual.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        detalles: carrito.map(i => i.nombre).join(", "),
        monto: document.getElementById('monto-subtotal').innerText
    };
    
    historialSesion.push(ticket);
    alert("¡Compra procesada con éxito!");
    
    carrito = [];
    actualizarInterfazCarrito();
    toggleCarrito();
    mostrarHistorial();
}

function mostrarHistorial() {
    const cont = document.getElementById('contenedor-historial');
    
    if (historialSesion.length === 0) {
        cont.innerHTML = '<p class="msj-vacio">No hay compras registradas.</p>';
        return;
    }

    // El .reverse() asegura que lo más reciente aparezca arriba
    cont.innerHTML = historialSesion.map(h => `
        <div class="compra-card">
            <p><strong>Pedido:</strong> ${h.id} - <small>${h.fecha}</small></p>
            <p><strong>Productos:</strong> ${h.detalles}</p>
            <p><strong>Total Pagado:</strong> ${h.monto}</p>
        </div>
    `).reverse().join('');
}

function toggleCarrito() { 
    document.getElementById('carrito-lateral').classList.toggle('carrito-cerrado'); 
}

function cambiarSeccion(seccion) {
    if (seccion === 'menu') {
        document.getElementById('vista-menu').className = 'seccion-activa';
        document.getElementById('vista-historial').className = 'seccion-oculta';
        document.getElementById('btn-tab-menu').classList.add('active');
        document.getElementById('btn-tab-historial').classList.remove('active');
    } else {
        document.getElementById('vista-menu').className = 'seccion-oculta';
        document.getElementById('vista-historial').className = 'seccion-activa';
        document.getElementById('btn-tab-menu').classList.remove('active');
        document.getElementById('btn-tab-historial').classList.add('active');
    }
}