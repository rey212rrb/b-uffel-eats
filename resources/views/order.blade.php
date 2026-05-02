@extends('layouts.app')

@section('content')
    <section class="container py-5">
        <div class="text-center mb-5">
            <h2 class="fw-bold text-dark">Estado del Pedido</h2>
            <h1 class="display-4 fw-bold text-dark">#<span id="orden-id">10234</span></h1>
            <p class="text-warning fw-bold">Tiempo estimado: 15-20 minutos</p>
        </div>

        <div class="position-relative mb-5">
            <div class="progress" style="height: 4px; position: absolute; top: 25px; left: 10%; right: 10%; z-index: 0;">
                <div class="progress-bar bg-success" style="width: 100%;"></div>
            </div>

            <div class="d-flex justify-content-between position-relative" style="z-index: 1;">
                <div class="text-center">
                    <div class="step-icon bg-success text-white rounded-circle shadow d-flex align-items-center justify-content-center mx-auto" style="width: 50px; height: 50px;">
                        <i class="bi bi-check-lg"></i>
                    </div>
                    <p class="small mt-2 fw-bold text-muted">Recibido</p>
                </div>
                <div class="text-center">
                    <div class="step-icon bg-success text-white rounded-circle shadow d-flex align-items-center justify-content-center mx-auto" style="width: 50px; height: 50px;">
                        <i class="bi bi-clock"></i>
                    </div>
                    <p class="small mt-2 fw-bold text-muted">En preparación</p>
                </div>
                <div class="text-center">
                    <div class="step-icon bg-gold text-white rounded-circle shadow d-flex align-items-center justify-content-center mx-auto" style="width: 50px; height: 50px;">
                        <i class="bi bi-box-seam"></i>
                    </div>
                    <p class="small mt-2 fw-bold text-gold">Listo para recoger</p>
                </div>
            </div>
        </div>

        <div class="alert alert-success text-center py-3 mb-5 rounded-4 border-success shadow-sm">
            <span class="fw-bold">¡Tu pedido está listo para recoger!</span>
        </div>

        <div class="card border-0 shadow-sm mx-auto" style="max-width: 600px; border-radius: 20px;">
            <div class="card-body p-4">
                <div class="d-flex align-items-center mb-4">
                    <div class="bg-success text-white p-2 rounded-3 me-3">
                        <i class="bi bi-bag-fill"></i>
                    </div>
                    <div>
                        <h5 class="fw-bold mb-0 text-dark">Detalles del Pedido</h5>
                        <small class="text-muted"><span id="total-articulos-count">0</span> artículos</small>
                        <p class="mt-2 mb-0 text-dark"><strong>Número de cuenta:</strong> <span id="display-cuenta" class="text-success fw-bold"></span></p>
                    </div>
                </div>

                <div class="order-items" id="lista-pedido-final">
                    <p class="text-center text-muted">Cargando detalles...</p>
                </div>

                <div class="d-flex justify-content-between align-items-center mt-4 border-top pt-3">
                    <span class="h5 fw-bold mb-0 text-dark">Total</span>
                    <span class="h4 fw-bold text-success mb-0" id="total-pedido-final">$0.00</span>
                </div>
            </div>
        </div>
    </section>
@endsection

@push('scripts')
    <script src="{{ asset('js/order.js') }}"></script>
@endpush
