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
     * Photo pool under public/images/ (excludes logo). Used for rotating hero banners and the gallery archive.
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
            '/images/youth.jpg',
            '/images/Youth-engagement.jpeg',
            '/images/Gender-equality.jpeg',
            '/images/Women Empowerment.jpeg',
            '/images/Executive.jpeg',
            '/images/nyalith.jpg',
            '/images/Jok-wuor.jpg',
            '/images/Akon-Mawai.jpg',
            '/images/abong.jpeg',
            '/images/mareng.jpg',
            '/images/nyantet.jpg',
            '/images/rehan.jpg',
            '/images/sabrina.jpg',
            '/images/yaba.jpg',
        ];

        return array_values(array_filter($candidates, function (string $url): bool {
            return is_file(public_path(ltrim($url, '/')));
        }));
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

    public function index()
    {
        return Inertia::render('guest/main/index', [
            'heroImage' => $this->pickRandomHeroImage(),
            'videos' => SiteMediaRepository::videos(),
            'raisedByProgram' => ($raised = FundraisingPrograms::raisedTotals())['usd'],
            'raisedSspByProgram' => $raised['ssp'],
        ]);
    }

    public function about()
    {
        return Inertia::render('guest/about', [
            'heroImage' => $this->pickRandomHeroImage(),
        ]);
    }

    public function contact()
    {
        return Inertia::render('guest/contact', [
            'contact_info' => [
                'email' => 'info@luac-akook-yieu.org',
                'phone' => '0927 779 952',
                'address' => 'Juba, South Sudan',
            ],
        ]);
    }

    public function programs()
    {
        $programs = SiteContentRepository::get()['programs'] ?? [];
        $hero = collect($programs)->pluck('image')->first(fn ($image) => filled($image));

        return Inertia::render('guest/programs', [
            'programsHeroImage' => $this->pickRandomHeroImage() ?: ($hero ?: '/images/education.jpg'),
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
                '/images/Youth-engagement.jpeg',
                '/images/Gender-equality.jpeg',
                '/images/Women Empowerment.jpeg',
                '/images/Executive.jpeg',
                '/images/nyalith.jpg',
                '/images/akur.jpg',
                '/images/chuchu.jpg',
                '/images/Jok-wuor.jpg',
                '/images/Akon-Mawai.jpg',
                '/images/abong.jpeg',
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
        return Inertia::render('guest/team', [
            'heroImage' => $this->pickRandomHeroImage(),
        ]);
    }

    public function videos()
    {
        return Inertia::render('guest/videos', [
            'videos' => SiteMediaRepository::videos(),
            'heroImage' => $this->pickRandomHeroImage(),
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
            'heroImage' => $this->pickRandomHeroImage(),
            'reports' => $published,
        ]);
    }

    public function tawusHub()
    {
        return Inertia::render('guest/tawus-hub', [
            'heroImage' => $this->pickRandomHeroImage(),
        ]);
    }
}
