<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Component extends Model
{
    /** @use HasFactory<\Database\Factories\ComponentFactory> */
    use HasFactory;

    public function pages()
    {
        return $this->belongsToMany(Page::class, 'page_components');
    }

    public function libraries()
    {
        return $this->belongsToMany(Library::class, 'library_components');
    }
}
