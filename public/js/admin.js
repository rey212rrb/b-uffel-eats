function cargarComandas() {
    const contenedor = document.getElementById('contenedor-comandas');
    if (!contenedor) return; // Seguridad por si el elemento no existe

    const historial = JSON.parse(localStorage.getItem("historial_pedidos")) || [];

    if (historial.length === 0) {
        contenedor.innerHTML = "<p class='text-muted text-center py-5'>No hay pedidos aún.</p>";
        return;
    }

    contenedor.innerHTML = historial.map(p => {
        const esCompletado = p.estado === "Completado";
        return `
                <div class="col-md-6 col-lg-4 mb-3">
                    <div class="card shadow-sm border-0" style="border-radius: 15px;">
                        <div class="card-body">
                            <div class="d-flex justify-content-between align-items-start mb-2">
                                <h6 class="fw-bold text-dark mb-0">Pedido #${p.idOrden}</h6>
                                <span class="badge ${esCompletado ? 'bg-success' : 'bg-warning text-dark'}">
                                    ${p.estado}
                                </span>
                            </div>

                            <p class="small mb-1 text-dark"><strong>Cuenta:</strong> ${p.cuenta}</p>
                            <p class="small mb-3 text-dark"><strong>Total:</strong> $${p.total}</p>

                            <!-- CONTENEDOR DE BOTONES ALINEADOS -->
                            <div class="d-flex gap-2">
                                <button
                                    onclick="marcarCompletado(${p.idOrden})"
                                    class="btn ${esCompletado ? 'btn-secondary' : 'btn-success'} flex-grow-1 rounded-pill fw-bold btn-sm"
                                    ${esCompletado ? 'disabled' : ''}>
                                    ${esCompletado ? 'Pedido Entregado' : 'Marcar como Preparado'}
                                </button>

                                <button
                                    onclick="eliminarPedido(${p.idOrden})"
                                    class="btn btn-outline-danger rounded-circle p-2 d-flex align-items-center justify-content-center"
                                    style="width: 38px; height: 38px;"
                                    title="Eliminar Pedido">
                                    <i class="bi bi-trash"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>`;
    }).join('');
}

function marcarCompletado(id) {

    const metaToken = document.querySelector('meta[name="csrf-token"]');

    if (!metaToken) {
        console.error("Error: No se encontró el meta tag CSRF. Agrégalo a tu layout.");
        return;
    }

    fetch(`/admin/pedidos/${id}`, {
        method: 'PATCH',
        headers: {
            'X-CSRF-TOKEN': metaToken.content,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) throw new Error('Error en la respuesta del servidor');
        return response.json();
    })
    .then(() => {
        let historial = JSON.parse(localStorage.getItem("historial_pedidos")) || [];
        historial = historial.map(p => {
            if (p.idOrden === id) p.estado = "Completado";
            return p;
        });
        localStorage.setItem("historial_pedidos", JSON.stringify(historial));

        cargarComandas();
        console.log(`Pedido #${id} actualizado exitosamente.`);
    })
    .catch(error => {
        console.error("Hubo un problema con la petición PATCH:", error);
    });
}

function eliminarPedido(id) {

    if (!confirm(`¿Estás seguro de que deseas eliminar el pedido #${id}?`)) return;

    const metaToken = document.querySelector('meta[name="csrf-token"]');
    if (!metaToken) return console.error("Falta el meta tag CSRF");

    fetch(`/admin/pedidos/${id}`, {
        method: 'DELETE',
        headers: {
            'X-CSRF-TOKEN': metaToken.content,
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) throw new Error('Error al eliminar en el servidor');
        return response.json();
    })
    .then(() => {

        let historial = JSON.parse(localStorage.getItem("historial_pedidos")) || [];
        historial = historial.filter(p => p.idOrden !== id);

        localStorage.setItem("historial_pedidos", JSON.stringify(historial));
        cargarComandas();
        console.log(`Pedido #${id} borrado de forma permanente.`);
    })
    .catch(error => console.error("Error en la operación DELETE:", error));
}

function inicializarApp() {
    actualizarContadorCarrito();
    cargarComandas();
    setInterval(cargarComandas, 5000);
}
