<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class PageController extends Controller
{
    public function index()
    {
        return Inertia::render('guest/main/index', [
            'features' => [
                [
                    'title' => 'Youth leadership',
                    'description' => 'Programs that build confidence, responsibility, and voice for young people in Luac Akok Yieu and beyond.',
                    'icon' => 'leadership',
                ],
                [
                    'title' => 'Skills & education',
                    'description' => 'Workshops and learning opportunities that prepare youth for work, civic life, and entrepreneurship.',
                    'icon' => 'education',
                ],
                [
                    'title' => 'Community & sports',
                    'description' => 'Safe spaces to connect, play, and organize around shared goals for peace and development.',
                    'icon' => 'community',
                ],
            ],
            'stats' => [
                'members' => 500,
                'programs' => 12,
                'communities' => 8,
                'events' => 24,
            ],
        ]);
    }

    public function about()
    {
        return Inertia::render('guest/about', [
            'team' => [
                [
                    'name' => 'Leadership team',
                    'role' => 'Executive committee',
                    'bio' => 'Youth leaders guiding programs, partnerships, and community outreach for LAYYA.',
                    'image' => '/images/youth.jpg',
                ],
            ],
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

    public function services()
    {
        return Inertia::render('guest/services', [
            'services' => [
                [
                    'title' => 'Youth programs',
                    'description' => 'Structured activities focused on leadership, life skills, and civic engagement.',
                    'features' => ['Mentorship', 'Workshops', 'Peer learning'],
                ],
                [
                    'title' => 'Skills training',
                    'description' => 'Practical training in digital literacy, communication, and employability.',
                    'features' => ['Hands-on sessions', 'Certificates', 'Career guidance'],
                ],
                [
                    'title' => 'Community events',
                    'description' => 'Sports, cultural activities, and dialogue that strengthen social cohesion.',
                    'features' => ['Tournaments', 'Youth forums', 'Volunteering'],
                ],
            ],
        ]);
    }

    public function users()
    {
        return Inertia::render('guest/users', [
            'user_stats' => [
                'total_users' => 500,
                'active_users' => 420,
                'new_this_month' => 45,
            ],
            'testimonials' => [
                [
                    'name' => 'Community member',
                    'location' => 'Luac Akok Yieu',
                    'quote' => 'LAYYA gave me a place to learn, lead, and belong.',
                    'rating' => 5,
                ],
            ],
        ]);
    }

    public function faq()
    {
        return Inertia::render('guest/faq');
    }

    public function team()
    {
        return Inertia::render('guest/about');
    }

    public function reports()
    {
        return Inertia::render('guest/reports');
    }
}
