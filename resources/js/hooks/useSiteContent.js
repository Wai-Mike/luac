import { usePage } from '@inertiajs/react';
import { councilMembers as fallbackCouncil, executiveMembers as fallbackExec } from '@/pages/guest/data/siteContent';

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
    };
}

export function splitLines(value) {
    return String(value || '')
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean);
}
