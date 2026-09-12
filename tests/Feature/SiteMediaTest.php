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
                ->has('videos')
                ->where('items.0.caption', 'Community gathering')
                ->where('items.0.title', 'Tawus Day')
                ->where('items.0.category', 'Tawus Hub'));
    }

    public function test_admin_can_edit_a_published_gallery_caption(): void
    {
        Storage::fake('public');
        $admin = User::factory()->admin()->create();
        $media = SiteMedia::query()->create([
            'kind' => SiteMedia::KIND_GALLERY,
            'title' => 'Tawus Day',
            'caption' => 'Old caption',
            'category' => 'Tawus Hub',
            'source' => 'upload',
            'path' => 'media/gallery/tawus.jpg',
            'status' => 'visible',
        ]);

        $this->actingAs($admin)
            ->put(route('admin.media.update', $media), [
                'title' => 'Tawus Day 2025',
                'caption' => 'Girls, mentors, and families celebrating at Tawus Hub.',
                'category' => 'Tawus Hub',
            ])
            ->assertRedirect(route('admin.media.index', ['kind' => 'gallery']));

        $this->assertDatabaseHas('site_media', [
            'id' => $media->id,
            'title' => 'Tawus Day 2025',
            'caption' => 'Girls, mentors, and families celebrating at Tawus Hub.',
        ]);

        $this->get(route('gallery'))
            ->assertOk()
            ->assertInertia(fn ($page) => $page
                ->where('items.0.title', 'Tawus Day 2025')
                ->where('items.0.caption', 'Girls, mentors, and families celebrating at Tawus Hub.'));
    }

    public function test_viewer_cannot_edit_media(): void
    {
        $viewer = User::factory()->executive()->create();
        $media = SiteMedia::query()->create([
            'kind' => SiteMedia::KIND_GALLERY,
            'title' => 'Tawus Day',
            'caption' => 'Keep this',
            'source' => 'upload',
            'path' => 'media/gallery/tawus.jpg',
            'status' => 'visible',
        ]);

        $this->actingAs($viewer)
            ->put(route('admin.media.update', $media), [
                'title' => 'Changed',
                'caption' => 'Should not save',
            ])
            ->assertRedirect();

        $this->assertDatabaseHas('site_media', [
            'id' => $media->id,
            'title' => 'Tawus Day',
            'caption' => 'Keep this',
        ]);
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

    public function test_admin_gallery_includes_photos_already_on_the_website(): void
    {
        $admin = User::factory()->admin()->create();

        $this->actingAs($admin)
            ->get(route('admin.media.index', ['kind' => 'gallery']))
            ->assertOk()
            ->assertInertia(fn ($page) => $page
                ->component('admin/media/index')
                ->where('items.data.0.path', '/images/cover.jpg'));

        $this->assertDatabaseHas('site_media', [
            'kind' => SiteMedia::KIND_GALLERY,
            'source' => 'bundled',
            'path' => '/images/cover.jpg',
        ]);

        $this->get(route('gallery'))
            ->assertOk()
            ->assertInertia(fn ($page) => $page
                ->where('items.0.src', '/images/cover.jpg'));
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

    public function test_public_storage_files_are_served_over_http(): void
    {
        $relative = 'media/portraits/chairman-test.jpg';
        $full = storage_path('app/public/'.$relative);
        @mkdir(dirname($full), 0777, true);
        copy(public_path('images/logo.jpg'), $full);

        try {
            $this->get('/storage/'.$relative)
                ->assertOk()
                ->assertHeader('content-type', 'image/jpeg');
        } finally {
            @unlink($full);
        }
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
