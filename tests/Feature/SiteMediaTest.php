<?php

namespace Tests\Feature;

use App\Models\SiteMedia;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class SiteMediaTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_upload_a_gallery_image(): void
    {
        Storage::fake('public');
        $admin = User::factory()->admin()->create();
        $file = $this->uploadedJpeg('tawus.jpg');

        $this->actingAs($admin)
            ->post(route('admin.media.store'), [
                'kind' => SiteMedia::KIND_GALLERY,
                'title' => 'Tawus Day',
                'caption' => 'Community gathering',
                'category' => 'Tawus Hub',
                'file' => $file,
            ])
            ->assertRedirect(route('admin.media.index', ['kind' => 'gallery']));

        $this->assertDatabaseHas('site_media', [
            'kind' => SiteMedia::KIND_GALLERY,
            'title' => 'Tawus Day',
            'category' => 'Tawus Hub',
        ]);

        $media = SiteMedia::query()->first();
        Storage::disk('public')->assertExists($media->path);

        $this->get(route('gallery'))
            ->assertOk()
            ->assertInertia(fn ($page) => $page
                ->component('guest/gallery')
                ->where('items.0.caption', 'Tawus Day')
                ->where('items.0.category', 'Tawus Hub'));
    }

    public function test_admin_can_add_a_youtube_video(): void
    {
        $admin = User::factory()->admin()->create();

        $this->actingAs($admin)
            ->post(route('admin.media.store'), [
                'kind' => SiteMedia::KIND_VIDEO,
                'title' => 'Sports day',
                'caption' => 'Unity matches',
                'category' => 'Sports',
                'year' => '2026',
                'source' => 'youtube',
                'youtube_url' => 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            ])
            ->assertRedirect(route('admin.media.index', ['kind' => 'video']));

        $this->assertDatabaseHas('site_media', [
            'kind' => SiteMedia::KIND_VIDEO,
            'title' => 'Sports day',
            'youtube_id' => 'dQw4w9WgXcQ',
            'source' => 'youtube',
        ]);

        $this->get(route('videos'))
            ->assertOk()
            ->assertInertia(fn ($page) => $page
                ->component('guest/videos')
                ->where('videos.0.title', 'Sports day')
                ->where('videos.0.youtubeId', 'dQw4w9WgXcQ'));
    }

    public function test_viewer_cannot_upload_media(): void
    {
        Storage::fake('public');
        $viewer = User::factory()->executive()->create();

        $this->actingAs($viewer)
            ->post(route('admin.media.store'), [
                'kind' => SiteMedia::KIND_GALLERY,
                'title' => 'Blocked',
                'file' => $this->uploadedJpeg('blocked.jpg'),
            ])
            ->assertRedirect();

        $this->assertDatabaseMissing('site_media', ['title' => 'Blocked']);
    }

    public function test_viewer_can_open_the_media_page(): void
    {
        $viewer = User::factory()->executive()->create();

        $this->actingAs($viewer)
            ->get(route('admin.media.index'))
            ->assertOk();
    }

    public function test_admin_can_upload_a_leadership_portrait(): void
    {
        Storage::fake('public');
        $admin = User::factory()->admin()->create();

        $this->actingAs($admin)
            ->from(route('admin.content.site.edit'))
            ->post(route('admin.media.portrait'), [
                'image' => $this->uploadedJpeg('chairman.jpg'),
            ])
            ->assertRedirect(route('admin.content.site.edit'));

        $this->assertNotEmpty(session('uploaded_image'));
    }

    private function uploadedJpeg(string $name): UploadedFile
    {
        $source = public_path('images/logo.jpg');
        $this->assertFileExists($source);

        $temp = tempnam(sys_get_temp_dir(), 'layya');
        copy($source, $temp);

        return new UploadedFile($temp, $name, 'image/jpeg', null, true);
    }
}
