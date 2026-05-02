function actualizarContadorCarrito() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const contador = document.getElementById('contador-articulos');

    if (contador) {
        const texto = carrito.length === 1 ? '1 artículo' : `${carrito.length} artículos`;
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
