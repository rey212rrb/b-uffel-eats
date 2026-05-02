<!-- Header -->
<header id="header-placeholder" class="shadow-lg" style="position: sticky; top: 0; z-index: 1000; background-color: #00251a;">
    <nav class="navbar navbar-custom py-3">
        <div class="container">
            <a class="navbar-brand d-flex align-items-center" href="{{ url('/') }}">
                <i class="bi bi-cart3 me-2"></i> <span class="fw-bold">Büffel Eats</span>
            </a>
            <a href="{{ url('/shoppingCar') }}" class="btn btn-gold rounded-pill px-3">
                <i class="bi bi-box-seam me-2"></i>
                <span id="contador-articulos">0 artículos</span>
            </a>
        </div>
    </nav>
</header>
