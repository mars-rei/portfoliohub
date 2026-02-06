<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Page extends Model
{
    /** @use HasFactory<\Database\Factories\PageFactory> */
    use HasFactory;

    protected $fillable = [
        'page_name',
        'code',
    ];

    public function components()
    {
        return $this->belongsToMany(Component::class, 'page_components');
    }
}
