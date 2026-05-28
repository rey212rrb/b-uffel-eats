// carrito.js

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

    // Mapeamos el carrito para enviar exactamente lo que Laravel necesita
    const itemsFormateados = carrito.map(producto => ({
        id: producto.id, // Es crucial que cuando agregues al carrito guardes el 'id' de la BD
        quantity: producto.cantidad,
        price: producto.precio
    }));

    fetch('/pedidos/crear', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json', // <-- AQUÍ ESTÁ LA LÍNEA AGREGADA
            'X-CSRF-TOKEN': token
        },
        body: JSON.stringify({
            cart_items: itemsFormateados,
            total: totalCalculado,
            client_name: numCuenta
        })
    })
    .then(response => {
        if (!response.ok) {
            // Si la respuesta no es 200 OK, lanzamos el error para leer el JSON en el catch
            return response.json().then(errData => {
                throw errData;
            });
        }
        return response.json();
    })
    .then(data => {
        console.log("Respuesta de Laravel:", data);
        alert(data.message || "Pedido procesado con éxito");

        const datosOrden = {
            id: data.order_id,
            cuenta: numCuenta,
            total: `$${totalCalculado}`,
            articulos: carrito
        };

        localStorage.setItem("ultima_orden", JSON.stringify(datosOrden));

        localStorage.removeItem("carrito");
        window.location.href = "/order";
    })
    .catch(error => {

        console.error('Error detallado desde Laravel:', error);

        if(error.message) {
            alert("Error del servidor: " + error.message);
        } else {
            alert("Hubo un error al procesar el pedido. Revisa la consola.");
        }
    });
}

document.addEventListener('DOMContentLoaded', cargarCarrito);
