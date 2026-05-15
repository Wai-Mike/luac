<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;
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
            '/images/tawus.jpg',
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
        $pool = $this->guestImagePool();
        shuffle($pool);

        return array_slice($pool, 0, min($count, count($pool)));
    }

    private function pickRandomHeroImage(): ?string
    {
        $pool = $this->guestImagePool();
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
                'address' => 'Luac Akok Yieu, South Sudan',
            ],
        ]);
    }

    public function programs()
    {
        return Inertia::render('guest/programs', [
            'programsGallery' => $this->randomGalleryImages(8),
            'programsHeroImage' => $this->pickRandomHeroImage(),
        ]);
    }

    public function fundraising()
    {
        return Inertia::render('guest/fundraising', [
            'heroImage' => $this->pickRandomHeroImage(),
        ]);
    }

    public function gallery()
    {
        return Inertia::render('guest/gallery', [
            'images' => $this->randomGalleryImages(12),
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
        return Inertia::render('guest/team', [
            'teamGallery' => $this->randomGalleryImages(3),
        ]);
    }

    public function reports()
    {
        return Inertia::render('guest/reports', [
            'reportGallery' => $this->randomGalleryImages(6),
            'reports' => [
                [
                    'title' => 'LAYYA annual activity highlights',
                    'period' => '2024',
                    'summary' => 'Summary of youth programs, Tawus Hub sessions, and community events.',
                    'status' => 'upcoming',
                ],
                [
                    'title' => 'Tawus Hub — girls’ skills & wellbeing',
                    'period' => '2024',
                    'summary' => 'Participation in decor, braiding, manicure, pedicure, and mentorship circles.',
                    'status' => 'upcoming',
                ],
                [
                    'title' => 'Youth census & outreach (public summary)',
                    'period' => 'When published',
                    'summary' => 'Non-sensitive community-level summaries when approved for sharing.',
                    'status' => 'placeholder',
                ],
            ],
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
