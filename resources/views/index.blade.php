@extends('layouts.app')

@section('content')
    <div class="container py-5">

        <h2 class="fw-bold mb-4">Menú de la Cafetería</h2>

        <div class="row mt-4" id="contenedorMenu">
            <div class="col-12 text-center py-5">
                <div class="spinner-border text-success" role="status">
                    <span class="visually-hidden">Cargando menú...</span>
                </div>
                <p class="text-muted mt-2">Cargando delicias...</p>
            </div>
        </div>

    </div>
@endsection

@push('scripts')
    <script src="{{ asset('js/menu.js') }}"></script>
@endpush
