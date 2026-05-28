<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product; // Importamos tu modelo

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        Product::create([
            'name' => 'Café Americano',
            'category' => 'Bebidas',
            'description' => 'Café americano clásico, recién hecho con granos de altura.',
            'price' => 25.00,
            'image' => 'https://images.unsplash.com/photo-1551030173-122aabc4489c?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
        ]);

        Product::create([
            'name' => 'Galleta con Chispas',
            'category' => 'Postres',
            'description' => 'Galleta artesanal con chispas de chocolate semiamargo.',
            'price' => 18.00,
            'image' => 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
        ]);
    }
}
