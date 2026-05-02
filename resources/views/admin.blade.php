@extends('layouts.app')

@section('content')
    <main class="container py-5">
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h2 class="fw-bold text-white">Gestión de Comandas</h2>
            <a href="{{ url('/inventario') }}" class="btn btn-warning rounded-pill px-4 fw-bold shadow-sm">
                <i class="bi bi-box-seam me-2"></i>Ir a Inventario
            </a>
        </div>

        <div class="bg-light p-4 rounded-4 shadow">
            <h4 class="text-dark mb-4 border-bottom pb-2 fw-bold">Pedidos Pendientes</h4>

            <div id="contenedor-comandas" class="row g-3">
                <div class="text-center py-5">
                    <div class="spinner-border text-success" role="status"></div>
                    <p class="text-muted mt-3">Esperando pedidos nuevos...</p>
                </div>
            </div>
        </div>
    </main>
@endsection

@push('scripts')
    <script src="{{ asset('js/admin.js') }}"></script>
@endpush
