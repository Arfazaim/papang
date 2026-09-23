<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateProjectRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:projects,slug,'.$this->route('project')->id,
            'category_id' => 'nullable|exists:project_categories,id',
            'short_description' => 'required|string',
            'full_description' => 'nullable|string',
            'problem' => 'nullable|string',
            'goals' => 'nullable|string',
            'features' => 'nullable|string',
            'architecture' => 'nullable|string',
            'challenges' => 'nullable|string',
            'solutions' => 'nullable|string',
            'lessons_learned' => 'nullable|string',
            'status' => 'required|in:draft,published,archived',
            'is_featured' => 'boolean',
            'demo_url' => 'nullable|url|max:255',
            'github_url' => 'nullable|url|max:255',
            'cover_image' => 'nullable|image|max:2048',
            'started_at' => 'nullable|date',
            'completed_at' => 'nullable|date',
            'sort_order' => 'integer',
            'technologies' => 'array',
            'technologies.*' => 'exists:technologies,id',
        ];
    }
}
