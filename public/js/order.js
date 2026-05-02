document.addEventListener('DOMContentLoaded', () => {
    const orden = JSON.parse(localStorage.getItem("ultima_orden"));

    if (!orden) {

        window.location.href = "menu.html";
        return;
    }


    document.getElementById('orden-id').textContent = Math.floor(Math.random() * 90000) + 10000;
    document.getElementById('display-cuenta').textContent = orden.cuenta;

    const contenedorItems = document.getElementById('lista-pedido-final');
    const articulosContador = document.getElementById('total-articulos-count');
    
    let totalItems = 0;
    contenedorItems.innerHTML = orden.articulos.map(p => {
        totalItems += (p.cantidad || 1);
        return `
            <div class="d-flex justify-content-between mb-3 border-bottom pb-2">
                <span>${p.cantidad || 1} x ${p.nombreProducto}</span>
                <span class="fw-bold">$${(Number(p.precio) * (p.cantidad || 1)).toFixed(2)}</span>
            </div>
        `;
    }).join('');

    articulosContador.textContent = totalItems;

    document.getElementById('total-pedido-final').textContent = orden.total;
});