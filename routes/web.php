<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\OrderController;
use App\Models\Product; // Importamos el modelo para la ruta principal

// ==========================================
// 1. RUTAS DE VISTAS (FRONTEND BÁSICO)
// ==========================================

Route::get('/', function () {
    return view('index');
});

Route::get('/shoppingCar', function () {
    return view('shoppingCar');
});

Route::get('/order', function () {
    return view('order'); // Confirmación de compra
});

Route::get('/admin', function () {
    return view('admin'); // Panel del administrador
});


// ==========================================
// 2. RUTAS DE INVENTARIO Y PRODUCTOS
// ==========================================

// Vista de inventario (Conectada al controlador para recibir los productos de la BD)
Route::get('/inventario', [ProductController::class, 'index'])->name('inventario');

// API para que menu.js cargue los productos dinámicamente
Route::get('/productos/json', [ProductController::class, 'getProductsJson']);

// Rutas generadas automáticamente para el CRUD (Crear, Actualizar, Eliminar)
Route::resource('products', ProductController::class)->except(['index']);


// ==========================================
// 3. RUTAS DE PEDIDOS (API PARA FETCH EN JS)
// ==========================================

// Guardar un nuevo pedido desde carrito.js
Route::post('/pedidos/crear', [OrderController::class, 'store']);

// Obtener todas las comandas en tiempo real para admin.js
Route::get('/admin/pedidos/json', [OrderController::class, 'getOrdersJson']);

// Actualizar el estado (Marcar como completado) desde admin.js
// Nota: Usamos {order} para que Laravel inyecte el modelo automáticamente
Route::patch('/admin/pedidos/{order}', [OrderController::class, 'updateStatus']);

// Eliminar un pedido definitivamente desde admin.js
Route::delete('/admin/pedidos/{order}', [OrderController::class, 'destroy']);
