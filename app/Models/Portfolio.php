<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Portfolio extends Model
{
    /** @use HasFactory<\Database\Factories\PortfolioFactory> */
    use HasFactory;

    protected $fillable = [
        'user_id',       
        'title',
        'description',
        'industry',
        'canvas_colour',
    ];

    protected $attributes = [
        'canvas_colour' => '#1d2025',
    ];

    /* get user who owns portfolio */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /* portfolio has many pages */
    public function pages()
    {
        return $this->hasMany(Page::class);
    }
}