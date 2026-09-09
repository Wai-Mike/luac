<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SiteMedia;
use App\Support\YoutubeUrl;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class MediaController extends Controller
{
    public function index(Request $request): Response
    {
        $kind = $request->string('kind')->toString();
        $kind = in_array($kind, [SiteMedia::KIND_GALLERY, SiteMedia::KIND_VIDEO], true) ? $kind : SiteMedia::KIND_GALLERY;

        $items = SiteMedia::query()
            ->where('kind', $kind)
            ->latest()
            ->paginate(18)
            ->withQueryString();

        return Inertia::render('admin/media/index', [
            'items' => $items,
            'kind' => $kind,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $kind = $request->input('kind', SiteMedia::KIND_GALLERY);
        $validated = $this->validated($request, $kind);
        $payload = $this->payloadFrom($request, $validated);
        $payload['created_by'] = $request->user()?->id;

        SiteMedia::query()->create($payload);

        return redirect()
            ->route('admin.media.index', ['kind' => $kind])
            ->with('success', $kind === SiteMedia::KIND_VIDEO ? 'Video added to the archive.' : 'Image added to the gallery.');
    }

    public function destroy(SiteMedia $site_media): RedirectResponse
    {
        $kind = $site_media->kind;
        $this->deleteStored($site_media->path);
        $this->deleteStored($site_media->poster_path);
        $site_media->delete();

        return redirect()
            ->route('admin.media.index', ['kind' => $kind])
            ->with('success', 'Media removed.');
    }

    public function uploadPortrait(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'image' => ['required', 'image', 'max:8192'],
        ]);

        $path = $validated['image']->store('media/portraits', 'public');

        return back()->with('uploaded_image', '/storage/'.ltrim($path, '/'));
    }

    /**
     * @return array<string, mixed>
     */
    private function validated(Request $request, string $kind): array
    {
        $rules = [
            'kind' => ['required', Rule::in([SiteMedia::KIND_GALLERY, SiteMedia::KIND_VIDEO])],
            'title' => ['required', 'string', 'max:255'],
            'caption' => ['nullable', 'string', 'max:1000'],
            'category' => ['nullable', 'string', 'max:80'],
            'year' => ['nullable', 'string', 'max:40'],
        ];

        if ($kind === SiteMedia::KIND_VIDEO) {
            $rules['source'] = ['required', Rule::in(['upload', 'youtube'])];
            $rules['youtube_url'] = [$request->input('source') === 'youtube' ? 'required' : 'nullable', 'string', 'max:500'];
            $rules['file'] = [$request->input('source') === 'upload' ? 'required' : 'nullable', 'file', 'mimetypes:video/mp4,video/quicktime,video/webm', 'max:51200'];
            $rules['poster'] = ['nullable', 'image', 'max:8192'];
        } else {
            $rules['file'] = ['required', 'image', 'max:8192'];
        }

        $validated = $request->validate($rules);

        if (($validated['source'] ?? null) === 'youtube' && ! YoutubeUrl::id($validated['youtube_url'] ?? null)) {
            throw ValidationException::withMessages([
                'youtube_url' => 'Enter a valid YouTube link.',
            ]);
        }

        return $validated;
    }

    /**
     * @param  array<string, mixed>  $validated
     * @return array<string, mixed>
     */
    private function payloadFrom(Request $request, array $validated): array
    {
        $kind = $validated['kind'];
        $youtubeId = YoutubeUrl::id($validated['youtube_url'] ?? null);
        $path = null;
        $poster = null;

        if ($request->hasFile('file')) {
            $folder = $kind === SiteMedia::KIND_VIDEO ? 'media/videos' : 'media/gallery';
            $path = $request->file('file')->store($folder, 'public');
        }

        if ($request->hasFile('poster')) {
            $poster = $request->file('poster')->store('media/posters', 'public');
        }

        return [
            'kind' => $kind,
            'title' => $validated['title'],
            'caption' => $validated['caption'] ?? null,
            'category' => $validated['category'] ?? null,
            'year' => $validated['year'] ?? null,
            'source' => $kind === SiteMedia::KIND_VIDEO ? ($validated['source'] ?? 'youtube') : 'upload',
            'path' => $path,
            'poster_path' => $poster,
            'youtube_url' => $validated['youtube_url'] ?? null,
            'youtube_id' => $youtubeId,
            'status' => 'visible',
        ];
    }

    private function deleteStored(?string $path): void
    {
        if ($path && ! str_starts_with($path, '/') && ! str_starts_with($path, 'http')) {
            Storage::disk('public')->delete($path);
        }
    }
}
