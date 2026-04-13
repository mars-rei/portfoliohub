<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Library extends Model
{
    /** @use HasFactory<\Database\Factories\LibraryFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'industry',
    ];

    public function components()
    {
        return $this->hasMany(Component::class);
    }
}
