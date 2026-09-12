<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Media;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class MediaController extends Controller
{
    public function index()
    {
        $media = Media::with('mediable')->orderBy('created_at', 'desc')->paginate(20);

        return Inertia::render('Admin/Media/Index', [
            'media' => $media,
        ]);
    }

    public function destroy(Media $media)
    {
        // Delete the file from storage
        if (Storage::disk($media->disk)->exists($media->path)) {
            Storage::disk($media->disk)->delete($media->path);
        }

        // Delete from database
        $media->delete();

        return redirect()->back()->with('success', 'Media deleted successfully.');
    }
}
