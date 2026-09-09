<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Support\SiteContentRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SiteContentController extends Controller
{
    public function edit()
    {
        return Inertia::render('admin/content/site', [
            'content' => SiteContentRepository::get(),
            'canEdit' => auth()->user()?->canEditContent() ?? false,
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'hero.headline' => ['required', 'string', 'max:500'],
            'hero.subtext' => ['required', 'string', 'max:2000'],
            'hero.location' => ['required', 'string', 'max:255'],
            'hero_stats' => ['required', 'array', 'min:1', 'max:8'],
            'hero_stats.*.value' => ['required', 'string', 'max:50'],
            'hero_stats.*.label' => ['required', 'string', 'max:80'],
            'mission_vision.heading' => ['required', 'string', 'max:255'],
            'mission_vision.mission' => ['required', 'string', 'max:1000'],
            'mission_vision.vision' => ['required', 'string', 'max:1000'],
            'contact.phone' => ['required', 'string', 'max:80'],
            'contact.email' => ['required', 'email', 'max:255'],
            'contact.address' => ['required', 'string', 'max:255'],
            'contact.hours' => ['required', 'string', 'max:255'],
            'executive_members' => ['required', 'array', 'min:1'],
            'executive_members.*.name' => ['required', 'string', 'max:255'],
            'executive_members.*.role' => ['required', 'string', 'max:255'],
            'executive_members.*.image' => ['nullable', 'string', 'max:255'],
            'council_members' => ['required', 'array', 'min:1'],
            'council_members.*.name' => ['required', 'string', 'max:255'],
            'council_members.*.role' => ['required', 'string', 'max:255'],
            'council_members.*.image' => ['nullable', 'string', 'max:255'],
        ]);

        SiteContentRepository::put($validated);

        return redirect()->route('admin.content.site.edit')->with('success', 'Website content updated.');
    }
}
