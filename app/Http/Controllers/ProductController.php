<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::all();
        return view('inventory', compact('products'));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'image' => 'required|string',
        ]);

        Product::create($validated);

        return redirect()->route('inventario')->with('success', 'Producto agregado correctamente.');
    }

    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'image' => 'required|string',
        ]);

        $product->update($validated);

        return redirect()->route('inventario')->with('success', 'Producto actualizado.');
    }

    public function getProductsJson()
    {

        $products = Product::all();
        return response()->json($products);
    }

    public function destroy(Product $product)
    {
        $product->delete();

        return redirect()->route('inventario')->with('success', 'Producto eliminado.');
    }
}
