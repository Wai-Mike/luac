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
        $validated = $request->validate($this->rulesFor($request));
        unset($validated['redirect']);

        SiteContentRepository::put($validated);

        $redirect = $request->string('redirect')->toString();
        $named = in_array($redirect, ['admin.programs.index', 'admin.news.index', 'admin.donations.index', 'admin.content.site.edit'], true)
            ? $redirect
            : 'admin.content.site.edit';

        return redirect()->route($named)->with('success', 'Website content updated.');
    }

    /**
     * @return array<string, mixed>
     */
    private function rulesFor(Request $request): array
    {
        $rules = [
            'redirect' => ['nullable', 'string', 'max:80'],
        ];

        if ($request->has('hero')) {
            $rules += [
                'hero.headline' => ['required', 'string', 'max:500'],
                'hero.subtext' => ['required', 'string', 'max:2000'],
                'hero.location' => ['required', 'string', 'max:255'],
            ];
        }

        if ($request->has('hero_stats')) {
            $rules += [
                'hero_stats' => ['required', 'array', 'min:1', 'max:8'],
                'hero_stats.*.value' => ['required', 'string', 'max:50'],
                'hero_stats.*.label' => ['required', 'string', 'max:80'],
            ];
        }

        if ($request->has('mission_vision')) {
            $rules += [
                'mission_vision.heading' => ['required', 'string', 'max:255'],
                'mission_vision.mission' => ['required', 'string', 'max:1000'],
                'mission_vision.vision' => ['required', 'string', 'max:1000'],
            ];
        }

        if ($request->has('contact')) {
            $rules += [
                'contact.phone' => ['required', 'string', 'max:80'],
                'contact.email' => ['required', 'email', 'max:255'],
                'contact.address' => ['required', 'string', 'max:255'],
                'contact.hours' => ['required', 'string', 'max:255'],
            ];
        }

        if ($request->has('executive_members')) {
            $rules += [
                'executive_members' => ['required', 'array', 'min:1'],
                'executive_members.*.name' => ['required', 'string', 'max:255'],
                'executive_members.*.role' => ['required', 'string', 'max:255'],
                'executive_members.*.image' => ['nullable', 'string', 'max:500'],
            ];
        }

        if ($request->has('council_members')) {
            $rules += [
                'council_members' => ['required', 'array', 'min:1'],
                'council_members.*.name' => ['required', 'string', 'max:255'],
                'council_members.*.role' => ['required', 'string', 'max:255'],
                'council_members.*.image' => ['nullable', 'string', 'max:500'],
            ];
        }

        if ($request->has('programs')) {
            $rules += [
                'programs' => ['required', 'array', 'min:1'],
                'programs.*.title' => ['required', 'string', 'max:255'],
                'programs.*.body' => ['required', 'string', 'max:4000'],
                'programs.*.tag' => ['nullable', 'string', 'max:80'],
                'programs.*.image' => ['nullable', 'string', 'max:500'],
                'programs.*.participants' => ['nullable', 'integer', 'min:0'],
                'programs.*.sessions' => ['nullable', 'integer', 'min:0'],
                'programs.*.facilitators' => ['nullable', 'integer', 'min:0'],
                'programs.*.status' => ['nullable', 'string', 'max:40'],
            ];
        }

        if ($request->has('news_events')) {
            $rules += [
                'news_events' => ['required', 'array'],
                'news_events.*.title' => ['required', 'string', 'max:255'],
                'news_events.*.type' => ['required', 'string', 'max:80'],
                'news_events.*.excerpt' => ['required', 'string', 'max:1000'],
                'news_events.*.date' => ['nullable', 'string', 'max:80'],
                'news_events.*.image' => ['nullable', 'string', 'max:500'],
                'news_events.*.status' => ['nullable', 'string', 'max:40'],
            ];
        }

        if ($request->has('campaigns')) {
            $rules += [
                'campaigns' => ['required', 'array', 'min:1'],
                'campaigns.*.title' => ['required', 'string', 'max:255'],
                'campaigns.*.description' => ['required', 'string', 'max:1000'],
                'campaigns.*.target' => ['required', 'integer', 'min:0'],
                'campaigns.*.target_ssp' => ['nullable', 'integer', 'min:0'],
            ];
        }

        if ($request->has('faqs')) {
            $rules += [
                'faqs' => ['required', 'array'],
                'faqs.*.q' => ['required', 'string', 'max:255'],
                'faqs.*.a' => ['required', 'string', 'max:2000'],
            ];
        }

        if ($request->has('impact_stats')) {
            $rules += [
                'impact_stats' => ['required', 'array', 'min:1', 'max:8'],
                'impact_stats.*.value' => ['required', 'string', 'max:50'],
                'impact_stats.*.label' => ['required', 'string', 'max:80'],
            ];
        }

        if ($request->has('values')) {
            $rules += [
                'values' => ['required', 'array', 'min:1'],
                'values.*' => ['required', 'string', 'max:80'],
            ];
        }

        if ($request->has('focus_areas')) {
            $rules += [
                'focus_areas' => ['required', 'array'],
                'focus_areas.*.title' => ['required', 'string', 'max:255'],
                'focus_areas.*.description' => ['required', 'string', 'max:500'],
            ];
        }

        if ($request->has('constitution_facts')) {
            $rules += [
                'constitution_facts.status' => ['required', 'string', 'max:500'],
                'constitution_facts.aim' => ['required', 'string', 'max:500'],
                'constitution_facts.languages' => ['required', 'string', 'max:500'],
                'constitution_facts.places' => ['required', 'string', 'max:500'],
                'constitution_facts.membership' => ['required', 'string', 'max:500'],
                'constitution_facts.term' => ['nullable', 'string', 'max:500'],
                'constitution_facts.symbols' => ['nullable', 'array'],
                'constitution_facts.symbols.*.name' => ['required', 'string', 'max:80'],
                'constitution_facts.symbols.*.meaning' => ['required', 'string', 'max:255'],
                'constitution_facts.pillars' => ['nullable', 'array'],
                'constitution_facts.pillars.*.label' => ['required', 'string', 'max:80'],
                'constitution_facts.pillars.*.description' => ['required', 'string', 'max:500'],
            ];
        }

        if ($request->has('tawus_hub')) {
            $rules += [
                'tawus_hub.title' => ['required', 'string', 'max:255'],
                'tawus_hub.subtitle' => ['nullable', 'string', 'max:1000'],
                'tawus_hub.body' => ['required', 'string', 'max:4000'],
                'tawus_hub.skills' => ['nullable', 'array'],
                'tawus_hub.skills.*' => ['required', 'string', 'max:120'],
            ];
        }

        return $rules;
    }
}
