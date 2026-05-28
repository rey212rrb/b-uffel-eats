function actualizarContadorCarrito() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const contador = document.getElementById('contador-articulos');

    if (contador) {

        const totalArticulos = carrito.reduce((acc, producto) => acc + (producto.cantidad || 1), 0);

        const texto = totalArticulos === 1 ? '1 artículo' : `${totalArticulos} artículos`;
        contador.textContent = texto;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    actualizarContadorCarrito();

    if (typeof inicializarApp === 'function') {
        console.log("Sistema: Ejecutando inicialización específica de la página.");
        inicializarApp();
    } else {
        console.log("Sistema: Carga estándar completada (sin inicialización específica).");
    }
});
