<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Media extends Model
{
    /** @use HasFactory<\Database\Factories\MediaFactory> */
    use HasFactory;

    protected $fillable = [
        'file_name',
        'file_type',
        'caption',
        'cloud_url',
    ];

    public function projects()
    {
        return $this->belongsToMany(Project::class, 'project_media');
    }
}
