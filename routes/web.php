<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

Route::get('/', function () {
    return view('index');
});

Route::get('/admin', function () {
    return view('admin');
});

Route::get('/inventario', function () {
    return view('inventory');
});

Route::get('/shoppingCar', function () {
    return view('shoppingCar');
});

Route::get('/order', function () {
    return view('order');
});

Route::patch('/admin/pedidos/{id}', function ($id) {
    return response()->json(['res' => 'Pedido actualizado']);
});

Route::delete('/admin/pedidos/{id}', function ($id) {
    return response()->json([
        'message' => "Pedido #{$id} eliminado correctamente",
        'id' => $id
    ]);
});

Route::post('/pedidos/crear', function (Request $request) {

    return response()->json([
        'mensaje' => 'Pedido recibido correctamente',
        'status' => 'success'
    ]);
});

