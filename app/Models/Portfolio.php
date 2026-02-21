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
        'publish_status',
        'code',
    ];

    protected $casts = [
        'publish_status' => 'boolean',
        'code' => 'array',
    ];

    /* get user who owns portfolio */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}