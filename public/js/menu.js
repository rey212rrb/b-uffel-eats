let productosMenu = [];

function cargarMenu() {
    const contenedorMenu = document.getElementById('contenedorMenu');
    if (!contenedorMenu) return;

    fetch('/productos/json')
        .then(response => response.json())
        .then(productos => {
            productosMenu = productos;
            contenedorMenu.innerHTML = "";

            if (productos.length === 0) {
                contenedorMenu.innerHTML = `<p class="text-center text-muted">Próximamente más delicias...</p>`;
                return;
            }
            productos.forEach(producto => {
                const divCol = document.createElement('div');
                divCol.className = "col-12 col-sm-6 col-lg-3 mb-4";

                divCol.innerHTML = `
                    <div class="card card-product h-100 border-0 shadow-sm">
                        <img src="${producto.image || 'https://via.placeholder.com/300x200'}" class="card-img-top" alt="${producto.name}">
                        <div class="card-body d-flex flex-column">
                            <div class="d-flex justify-content-between align-items-start">
                                <h5 class="card-title fw-bold mb-1">${producto.name}</h5>
                                <span class="price-tag">$${Number(producto.price).toFixed(2)}</span>
                            </div>
                            <p class="card-text text-muted small">${producto.description}</p>

                            <button onclick="agregarAlCarrito(${producto.id})" class="btn btn-outline-success w-100 rounded-pill btn-sm mt-auto fw-bold">
                                <i class="bi bi-cart-plus me-2"></i>Agregar
                            </button>
                        </div>
                    </div>
                `;
                contenedorMenu.appendChild(divCol);
            });
        })
        .catch(error => console.error("Error al cargar el menú:", error));
}

function agregarAlCarrito(id) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const productoSeleccionado = productosMenu.find(p => p.id === id);

    if (productoSeleccionado) {
        const indexExistente = carrito.findIndex(p => p.id === id);

        if (indexExistente !== -1) {
            carrito[indexExistente].cantidad = (carrito[indexExistente].cantidad || 1) + 1;
        } else {
            carrito.push({
                id: productoSeleccionado.id,
                nombreProducto: productoSeleccionado.name,
                precio: productoSeleccionado.price,
                imagen: productoSeleccionado.image,
                cantidad: 1
            });
        }

        localStorage.setItem("carrito", JSON.stringify(carrito));
        actualizarContadorCarrito();
        alert(`${productoSeleccionado.name} agregado al carrito.`);
    } else {
        console.error("No se encontró el producto con ID:", id);
    }
}

function actualizarContadorCarrito() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const contadorHeader = document.getElementById('contador-articulos');

    if (contadorHeader) {
        const totalArticulos = carrito.reduce((acc, producto) => acc + (producto.cantidad || 1), 0);
        contadorHeader.textContent = totalArticulos === 1 ? '1 artículo' : `${totalArticulos} artículos`;
    }
}

document.addEventListener('DOMContentLoaded', cargarMenu);
