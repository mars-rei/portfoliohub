<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\Library;

class LibrarySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $libraries = [
            // shapes library
            [
                'name' => 'Shapes'
            ],
            
            // general library
            [
                'name' => 'General'
            ],

            // embeds library
            [
                'name' => 'Embeds'
            ],

            // music library
            [
                'name' => 'Music',
                'industry' => 'Music'
            ],
        ];

        foreach ($libraries as $library) {
            Library::create($library);
        }
    }
}