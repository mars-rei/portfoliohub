<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Component extends Model
{
    /** @use HasFactory<\Database\Factories\ComponentFactory> */
    use HasFactory;

    protected $fillable = [
        'name', 
        'library_id', 
        'code'
    ];

    protected $casts = [
        'code' => 'json', 
    ];

    public function library()
    {
        return $this->belongsToMany(Library::class);
    }

    public function pages()
    {
        return $this->belongsToMany(Page::class, 'page_components');
    }
}
