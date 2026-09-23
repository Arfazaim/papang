<?php

namespace App\Models;

use Database\Factories\ProjectFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

#[Fillable(['category_id', 'title', 'slug', 'short_description', 'full_description', 'problem', 'goals', 'features', 'architecture', 'challenges', 'solutions', 'lessons_learned', 'demo_url', 'github_url', 'cover_image', 'status', 'is_featured', 'started_at', 'completed_at', 'sort_order'])]
class Project extends Model
{
    /** @use HasFactory<ProjectFactory> */
    use HasFactory;

    use SoftDeletes;

    protected $appends = ['cover_image_url'];

    protected function casts(): array
    {
        return [
            'is_featured' => 'boolean',
            'started_at' => 'date',
            'completed_at' => 'date',
        ];
    }

    public function getCoverImageUrlAttribute(): ?string
    {
        return $this->cover_image ? asset('storage/'.$this->cover_image) : null;
    }

    public function category()
    {
        return $this->belongsTo(ProjectCategory::class, 'category_id');
    }

    public function technologies()
    {
        return $this->belongsToMany(Technology::class, 'project_technology');
    }

    public function media()
    {
        return $this->morphMany(Media::class, 'mediable');
    }
}
