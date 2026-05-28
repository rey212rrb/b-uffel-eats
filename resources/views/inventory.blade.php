@extends('layouts.app')

@section('content')

    <section class="container py-5">
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h3 class="fw-bold text-dark mb-0">Gestión de Productos</h3>
            <button class="btn btn-gold rounded-pill px-4 fw-bold" data-bs-toggle="modal" data-bs-target="#modalProducto" onclick="prepararCreacion()">
                <i class="bi bi-plus-lg me-2"></i>Nuevo Producto
            </button>
        </div>

        @if(session('success'))
            <div class="alert alert-success alert-dismissible fade show" role="alert">
                {{ session('success') }}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        @endif

        <section class="container mt-4">
            <h3 class="fw-bold text-dark mb-0">Lista de Productos</h3><br>
            <h3 id="contadorProducto" class="text-gold small mb-4">Total: {{ $products->count() }} productos</h3>

            <div id="listaProductos" class="row g-4">
                @foreach($products as $product)
                    <div class="col-md-4 mb-4">
                        <div class="card border-0 shadow-sm rounded-4 h-100">
                            <div class="card-body p-4">
                                <h5 class="fw-bold mb-1">{{ $product->name }}</h5>
                                <p class="text-muted small mb-0">{{ $product->description }}</p>
                                <p class="fw-bold mt-2">${{ number_format($product->price, 2) }} MXN</p>

                                <div class="d-flex justify-content-between align-items-center mt-4">
                                    <span class="badge bg-success-subtle text-success px-3 py-2 rounded-pill">Disponible</span>

                                    <form action="{{ route('products.destroy', $product->id) }}" method="POST" style="display:inline;">
                                        @csrf
                                        @method('DELETE')
                                        <button type="submit" class="btn btn-danger btn-sm rounded-3 px-3" onclick="return confirm('¿Seguro que deseas eliminarlo?')">
                                            Eliminar
                                        </button>
                                    </form>

                                    <button class="btn btn-warning btn-sm"
                                            onclick="prepararEdicion({{ $product->id }}, '{{ $product->name }}', '{{ $product->category }}', '{{ $product->description }}', {{ $product->price }}, '{{ $product->image }}')">
                                        Editar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                @endforeach
            </div>
        </section>

    </section>

    <section id="productoNuevo">
        <div class="modal fade" id="modalProducto" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content border-0 shadow-lg" style="border-radius: 20px;">
                    <div class="modal-header border-0 pb-0">
                        <h5 class="fw-bold">Registrar/Editar Producto</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body p-4">
                        <form id="formNuevoProducto" action="{{ route('products.store') }}" method="POST">
                            @csrf
                            <div id="methodField"></div> <div class="mb-3">
                                <label for="nombreProducto" class="form-label small fw-bold">Nombre del Producto</label>
                                <input id="nombreProducto" name="name" class="form-control rounded-3" placeholder="Ej: Café Americano" required>
                            </div>
                            <div class="mb-3">
                                <label for="categoria" class="form-label small fw-bold">Categoría</label>
                                <select id="categoria" name="category" class="form-select rounded-3" required>
                                    <option value="" >Seleccionar...</option>
                                    <option value="Bebidas">Bebidas</option>
                                    <option value="Repostería">Repostería</option>
                                    <option value="Platos Fuertes">Platos Fuertes</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label for="descripcion" class="form-label small fw-bold">Descripción del Producto</label>
                                <textarea id="descripcion" name="description" class="form-control rounded-3" rows="3" placeholder="Ej: Delicioso pan brioche..." required></textarea>
                            </div>
                            <div class="row">
                                <div class="col-md-6 mb-3">
                                    <label for="precio" class="form-label small fw-bold">Precio ($)</label>
                                    <input type="number" step="0.01" id="precio" name="price" class="form-control rounded-3" placeholder="0.00" required>
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label for="imagen" class="form-label small fw-bold">Imagen (URL)</label>
                                    <input id="imagen" name="image" class="form-control rounded-3" required>
                                </div>
                            </div>
                            <button id="btnGuardar" type="submit" class="btn btn-success w-100 rounded-pill py-2 fw-bold mt-3">Guardar Producto</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
@endsection

@push('scripts')
    <script src="{{ asset('js/inventario.js') }}"></script>
@endpush
