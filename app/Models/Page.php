<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Page extends Model
{
    /** @use HasFactory<\Database\Factories\PageFactory> */
    use HasFactory;

    protected $fillable = [
        'portfolio_id',
        'page_name',
        'code',
    ];

    protected $casts = [
        'code' => 'json', 
    ];

    public function portfolio()
    {
        return $this->belongsTo(Portfolio::class);
    }

    public function components()
    {
        return $this->belongsToMany(Component::class, 'page_components');
    }
}
