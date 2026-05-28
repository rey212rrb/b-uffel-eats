<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    // Método para obtener los JSON para tu admin.js (GET)
    public function getOrdersJson()
    {
        // Obtenemos las órdenes ordenadas por la más reciente
        $orders = Order::orderBy('created_at', 'desc')->get();
        return response()->json($orders);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'client_name' => 'required|string|max:255',
            'total' => 'required|numeric|min:0',
            'cart_items' => 'required|array|min:1',
            'cart_items.*.id' => 'required|exists:products,id',
            'cart_items.*.quantity' => 'required|integer|min:1',
            'cart_items.*.price' => 'required|numeric|min:0',
        ]);

        $order = DB::transaction(function () use ($validated) {

            $newOrder = Order::create([
                'client_name' => $validated['client_name'],
                'total' => $validated['total'],
                'status' => 'En preparación'
            ]);

            foreach ($validated['cart_items'] as $item) {
                $newOrder->products()->attach($item['id'], [
                    'quantity' => $item['quantity'],
                    'price' => $item['price']
                ]);
            }

            return $newOrder;
        });

        return response()->json([
            'message' => 'Orden generada con éxito',
            'order_id' => $order->id
        ]);
    }

    public function updateStatus(Request $request, Order $order)
    {
        $order->update(['status' => 'Completado']);
        return response()->json(['message' => 'Estado actualizado']);
    }

    public function destroy(Order $order)
    {
        $order->delete();
        return response()->json(['message' => 'Pedido eliminado']);
    }
}
