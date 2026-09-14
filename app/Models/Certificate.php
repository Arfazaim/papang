<?php

namespace App\Models;

use Database\Factories\CertificateFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['name', 'issuer', 'issue_date', 'credential_id', 'credential_url', 'file_path', 'sort_order'])]
class Certificate extends Model
{
    /** @use HasFactory<CertificateFactory> */
    use HasFactory;

    protected function casts(): array
    {
        return [
            'issue_date' => 'date',
        ];
    }

    protected $appends = ['file_url'];

    public function media()
    {
        return $this->morphMany(Media::class, 'mediable');
    }

    public function getFileUrlAttribute()
    {
        return $this->file_path ? asset('storage/' . $this->file_path) : null;
    }
}
