@extends('layouts.app')

@section('content')
    <main class="py-5" style="background-color: #003121; min-height: 100vh;">
        <div class="container">
            <h2 class="fw-bold mb-4 text-white">Nuestro Menú</h2>

            <div id="contenedorMenu" class="row g-4"></div>

        </div>
    </main>
@endsection

@push('scripts')
    <script src="{{ asset('js/menu.js') }}"></script>
@endpush
