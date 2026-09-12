<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SiteMedia;
use App\Support\SiteMediaRepository;
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

        if ($kind === SiteMedia::KIND_GALLERY) {
            SiteMediaRepository::syncBundledGallery();
        }

        $items = SiteMedia::query()
            ->where('kind', $kind)
            ->orderBy('sort_order')
            ->latest()
            ->paginate(60)
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

    public function update(Request $request, SiteMedia $site_media): RedirectResponse
    {
        $validated = $this->validated($request, $site_media->kind, updating: true);

        $payload = [
            'title' => $validated['title'],
            'caption' => $validated['caption'] ?? null,
            'category' => $validated['category'] ?? $site_media->category,
            'year' => $validated['year'] ?? $site_media->year,
        ];

        if ($site_media->kind === SiteMedia::KIND_VIDEO && filled($validated['youtube_url'] ?? null)) {
            $payload['youtube_url'] = $validated['youtube_url'];
            $payload['youtube_id'] = YoutubeUrl::id($validated['youtube_url']);
            $payload['source'] = 'youtube';
        }

        if ($request->hasFile('file')) {
            $this->deleteStored($site_media->path);
            $folder = $site_media->kind === SiteMedia::KIND_VIDEO ? 'media/videos' : 'media/gallery';
            $payload['path'] = $request->file('file')->store($folder, 'public');
            if ($site_media->kind === SiteMedia::KIND_VIDEO) {
                $payload['source'] = 'upload';
            }
        }

        if ($request->hasFile('poster')) {
            $this->deleteStored($site_media->poster_path);
            $payload['poster_path'] = $request->file('poster')->store('media/posters', 'public');
        }

        $site_media->update($payload);

        return redirect()
            ->route('admin.media.index', ['kind' => $site_media->kind])
            ->with('success', 'Caption and details saved.');
    }

    public function destroy(SiteMedia $site_media): RedirectResponse
    {
        $this->deleteStored($site_media->path);
        $this->deleteStored($site_media->poster_path);
        $site_media->delete();

        return back()->with('success', 'Media removed.');
    }

    public function approve(SiteMedia $site_media): RedirectResponse
    {
        $site_media->update(['status' => 'visible']);

        return back()->with('success', 'Media approved.');
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
    private function validated(Request $request, string $kind, bool $updating = false): array
    {
        $rules = [
            'title' => ['required', 'string', 'max:255'],
            'caption' => ['nullable', 'string', 'max:1000'],
            'category' => ['nullable', 'string', 'max:80'],
            'year' => ['nullable', 'string', 'max:40'],
        ];

        if (! $updating) {
            $rules['kind'] = ['required', Rule::in([SiteMedia::KIND_GALLERY, SiteMedia::KIND_VIDEO])];
        }

        if ($kind === SiteMedia::KIND_VIDEO) {
            if ($updating) {
                $rules['youtube_url'] = ['nullable', 'string', 'max:500'];
                $rules['file'] = ['nullable', 'file', 'mimetypes:video/mp4,video/quicktime,video/webm', 'max:51200'];
            } else {
                $rules['source'] = ['required', Rule::in(['upload', 'youtube'])];
                $rules['youtube_url'] = [$request->input('source') === 'youtube' ? 'required' : 'nullable', 'string', 'max:500'];
                $rules['file'] = [$request->input('source') === 'upload' ? 'required' : 'nullable', 'file', 'mimetypes:video/mp4,video/quicktime,video/webm', 'max:51200'];
            }
            $rules['poster'] = ['nullable', 'image', 'max:8192'];
        } else {
            $rules['file'] = [$updating ? 'nullable' : 'required', 'image', 'max:8192'];
        }

        $validated = $request->validate($rules);

        $youtubeRequired = ($validated['source'] ?? null) === 'youtube' || filled($validated['youtube_url'] ?? null);
        if ($youtubeRequired && ! YoutubeUrl::id($validated['youtube_url'] ?? null)) {
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
