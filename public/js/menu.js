function cargarMenu() {

    const contenedorMenu = document.getElementById('contenedorMenu');

    if (!contenedorMenu) return;

    const productos = JSON.parse(localStorage.getItem("productos guardados")) || [];

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
                    <img src="${producto.imagen || 'https://via.placeholder.com/300x200'}" class="card-img-top" alt="${producto.nombreProducto}">
                    <div class="card-body d-flex flex-column">
                        <div class="d-flex justify-content-between align-items-start">
                            <h5 class="card-title fw-bold mb-1">${producto.nombreProducto}</h5>
                            <span class="price-tag">$${Number(producto.precio).toFixed(2)}</span>
                        </div>
                        <p class="card-text text-muted small">${producto.descripcion}</p>
                        <button onclick="agregarAlCarrito(${producto.creado})" class="btn btn-outline-success w-100 rounded-pill btn-sm mt-auto fw-bold">
                            <i class="bi bi-cart-plus me-2"></i>Agregar
                        </button>
                    </div>
                </div>
            `;
            contenedorMenu.appendChild(divCol);
        });
}

function agregarAlCarrito(id) {
    const productos = JSON.parse(localStorage.getItem("productos guardados")) || [];
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const productoSeleccionado = productos.find(p => p.creado == id);

    if (productoSeleccionado) {
        carrito.push(productoSeleccionado);
        localStorage.setItem("carrito", JSON.stringify(carrito));

        actualizarContadorCarrito(); 

        alert(`${productoSeleccionado.nombreProducto} agregado al carrito.`);
    } else {
        console.error("No se encontró el producto con ID:", id);
    }
}

function actualizarContadorCarrito() {

    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const contadorHeader = document.getElementById('contador-articulos');

    if (contadorHeader) {
        contadorHeader.textContent = `${carrito.length} artículos`;
    }
}

document.addEventListener('DOMContentLoaded', cargarMenu);
