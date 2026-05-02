@extends('layouts.app')

@section('content')

    <main class="py-5 bg-verde-custom">
        <div class="container bg-white p-4 rounded-4 shadow">
            <h2 class="fw-bold mb-4">Tu Carrito de Compras</h2>
            <div id="lista-carrito">
            </div>
            <div class="mb-4">
                <label for="numeroCuenta" class="form-label fw-bold">Número de Cuenta UNAM</label>
                <input type="text" id="numeroCuenta" class="form-control rounded-3" placeholder="Ej. 424108325" maxlength="10">
                <div id="errorCuenta" class="text-danger small mt-1" style="display: none;">Por favor, ingresa tu número de cuenta.</div>
            </div>
            <hr>
            <div class="d-flex justify-content-between">
                <h4>Total:</h4>
                <h4 id="total-compra">$0.00</h4>
            </div>
            <button class="btn btn-success w-100 mt-3" onclick="realizarPedido(event)">Confirmar Pedido</button>
        </div>
    </main>

@endsection

@push('scripts')
    <script src="{{ asset('js/carrito.js') }}"></script>
@endpush
