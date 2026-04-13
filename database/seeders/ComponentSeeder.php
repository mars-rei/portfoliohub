<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\Component;

class ComponentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $components = [
            // shapes
            [
                'name' => 'Square',
                'library_id' => 1, 
                'code' => json_encode([
                    'type' => 'square',
                    'default_styles' => [
                        'x' => 0, 'y' => 0,
                        'width' => 100, 'height' => 100,
                        'fill' => '#545454'
                    ]
                ])
            ],
            [
                'name' => 'Rectangle',
                'library_id' => 1,
                'code' => json_encode([
                    'type' => 'rectangle',
                    'default_styles' => [
                        'x' => 0, 'y' => 0,
                        'width' => 200, 'height' => 100,
                        'fill' => '#545454'
                    ]
                ])
            ],
            [
                'name' => 'Triangle',
                'library_id' => 1,
                'code' => json_encode([
                    'type' => 'triangle',
                    'default_styles' => [
                        'x' => 0, 'y' => 0,
                        'width' => 100, 'height' => 100,
                        'fill' => '#545454'
                    ]
                ])
            ],
            [
                'name' => 'Circle',
                'library_id' => 1,
                'code' => json_encode([
                    'type' => 'circle',
                    'default_styles' => [
                        'x' => 0, 'y' => 0,
                        'width' => 100, 'height' => 100,
                        'fill' => '#545454'
                    ]
                ])
            ],
            [
                'name' => 'Star',
                'library_id' => 1,
                'code' => json_encode([
                    'type' => 'star',
                    'default_styles' => [
                        'x' => 0, 'y' => 0,
                        'width' => 100, 'height' => 100,
                        'fill' => '#545454'
                    ]
                ])
            ],
            
            // shapes by mo
            [
                'name' => 'Shape 1',
                'library_id' => 1,
                'code' => json_encode([
                    'type' => 'chart',
                    'default_styles' => [
                        'x' => 0, 'y' => 0,
                        'width' => 100, 'height' => 100,
                        'fill' => '#2E8B57'
                    ]
                ])
            ],
            [
                'name' => 'Shape 2',
                'library_id' => 1,
                'code' => json_encode([
                    'type' => 'team',
                    'default_styles' => [
                        'x' => 0, 'y' => 0,
                        'width' => 100, 'height' => 100,
                        'fill' => '#4169E1'
                    ]
                ])
            ],


            // general library
            [
                'name' => 'Text',
                'library_id' => 2, 
                'code' => json_encode([
                    'type' => 'text',
                    'default_styles' => [
                        'x' => 0, 'y' => 0,
                        'width' => 'auto', 'height' => 'auto'
                    ]
                ])
            ],
            [
                'name' => 'Slides',
                'library_id' => 2, 
                'code' => json_encode([
                    'type' => 'slides',
                    'default_styles' => [
                        'x' => 0, 'y' => 0,
                        'width' => 400, 'height' => 150
                    ]
                ])
            ],
            [
                'name' => 'Carousel',
                'library_id' => 2, 
                'code' => json_encode([
                    'type' => 'carousel',
                    'default_styles' => [
                        'x' => 0, 'y' => 0,
                        'width' => 400, 'height' => 150
                    ]
                ])
            ],

            // embeds library


            // music library
        ];
        
        foreach ($components as $component) {
            Component::create($component);
        }
    }
}
