<?php

namespace App\Models;

use Database\Factories\TechnologyFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['name', 'slug', 'icon', 'color'])]
class Technology extends Model
{
    /** @use HasFactory<TechnologyFactory> */
    use HasFactory;

    public function projects()
    {
        return $this->belongsToMany(Project::class, 'project_technology');
    }

    public function experiences()
    {
        return $this->belongsToMany(Experience::class, 'experience_technology');
    }
}
