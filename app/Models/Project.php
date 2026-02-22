<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    /** @use HasFactory<\Database\Factories\ProjectFactory> */
    use HasFactory;

    protected $fillable = [
        'user_id', 
        'title',
        'description',
        'started_on',
        'ended_on',
    ];

    protected $casts = [
        'started_on' => 'date',
        'ended_on' => 'date',
    ];

    public function media()
    {
        return $this->belongsToMany(Media::class, 'project_media');
    }

    /* get user who owns project */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}