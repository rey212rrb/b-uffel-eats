@extends('layouts.app')

@section('content')

    <section class="container py-5">

        <div class="d-flex justify-content-between align-items-center mb-4">
            <h3 class="fw-bold text-dark mb-0">Gestión de Productos</h3>
            <button class="btn btn-gold rounded-pill px-4 fw-bold" data-bs-toggle="modal" data-bs-target="#modalProducto">
                <i class="bi bi-plus-lg me-2"></i>Nuevo Producto
            </button>
        </div>

        <section class="container mt-4">
            <h3 class="tfw-bold text-dark mb-0">Lista de Productos</h3><br>
            <h3 id="contadorProducto" class="text-gold small mb-4">Total: 0 productos</h3>
            <div id="listaProductos" class="row g-4">
            </div>
        </section>

        </div>
    </section>
    <section id="productoNuevo">
    <div class="modal fade" id="modalProducto" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content border-0 shadow-lg" style="border-radius: 20px;">
                <div class="modal-header border-0 pb-0">
                    <h5 class="fw-bold">Registrar Nuevo Producto</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body p-4">
                    <!-- Formulario para nuevo producto -->
                    <form id="formNuevoProducto">
                        <div class="mb-3">
                            <label for="nombreProducto" class="form-label small fw-bold">Nombre del Producto</label>
                            <input id="nombreProducto" name="nombreProducto" class="form-control rounded-3" placeholder="Ej: Café Americano">
                        </div>
                        <div class="mb-3">
                            <label for="categoria" class="form-label small fw-bold">Categoría</label>
                            <select id="categoria" name="categoria" class="form-select rounded-3">
                                <option value="" >Seleccionar...</option>
                                <option value="1">Bebidas</option>
                                <option value="2">Repostería</option>
                                <option value="3">Platos Fuertes</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="descripcion" class="form-label small fw-bold">Descripción del Producto</label>
                            <textarea id="descripcion" name="descripcion" class="form-control rounded-3" rows="3" placeholder="Ej: Delicioso pan brioche con doble carne y queso fundido..."></textarea>
                        </div>
                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <label for="precio" class="form-label small fw-bold">Precio ($)</label>
                                <input id="precio" name="precio" class="form-control rounded-3" placeholder="0.00">
                            </div>
                            <div class="col-md-6 mb-3">
                                <label for="imagen" class="form-label small fw-bold">Imagen</label>
                                <input id="imagen" name="imagen" class="form-control rounded-3">
                            </div>
                        </div>
                        <button type="submit" class="btn btn-success w-100 rounded-pill py-2 fw-bold mt-3">Guardar Producto</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
    @endsection

    @push('scripts')
        <script src="{{ asset('js/inventario.js') }}"></script>

    @endpush
