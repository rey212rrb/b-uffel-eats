<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\OrderController;
use App\Models\Product;


Route::get('/', function () {
    return view('index');
});

Route::get('/shoppingCar', function () {
    return view('shoppingCar');
});

Route::get('/order', function () {
    return view('order');
});

Route::get('/admin', function () {
    return view('admin');
});

Route::get('/inventario', [ProductController::class, 'index'])->name('inventario');
Route::get('/productos/json', [ProductController::class, 'getProductsJson']);
Route::resource('products', ProductController::class)->except(['index']);

Route::post('/pedidos/crear', [OrderController::class, 'store']);
Route::get('/admin/pedidos/json', [OrderController::class, 'getOrdersJson']);
Route::patch('/admin/pedidos/{order}', [OrderController::class, 'updateStatus']);
Route::delete('/admin/pedidos/{order}', [OrderController::class, 'destroy']);
