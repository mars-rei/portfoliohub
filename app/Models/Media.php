<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Media extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'file_name',
        'file_type',
        'caption',
        'cloud_url',
        'cloud_public_id',
    ];

    
    public function projects()
    {
        return $this->belongsToMany(Project::class, 'project_media');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}