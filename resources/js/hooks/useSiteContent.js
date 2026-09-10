import { usePage } from '@inertiajs/react';
import {
    campaigns as fallbackCampaigns,
    constitutionFacts as fallbackConstitution,
    councilMembers as fallbackCouncil,
    executiveMembers as fallbackExec,
    faqs as fallbackFaqs,
    focusAreas as fallbackFocus,
    impactStats as fallbackImpact,
    newsEvents as fallbackNews,
    programsDetail as fallbackPrograms,
    values as fallbackValues,
} from '@/pages/guest/data/siteContent';

export default function useSiteContent() {
    const site = usePage().props.site ?? {};

    return {
        hero: site.hero ?? { headline: '', subtext: '', location: '' },
        heroStats: Array.isArray(site.hero_stats) ? site.hero_stats : [],
        missionVision: site.mission_vision ?? { heading: '', mission: '', vision: '' },
        contact: site.contact ?? { phone: '', email: '', address: '', hours: '' },
        executiveMembers:
            Array.isArray(site.executive_members) && site.executive_members.length > 0
                ? site.executive_members
                : fallbackExec,
        councilMembers:
            Array.isArray(site.council_members) && site.council_members.length > 0
                ? site.council_members
                : fallbackCouncil,
        programs: Array.isArray(site.programs) && site.programs.length > 0 ? site.programs : fallbackPrograms,
        newsEvents: Array.isArray(site.news_events) && site.news_events.length > 0 ? site.news_events : fallbackNews,
        campaigns: Array.isArray(site.campaigns) && site.campaigns.length > 0 ? site.campaigns : fallbackCampaigns,
        faqs: Array.isArray(site.faqs) && site.faqs.length > 0 ? site.faqs : fallbackFaqs,
        impactStats: Array.isArray(site.impact_stats) && site.impact_stats.length > 0 ? site.impact_stats : fallbackImpact,
        values: Array.isArray(site.values) && site.values.length > 0 ? site.values : fallbackValues,
        focusAreas: Array.isArray(site.focus_areas) && site.focus_areas.length > 0 ? site.focus_areas : fallbackFocus,
        constitutionFacts: site.constitution_facts?.aim ? site.constitution_facts : fallbackConstitution,
        tawusHub: site.tawus_hub ?? {
            title: 'A place for girls to grow',
            subtitle: '',
            body: '',
            skills: [],
        },
    };
}

export function splitLines(value) {
    return String(value || '')
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean);
}
