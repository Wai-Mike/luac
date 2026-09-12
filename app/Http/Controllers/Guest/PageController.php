<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;
use App\Support\FundraisingPrograms;
use App\Support\SiteContentRepository;
use App\Support\SiteMediaRepository;
use Inertia\Inertia;

class PageController extends Controller
{
    /**
     * Photo pool under public/images/ (excludes logo). Used for rotating gallery strips.
     *
     * @return list<string>
     */
    private function guestImagePool(): array
    {
        $candidates = [
            '/images/akur.jpg',
            '/images/chuchu.jpg',
            '/images/cover.jpg',
            '/images/cover1.jpg',
            '/images/education.jpg',
            '/images/education1.jpg',
            '/images/football.jpg',
            '/images/mareng.jpg',
            '/images/nyalith.jpg',
            '/images/nyantet.jpg',
            '/images/rehan.jpg',
            '/images/sabrina.jpg',
            '/images/yaba.jpg',
            '/images/youth.jpg',
        ];

        return array_values(array_filter($candidates, function (string $url): bool {
            return is_file(public_path(ltrim($url, '/')));
        }));
    }

    /**
     * @return list<string>
     */
    private function randomGalleryImages(int $count): array
    {
        $uploaded = SiteMediaRepository::imageUrls($count);
        if ($uploaded !== []) {
            return $uploaded;
        }

        $pool = $this->guestImagePool();
        shuffle($pool);

        return array_slice($pool, 0, min($count, count($pool)));
    }

    private function pickRandomHeroImage(): ?string
    {
        $wide = array_values(array_filter($this->guestImagePool(), function (string $url): bool {
            return in_array($url, [
                '/images/cover.jpg',
                '/images/cover1.jpg',
                '/images/education.jpg',
                '/images/education1.jpg',
                '/images/football.jpg',
            ], true);
        }));

        $pool = $wide !== [] ? $wide : $this->guestImagePool();
        if ($pool === []) {
            return null;
        }
        shuffle($pool);

        return $pool[0];
    }

    /**
     * Random URLs from the guest image pool; paths may repeat (e.g. one image per card when the pool is small).
     *
     * @return list<string>
     */
    private function randomImagesFromPool(int $count): array
    {
        $pool = $this->guestImagePool();
        if ($pool === [] || $count < 1) {
            return [];
        }

        $out = [];
        for ($i = 0; $i < $count; $i++) {
            $out[] = $pool[array_rand($pool)];
        }

        return $out;
    }

    public function index()
    {
        return Inertia::render('guest/main/index', [
            'heroImage' => $this->pickRandomHeroImage(),
            'homeGallery' => $this->randomGalleryImages(6),
            'videos' => SiteMediaRepository::videos(),
            'raisedByProgram' => ($raised = FundraisingPrograms::raisedTotals())['usd'],
            'raisedSspByProgram' => $raised['ssp'],
        ]);
    }

    public function about()
    {
        return Inertia::render('guest/about', [
            'aboutGallery' => $this->randomGalleryImages(6),
        ]);
    }

    public function contact()
    {
        return Inertia::render('guest/contact', [
            'contact_info' => [
                'email' => config('mail.from.address', 'contact@example.org'),
                'phone' => '+211 XXX XXX XXX',
                'address' => 'Luac Akook De Yieu, South Sudan',
            ],
        ]);
    }

    public function programs()
    {
        $programs = SiteContentRepository::get()['programs'] ?? [];
        $hero = collect($programs)->pluck('image')->first(fn ($image) => filled($image));

        return Inertia::render('guest/programs', [
            'programsHeroImage' => $hero ?: '/images/education.jpg',
        ]);
    }

    public function fundraising()
    {
        $raised = FundraisingPrograms::raisedTotals();

        return Inertia::render('guest/fundraising', [
            'heroImage' => $this->pickRandomHeroImage(),
            'raisedByProgram' => $raised['usd'],
            'raisedSspByProgram' => $raised['ssp'],
            'selectedProgram' => request('program'),
        ]);
    }

    public function gallery()
    {
        return Inertia::render('guest/gallery', [
            'images' => array_values(array_intersect($this->guestImagePool(), [
                '/images/cover.jpg',
                '/images/cover1.jpg',
                '/images/education.jpg',
                '/images/education1.jpg',
                '/images/football.jpg',
                '/images/youth.jpg',
                '/images/tawus.jpg',
            ])),
            'items' => SiteMediaRepository::gallery(),
            'videos' => SiteMediaRepository::videos(),
        ]);
    }

    public function impact()
    {
        return Inertia::render('guest/impact');
    }

    public function news()
    {
        return Inertia::render('guest/news');
    }

    public function getInvolved()
    {
        return Inertia::render('guest/get-involved');
    }

    public function faq()
    {
        return Inertia::render('guest/faq');
    }

    public function team()
    {
        return Inertia::render('guest/team');
    }

    public function videos()
    {
        return Inertia::render('guest/videos', [
            'videos' => SiteMediaRepository::videos(),
        ]);
    }

    public function reports()
    {
        $published = \Illuminate\Support\Facades\Schema::hasTable('association_reports')
            ? \App\Models\AssociationReport::query()
                ->where('is_public', true)
                ->where('status', 'published')
                ->latest()
                ->get(['title', 'period', 'summary', 'status'])
                ->all()
            : [];

        return Inertia::render('guest/reports', [
            'reportGallery' => $this->randomGalleryImages(6),
            'reports' => $published,
        ]);
    }

    public function tawusHub()
    {
        return Inertia::render('guest/tawus-hub', [
            'galleryImages' => $this->randomGalleryImages(9),
            'heroImage' => $this->pickRandomHeroImage(),
        ]);
    }
}
