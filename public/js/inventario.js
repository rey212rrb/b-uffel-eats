const formProducto = document.getElementById('formNuevoProducto');
const methodField = document.getElementById('methodField');
const btnGuardar = document.getElementById('btnGuardar');
const modalElement = document.getElementById('modalProducto');
let modalBootstrap = null;

document.addEventListener("DOMContentLoaded", function() {
    if (modalElement) {
        modalBootstrap = new bootstrap.Modal(modalElement);
    }
});

function prepararCreacion() {

    formProducto.reset();
    formProducto.action = "/products";
    methodField.innerHTML = "";
    btnGuardar.textContent = "Guardar Producto";
}

function prepararEdicion(id, name, category, description, price, image) {
    // 1. Rellenar los campos
    document.getElementById('nombreProducto').value = name;
    document.getElementById('categoria').value = category;
    document.getElementById('descripcion').value = description;
    document.getElementById('precio').value = price;
    document.getElementById('imagen').value = image;

    formProducto.action = `/products/${id}`;

    methodField.innerHTML = '<input type="hidden" name="_method" value="PUT">';
    btnGuardar.textContent = "Guardar Cambios";

    if (modalBootstrap) {
        modalBootstrap.show();
    }
}
