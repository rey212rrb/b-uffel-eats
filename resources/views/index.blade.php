@extends('layouts.app')

@section('content')
    <div class="position-relative d-flex align-items-center justify-content-center"
         style="height: 400px; background-image: url('https://imgs.search.brave.com/c3Nab21x5rsWPzXPiHclcGkyLhDfe8zA6KCIYoKmN40/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/ZmNhLnVuYW0ubXgv/aW1nL2luc3RhbGFj/aW9uZXMvYWRtaW5f/ZXNjb2xhci9hZG1f/ZXNjb2xhcjIuanBn'); background-size: cover; background-position: center;">

        <div class="position-absolute top-0 start-0 w-100 h-100" style="background-color: rgba(0, 0, 0, 0.6);"></div>

        <div class="position-relative text-center text-white z-1 px-3">
            <h1 class="display-3 fw-bold mb-3">Büffel Eats</h1>
            <p class="lead fs-4 fst-italic">CUUUUUUU, CUUUUUUUU. PUUUMAAAS!!!</p>
        </div>
    </div>

    <div style="background-color: #023b22; min-height: calc(100vh - 400px);">
        <div class="container py-5">

            <h4 class="fw-bold mb-4 text-white">
                <i class="bi bi-cup-hot me-2 text-warning"></i>Nuestro Menú
            </h4>

            <div class="row mt-4" id="contenedorMenu">
                <div class="col-12 text-center py-5">
                    <div class="spinner-border text-light" role="status">
                        <span class="visually-hidden">Cargando menú...</span>
                    </div>
                    <p class="text-light mt-2">Cargando delicias...</p>
                </div>
            </div>

        </div>
    </div>
@endsection

@push('scripts')
    <script src="{{ asset('js/menu.js') }}"></script>
@endpush
