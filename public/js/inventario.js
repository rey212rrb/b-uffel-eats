//Variable
const formProducto = document.getElementById('formNuevoProducto');
const listaProductos = document.getElementById('listaProductos');
const contadorProductos = document.getElementById('contadorProducto');

let productos = [];
let datosGuardados = localStorage.getItem('productos guardados');
let editarProductoId = null;

if (datosGuardados) {
    productos = JSON.parse(datosGuardados);
}else {
    productos = [];
}

mostrarProductos();

formProducto.addEventListener('submit', function(event) {
    
    event.preventDefault();

    const datos = leerDatos();

    if (!validarFormulario(datos)) {
        return; 
    }

    guardarProducto(datos);

    mostrarProductos();

});

function leerDatos() {

    return {
        nombreProducto: document.getElementById('nombreProducto').value,
        categoria: document.getElementById('categoria').value,
        descripcion: document.getElementById('descripcion').value,  
        precio: parseFloat(document.getElementById('precio').value) || 0,
        imagen: document.getElementById('imagen').value,
        
        creado: Date.now()

    };

}

function validarFormulario(datos) {

     if(!datos.nombreProducto || !datos.categoria || !datos.descripcion || isNaN(datos.precio) || !datos.imagen) {
        alert('Por favor, completa todos los campos correctamente.');
        return false;
    }
    return true;

}

function guardarProducto(datos) {

    if (editarProductoId === null) {

     const nuevoProducto = {
        ...datos,
        creado: Date.now()
     }; 
     productos.push(datos);
    //console.log('Producto agregado:', datos);
    } else {
        const producto = productos.find(p => p.creado === editarProductoId);
        if (producto) {
            Object.assign(producto, datos);
            
        }

        editarProductoId = null;

        formProducto.querySelector('button[type="submit"]').textContent = 'Agregar Producto';

    }

    localStorage.setItem('productos guardados', JSON.stringify(productos));

    formProducto.reset();

    const modalElement = document.getElementById('modalProducto');
    const modalBootstrap = bootstrap.Modal.getInstance(modalElement); 
    
    if (modalBootstrap) {
        modalBootstrap.hide();
    }

}


function mostrarProductos() {

    if (!listaProductos) return;

    const contador = document.getElementById('contadorProducto');
    if (contador) {
        contador.textContent = `Total: ${productos.length} productos`;
    }

    listaProductos.innerHTML = "";

    productos.forEach(producto => {

        //const li = document.createElement('li');
        const divCol = document.createElement('div');
        divCol.classList.add('col-md-4', 'mb-4');

        divCol.innerHTML = `
         
            <div class="card border-0 shadow-sm rounded-4 h-100">
                <div class="card-body p-4">
                    <h5 class="fw-bold mb-1">${producto.nombreProducto}</h5>
                    <p class="text-muted small mb-0">${producto.descripcion}</p>
                    <p class="fw-bold mt-2">$${Number(producto.precio).toFixed(2)} MXN</p>
                                
                    <div class="d-flex justify-content-between align-items-center mt-4">
                        <span class="badge bg-success-subtle text-success px-3 py-2 rounded-pill">Disponible</span>
                        <button class="btn btn-danger btn-sm rounded-3 px-3" onclick="eliminarProducto(${producto.creado})">
                            Eliminar
                        </button>
                        <button class="btn btn-warning btn-sm" onclick="prepararEdicion(${producto.creado})">
                            Editar
                        </button>
                    </div>
                </div>
            </div>

        `;
        listaProductos.appendChild(divCol);
    });
}

function eliminarProducto(id) {

    const confirmacion = confirm('¿Estás seguro de que deseas eliminar este producto?');

    if (confirmacion) {
        
        productos = productos.filter(producto => producto.creado !== id);
        localStorage.setItem('productos guardados', JSON.stringify(productos));
        mostrarProductos();
    }  

}

function prepararEdicion(id) {

    const producto = productos.find(p => p.creado === id);  

    document.getElementById('nombreProducto').value = producto.nombreProducto;
    document.getElementById('categoria').value = producto.categoria;
    document.getElementById('descripcion').value = producto.descripcion;
    document.getElementById('precio').value = producto.precio;
    document.getElementById('imagen').value = producto.imagen;

    editarProductoId = id;
    formProducto.querySelector('button[type="submit"]').textContent = 'Guardar Cambios';

    const modalElement = document.getElementById('modalProducto');

    if (modalElement) {
        const modalBootstrap = new bootstrap.Modal(modalElement);
        modalBootstrap.show();
    } else {
        console.error("No se encontró el modal con el ID 'modalProducto'");
    }

}
