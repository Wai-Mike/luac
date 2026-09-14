<?php

namespace App\Support;

class EventPlanning
{
    public const KINDS = [
        'inauguration' => 'Inauguration / official launch',
        'workshop' => 'Workshop',
        'training' => 'Training session',
    ];

    public const PHASES = [
        'planning' => 'Governance & conceptualization',
        'budgeting' => 'Comprehensive budgeting',
        'procurement' => 'Procurement & vendor management',
        'programme' => 'Program & content planning',
        'execution' => 'Operations & on-site execution',
        'reporting' => 'Post-event operations & reporting',
        'done' => 'Closed',
        'cancelled' => 'Cancelled',
    ];

    public const COMMITTEE_ROLES = [
        'event_director' => 'Event Director / Lead',
        'logistics_procurement' => 'Logistics & Procurement Manager',
        'finance' => 'Finance Officer',
        'protocol_comms' => 'Protocol & Communications Lead',
        'technical_content' => 'Technical / Content Coordinator',
    ];

    public const BUDGET_STREAMS = [
        [
            'category' => 'Venue & Facilities',
            'elements' => 'Hall rental, breakout rooms, sound stage, podium, security staff',
            'unit_metric' => 'Daily rate or flat fee',
        ],
        [
            'category' => 'Catering Services',
            'elements' => 'Arrival tea/coffee, mid-morning break, lunch buffet, afternoon tea, bottled water',
            'unit_metric' => 'Per-head, per-day cost',
        ],
        [
            'category' => 'Technical & AV Equipment',
            'elements' => 'PA system, microphones (lapel/wireless), projectors, screens, translation booths',
            'unit_metric' => 'Daily rental rate',
        ],
        [
            'category' => 'Branding & Print Production',
            'elements' => 'Backdrop banners, teardrop flags, directional signs, printed programs, badges, folders',
            'unit_metric' => 'Per unit / run cost',
        ],
        [
            'category' => 'Stationery & Workshop Kits',
            'elements' => 'Notebooks, pens, flipcharts, markers, USB drives, certificates',
            'unit_metric' => 'Per participant cost',
        ],
        [
            'category' => 'Honoraria & Facilitation',
            'elements' => 'Keynote speaker fees, workshop facilitator rates, MC honorarium',
            'unit_metric' => 'Per session or lump sum',
        ],
        [
            'category' => 'Travel, Accommodation & Per Diem',
            'elements' => 'Flights, local ground transport, hotel rooms, DSA',
            'unit_metric' => 'Per person, per night/trip',
        ],
        [
            'category' => 'Protocol, Security & Medical',
            'elements' => 'Security detail, emergency medical kit, VIP gifts/plaques, ribbon-cutting kit',
            'unit_metric' => 'Fixed package',
        ],
        [
            'category' => 'Media & Communications',
            'elements' => 'Press briefing packs, photographer/videographer fees, livestreaming team',
            'unit_metric' => 'Project-based fee',
        ],
    ];

    public const DOCUMENTS = [
        'brief' => 'Event concept and governance brief',
        'committee' => 'Steering committee assignment',
        'budget' => 'Itemized event budget',
        'tor' => 'Terms of reference and specifications',
        'agenda' => 'Master agenda and run-of-show',
        'confirmation' => 'Participant confirmation letter',
        'register' => 'Registration and sign-in sheet',
        'evaluation' => 'Participant evaluation form',
        'report' => 'Final event report',
    ];

    public const KIND_FOCUS = [
        'inauguration' => 'High-level protocol, security clearance, ribbon-cutting, press packs, VIP seating, and plaque/monument logistics.',
        'workshop' => 'Interactive room layouts, break-out groups, moderation tools, and an output-driven agenda.',
        'training' => 'Structured learning, pre- and post-assessments, training manuals, certificates, and presentation hardware.',
    ];

    /**
     * @return array<string, mixed>
     */
    public static function emptyPlan(): array
    {
        return [
            'kind_notes' => '',
            'speaker_briefing' => '',
            'confirmation_notes' => '',
            'dress_code' => '',
            'pre_reading' => '',
            'setup_notes' => '',
            'registration_desks' => 'VIPs, General Delegates, Media, Facilitators',
            'protocol_notes' => '',
            'troubleshooting' => '',
            'inventory_notes' => '',
            'agenda' => [],
            'vendors' => [],
            'report' => [
                'executive_summary' => '',
                'achievements' => '',
                'demographics' => '',
                'feedback' => '',
                'media' => '',
                'recommendations' => '',
                'actual_spend' => '',
                'ticket_revenue' => '',
                'attendance_count' => '',
            ],
        ];
    }
}
