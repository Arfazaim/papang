<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Media;
use Illuminate\Http\Request;
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

    public function store(Request $request)
    {
        $request->validate([
            'file' => 'required|file|max:10240', // max 10MB
            'alt_text' => 'nullable|string|max:255',
        ]);

        $file = $request->file('file');
        $path = $file->store('media', 'public');

        Media::create([
            'filename' => basename($path),
            'original_name' => $file->getClientOriginalName(),
            'mime_type' => $file->getMimeType(),
            'size' => $file->getSize(),
            'disk' => 'public',
            'path' => $path,
            'alt_text' => $request->input('alt_text'),
            'sort_order' => 0,
        ]);

        return redirect()->back()->with('success', 'Media uploaded successfully.');
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
