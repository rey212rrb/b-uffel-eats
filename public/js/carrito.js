function cargarCarrito() {
    const listaCarrito = document.getElementById('lista-carrito');
    const totalCompra = document.getElementById('total-compra');
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    if (carrito.length === 0) {
        if (listaCarrito) listaCarrito.innerHTML = `<p class="text-center py-5 text-muted">Tu carrito está vacío.</p>`;
        if (totalCompra) totalCompra.textContent = "$0.00";
        return;
    }

    if (listaCarrito) {
        listaCarrito.innerHTML = "";
        carrito.forEach((producto, index) => {
            if (!producto.cantidad) producto.cantidad = 1;

            const div = document.createElement('div');
            div.className = "d-flex align-items-center justify-content-between mb-4 p-3 border rounded-3 shadow-sm";
            div.innerHTML = `
                <div class="d-flex align-items-center">
                    <img src="${producto.imagen}" style="width: 70px; height: 70px; object-fit: cover;" class="rounded me-3">
                    <div>
                        <h6 class="mb-0 fw-bold">${producto.nombreProducto}</h6>
                        <small class="text-success fw-bold">$${Number(producto.precio).toFixed(2)} c/u</small>
                    </div>
                </div>
                <div class="d-flex align-items-center">
                    <button class="btn btn-sm btn-outline-secondary rounded-circle"
                            onclick="cambiarCantidad(${index}, -1)" ${producto.cantidad <= 1 ? 'disabled' : ''}>-</button>
                    <span class="mx-3 fw-bold">${producto.cantidad}</span>
                    <button class="btn btn-sm btn-outline-secondary rounded-circle"
                            onclick="cambiarCantidad(${index}, 1)" ${producto.cantidad >= 10 ? 'disabled' : ''}>+</button>
                    <button class="btn btn-link text-danger ms-4 p-0" onclick="eliminarDelCarrito(${index})">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>`;
            listaCarrito.appendChild(div);
        });
    }
    actualizarTotal();
}

function cambiarCantidad(index, cambio) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const nuevaCantidad = (carrito[index].cantidad || 1) + cambio;
    if (nuevaCantidad >= 1 && nuevaCantidad <= 10) {
        carrito[index].cantidad = nuevaCantidad;
        localStorage.setItem("carrito", JSON.stringify(carrito));
        cargarCarrito();
        if (typeof actualizarContadorCarrito === 'function') actualizarContadorCarrito();
    }
}

function actualizarTotal() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const totalCompra = document.getElementById('total-compra');
    const total = carrito.reduce((acc, p) => acc + (Number(p.precio) * (p.cantidad || 1)), 0);
    if (totalCompra) totalCompra.textContent = `$${total.toFixed(2)}`;
    return total.toFixed(2);
}

function eliminarDelCarrito(index) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    cargarCarrito();
    if (typeof actualizarContadorCarrito === 'function') actualizarContadorCarrito();
}

function realizarPedido(event) {
    if (event) event.preventDefault();

    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const campoCuenta = document.getElementById('numeroCuenta');
    const numCuenta = campoCuenta ? campoCuenta.value.trim() : "Invitado";
    const totalCalculado = actualizarTotal();

    if (carrito.length === 0) {
        alert("Tu carrito está vacío.");
        return;
    }

    const tokenMeta = document.querySelector('meta[name="csrf-token"]');
    const token = tokenMeta ? tokenMeta.content : '';

    console.log("Iniciando petición POST a Laravel...");

    fetch('/pedidos/crear', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': token
        },
        body: JSON.stringify({
            items: carrito,
            total: totalCalculado,
            cuenta: numCuenta
        })
    })
    .then(response => {
        if (!response.ok) throw new Error('Error en la respuesta del servidor');
        return response.json();
    })
    .then(data => {
        console.log("Respuesta de Laravel:", data);
        alert(data.mensaje || "Pedido procesado");

        const datosOrden = {
            idOrden: Math.floor(Math.random() * 90000) + 10000,
            cuenta: numCuenta,
            total: `$${totalCalculado}`,
            fecha: new Date().toLocaleString(),
            estado: "En preparación",
            articulos: carrito
        };

        let historial = JSON.parse(localStorage.getItem("historial_pedidos")) || [];
        historial.push(datosOrden);
        localStorage.setItem("historial_pedidos", JSON.stringify(historial));
        localStorage.setItem('ultimoPedido', JSON.stringify(datosOrden));

        localStorage.removeItem("carrito");
        window.location.href = "/order";
    })
    .catch(error => {
        console.error('Error detallado:', error);
        alert("Hubo un error al conectar con el servidor.");
    });
}

document.addEventListener('DOMContentLoaded', cargarCarrito);
