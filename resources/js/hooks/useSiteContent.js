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
        communityStory: site.community_story ?? {
            title: "Tawus Day builds\nskills and leadership",
            body: "Each year, Tawus Day brings girls, mentors, and families together to celebrate culture and the skills learned at Tawus Hub — braiding, decor, wellbeing, and the confidence to lead.\n\nStories like these remind us why LAYYA exists: so young people in Luac Akook Yieu can be seen, trained, and trusted with real responsibility.",
            quote: 'Tawus Hub gave my daughter skills and a place to lead. LAYYA saw us, trained us, and trusted us with real work.',
            quote_attribution: 'Angelina Nyalith Agoth, Tawus Hub mentor',
            name: 'Angelina Nyalith Agoth',
            role: 'A mother and youth mentor',
            image: '/images/nyalith.jpg',
        },
        quotes: Array.isArray(site.quotes) && site.quotes.length > 0 ? site.quotes : [
            {
                quote: 'Tawus Hub gave my daughter skills and a place to lead. LAYYA saw us, trained us, and trusted us with real work.',
                name: 'Angelina Nyalith Agoth',
                role: 'Tawus Hub mentor',
            },
            {
                quote: 'LAYYA helped me believe my voice matters — we turned our ideas into a real community project.',
                name: 'Youth participant',
                role: 'Luac Akook Yieu',
            },
            {
                quote: 'The mentorship and safe space changed how I plan my future.',
                name: 'Program alum',
                role: 'Juba',
            },
        ],
        tawusHub: site.tawus_hub ?? {
            title: 'A place for girls to grow',
            subtitle: '',
            body: '',
            skills: [],
        },
        cardImages: site.card_images ?? {
            mission: '/images/youth.jpg',
            vision: '/images/education.jpg',
            about: '/images/Executive.jpeg',
            tawus: '/images/cover1.jpg',
            tawus_inset: '/images/nyalith.jpg',
            tawus_gallery: [
                '/images/cover1.jpg',
                '/images/nyalith.jpg',
                '/images/akur.jpg',
                '/images/Gender-equality.jpeg',
                '/images/Women Empowerment.jpeg',
                '/images/chuchu.jpg',
            ],
        },
    };
}

export function splitLines(value) {
    return String(value || '')
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean);
}
