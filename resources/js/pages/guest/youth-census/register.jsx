import GuestButton from '@/components/GuestButton';
import GuestLayout from '@/layouts/GuestLayout';
import { useForm } from '@inertiajs/react';
import { Check } from 'lucide-react';
import { useEffect, useState } from 'react';

const STEPS = [
    { id: 1, label: 'You' },
    { id: 2, label: 'School & work' },
    { id: 3, label: 'Skills' },
    { id: 4, label: 'Interests' },
    { id: 5, label: 'Finish' },
];

const TECHNICAL = [
    'Braiding',
    'Manicure',
    'Pedicure',
    'Decor',
    'Catering',
    'Tailoring',
    'Agriculture',
    'Business',
    'Digital literacy',
    'Photography',
];

const SOFT = ['Leadership', 'Public speaking', 'Teamwork', 'Mentoring', 'Problem solving', 'Creativity', 'Communication'];

const VOCATIONAL = [
    'Skills training',
    'Business start-up',
    'Mentorship',
    'Scholarships',
    'Leadership training',
    'Arts & culture',
    'Sports',
    'Digital careers',
];

const HOBBIES = ['Football', 'Music', 'Dance', 'Reading', 'Farming', 'Volunteering', 'Faith groups'];

const MONTHS = [
    { value: '1', label: 'January' },
    { value: '2', label: 'February' },
    { value: '3', label: 'March' },
    { value: '4', label: 'April' },
    { value: '5', label: 'May' },
    { value: '6', label: 'June' },
    { value: '7', label: 'July' },
    { value: '8', label: 'August' },
    { value: '9', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' },
];

const BIRTH_YEARS = Array.from({ length: 80 }, (_, i) => String(new Date().getFullYear() - 10 - i));

function isoBirthDate(day, month, year) {
    const d = Number(day);
    const m = Number(month);
    const y = Number(year);
    if (!d || !m || !y || String(year).length !== 4) {
        return '';
    }
    const date = new Date(y, m - 1, d);
    if (date.getFullYear() !== y || date.getMonth() !== m - 1 || date.getDate() !== d) {
        return '';
    }
    return `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
}

const BARRIERS = [
    'School fees',
    'Transport',
    'Family duties',
    'Limited mentors',
    'No safe space',
    'Unemployment',
    'Health',
    'Other',
];

function Field({ label, error, children }) {
    return (
        <div>
            <label className="field-label">{label}</label>
            {children}
            {error ? <p className="mt-1 text-xs text-red-600">{error}</p> : null}
        </div>
    );
}

function CheckPill({ selected, onClick, children }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`rounded-full px-4 py-2 text-sm font-medium transition duration-150 ${
                selected ? 'bg-brand text-white' : 'bg-brand-soft text-brand'
            }`}
        >
            {children}
        </button>
    );
}

export default function YouthCensusRegister() {
    const [step, setStep] = useState(1);
    const { data, setData, post, processing, errors, transform } = useForm({
        first_name: '',
        last_name: '',
        gender: '',
        birth_day: '',
        birth_month: '',
        birth_year: '',
        phone: '',
        email: '',
        county: 'PIGI (Khorfulus)',
        payam: '',
        boma: '',
        residential_area: '',
        education_level: '',
        student_status: '',
        employment_status: '',
        current_school: '',
        technical_skills: [],
        soft_skills: [],
        vocational: [],
        hobbies: [],
        goals: '',
        barriers: [],
        heard_about_layya: '',
    });

    useEffect(() => {
        transform((d) => ({
            first_name: d.first_name,
            last_name: d.last_name,
            gender: d.gender,
            date_of_birth: isoBirthDate(d.birth_day, d.birth_month, d.birth_year),
            phone: d.phone,
            email: d.email,
            county: 'PIGI (Khorfulus)',
            payam: d.payam,
            boma: [d.boma, d.residential_area].filter(Boolean).join(' · '),
            education_level: d.education_level,
            current_school: d.current_school,
            employment_status: d.employment_status || (d.student_status === 'student' ? 'student' : ''),
            skills: [...(d.technical_skills || []), ...(d.soft_skills || [])],
            interests: [
                ...(d.vocational || []),
                ...(d.hobbies || []),
                ...(d.barriers || []),
                d.goals ? `Goal: ${d.goals}` : null,
            ].filter(Boolean),
            heard_about_layya: d.heard_about_layya,
        }));
    }, [transform]);

    function toggle(field, value, max) {
        const current = data[field] || [];
        if (current.includes(value)) {
            setData(field, current.filter((item) => item !== value));
            return;
        }
        if (max && current.length >= max) {
            return;
        }
        setData(field, [...current, value]);
    }

    function canContinue() {
        if (step === 1) {
            return (
                data.first_name &&
                data.last_name &&
                data.gender &&
                isoBirthDate(data.birth_day, data.birth_month, data.birth_year) &&
                data.payam &&
                data.phone
            );
        }
        if (step === 2) {
            return Boolean(data.education_level);
        }
        return true;
    }

    function next() {
        if (!canContinue()) {
            return;
        }
        setStep((s) => Math.min(5, s + 1));
    }

    function submit(e) {
        e.preventDefault();
        post(route('youth-census.store'));
    }

    const showInstitution = data.student_status === 'student' || data.employment_status === 'employed';
    const progress = ((step - 1) / 4) * 100;

    return (
        <GuestLayout title="Youth Census">
            <section className="bg-brand-soft pt-32 pb-20 md:pb-28">
                <div className="mx-auto max-w-2xl px-4 sm:px-6">
                    <div className="mb-10 text-center">
                        <p className="text-xs font-semibold uppercase tracking-widest text-amber">Youth Census</p>
                        <h1 className="mt-2 text-[clamp(2rem,4vw,3rem)]">Register a youth</h1>
                        <p className="mt-3 text-brand-muted">
                            Five short steps. Your answers help LAYYA plan trainings and opportunities for Luac Akook Yieu.
                        </p>
                    </div>

                    <div className="mb-8">
                        <div className="flex items-start justify-between">
                            {STEPS.map((s) => {
                                const done = step > s.id;
                                const current = step === s.id;
                                return (
                                    <div key={s.id} className="flex flex-1 flex-col items-center">
                                        <span
                                            className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold ${
                                                done
                                                    ? 'bg-brand text-white'
                                                    : current
                                                      ? 'bg-amber text-brand-ink'
                                                      : 'bg-white/70 text-brand/40'
                                            }`}
                                        >
                                            {done ? <Check className="h-4 w-4" /> : s.id}
                                        </span>
                                        <span
                                            className={`mt-2 hidden text-center text-xs md:block ${
                                                current ? 'font-semibold text-brand-ink' : 'text-brand-muted'
                                            }`}
                                        >
                                            {s.label}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/70">
                            <div className="h-full rounded-full bg-brand transition-all duration-300" style={{ width: `${progress}%` }} />
                        </div>
                    </div>

                    <form onSubmit={submit} className="rounded-3xl bg-white p-6 md:p-8">
                        {step === 1 && (
                            <div className="space-y-4">
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <Field label="First name" error={errors.first_name}>
                                        <input className="field-input" value={data.first_name} onChange={(e) => setData('first_name', e.target.value)} />
                                    </Field>
                                    <Field label="Last name" error={errors.last_name}>
                                        <input className="field-input" value={data.last_name} onChange={(e) => setData('last_name', e.target.value)} />
                                    </Field>
                                </div>
                                <Field label="Gender" error={errors.gender}>
                                    <select className="field-input" value={data.gender} onChange={(e) => setData('gender', e.target.value)}>
                                        <option value="">Select</option>
                                        <option value="female">Female</option>
                                        <option value="male">Male</option>
                                    </select>
                                </Field>
                                <div>
                                    <p className="field-label">Date of birth</p>
                                    <div className="grid grid-cols-3 gap-3">
                                        <select
                                            className="field-input"
                                            value={data.birth_day}
                                            onChange={(e) => setData('birth_day', e.target.value)}
                                            aria-label="Day"
                                        >
                                            <option value="">Day</option>
                                            {Array.from({ length: 31 }, (_, i) => (
                                                <option key={i + 1} value={String(i + 1)}>
                                                    {i + 1}
                                                </option>
                                            ))}
                                        </select>
                                        <select
                                            className="field-input"
                                            value={data.birth_month}
                                            onChange={(e) => setData('birth_month', e.target.value)}
                                            aria-label="Month"
                                        >
                                            <option value="">Month</option>
                                            {MONTHS.map((month) => (
                                                <option key={month.value} value={month.value}>
                                                    {month.label}
                                                </option>
                                            ))}
                                        </select>
                                        <select
                                            className="field-input"
                                            value={data.birth_year}
                                            onChange={(e) => setData('birth_year', e.target.value)}
                                            aria-label="Year"
                                        >
                                            <option value="">Year</option>
                                            {BIRTH_YEARS.map((year) => (
                                                <option key={year} value={year}>
                                                    {year}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <p className="mt-1 text-xs text-brand-muted">Day, month, then year</p>
                                    {errors.date_of_birth ? <p className="mt-1 text-xs text-red-600">{errors.date_of_birth}</p> : null}
                                </div>
                                <div>
                                    <p className="field-label">County</p>
                                    <div className="rounded-xl bg-brand-soft px-4 py-3 text-sm font-medium text-brand">PIGI (Khorfulus)</div>
                                </div>
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <Field label="Payam" error={errors.payam}>
                                        <input className="field-input" value={data.payam} onChange={(e) => setData('payam', e.target.value)} />
                                    </Field>
                                    <Field label="Boma" error={errors.boma}>
                                        <input className="field-input" value={data.boma} onChange={(e) => setData('boma', e.target.value)} />
                                    </Field>
                                </div>
                                <Field label="Residential area">
                                    <input className="field-input" value={data.residential_area} onChange={(e) => setData('residential_area', e.target.value)} />
                                </Field>
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <Field label="Phone" error={errors.phone}>
                                        <input type="tel" className="field-input" placeholder="+211 …" value={data.phone} onChange={(e) => setData('phone', e.target.value)} />
                                    </Field>
                                    <Field label="Email" error={errors.email}>
                                        <input type="email" className="field-input" value={data.email} onChange={(e) => setData('email', e.target.value)} />
                                    </Field>
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="space-y-4">
                                <Field label="Education level" error={errors.education_level}>
                                    <select className="field-input" value={data.education_level} onChange={(e) => setData('education_level', e.target.value)}>
                                        <option value="">Select level</option>
                                        <option value="none">No formal education</option>
                                        <option value="primary">Primary</option>
                                        <option value="secondary">Secondary</option>
                                        <option value="certificate">Certificate / Vocational</option>
                                        <option value="diploma">Diploma</option>
                                        <option value="degree">University degree</option>
                                    </select>
                                </Field>
                                <Field label="Student status">
                                    <select className="field-input" value={data.student_status} onChange={(e) => setData('student_status', e.target.value)}>
                                        <option value="">Select</option>
                                        <option value="student">Currently a student</option>
                                        <option value="not-student">Not a student</option>
                                    </select>
                                </Field>
                                <Field label="Employment" error={errors.employment_status}>
                                    <select className="field-input" value={data.employment_status} onChange={(e) => setData('employment_status', e.target.value)}>
                                        <option value="">Select status</option>
                                        <option value="student">Student</option>
                                        <option value="employed">Employed</option>
                                        <option value="self-employed">Self-employed</option>
                                        <option value="unemployed">Unemployed</option>
                                    </select>
                                </Field>
                                {showInstitution ? (
                                    <Field label="Institution" error={errors.current_school}>
                                        <input
                                            className="field-input"
                                            value={data.current_school}
                                            onChange={(e) => setData('current_school', e.target.value)}
                                            placeholder="School, college, or workplace"
                                        />
                                    </Field>
                                ) : null}
                            </div>
                        )}

                        {step === 3 && (
                            <div className="space-y-6">
                                <div>
                                    <p className="field-label">Technical skills</p>
                                    <div className="flex flex-wrap gap-2">
                                        {TECHNICAL.map((skill) => (
                                            <CheckPill key={skill} selected={data.technical_skills.includes(skill)} onClick={() => toggle('technical_skills', skill)}>
                                                {skill}
                                            </CheckPill>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <p className="field-label">Soft skills</p>
                                    <div className="flex flex-wrap gap-2">
                                        {SOFT.map((skill) => (
                                            <CheckPill key={skill} selected={data.soft_skills.includes(skill)} onClick={() => toggle('soft_skills', skill)}>
                                                {skill}
                                            </CheckPill>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {step === 4 && (
                            <div className="space-y-6">
                                <div>
                                    <div className="mb-2 flex items-center justify-between">
                                        <p className="field-label mb-0">Vocational interests</p>
                                        <p className="text-xs text-brand-muted">{data.vocational.length}/3 selected</p>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {VOCATIONAL.map((item) => (
                                            <CheckPill key={item} selected={data.vocational.includes(item)} onClick={() => toggle('vocational', item, 3)}>
                                                {item}
                                            </CheckPill>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <p className="field-label">Hobbies</p>
                                    <div className="flex flex-wrap gap-2">
                                        {HOBBIES.map((item) => (
                                            <CheckPill key={item} selected={data.hobbies.includes(item)} onClick={() => toggle('hobbies', item)}>
                                                {item}
                                            </CheckPill>
                                        ))}
                                    </div>
                                </div>
                                <Field label="After skills training, what is your goal?">
                                    <textarea rows={4} className="field-input resize-y" value={data.goals} onChange={(e) => setData('goals', e.target.value)} />
                                </Field>
                            </div>
                        )}

                        {step === 5 && (
                            <div className="space-y-6">
                                <div>
                                    <p className="field-label">Barriers you face</p>
                                    <div className="grid grid-cols-2 gap-2">
                                        {BARRIERS.map((item) => (
                                            <CheckPill key={item} selected={data.barriers.includes(item)} onClick={() => toggle('barriers', item)}>
                                                {item}
                                            </CheckPill>
                                        ))}
                                    </div>
                                </div>
                                <Field label="How did you hear about LAYYA?" error={errors.heard_about_layya}>
                                    <select className="field-input" value={data.heard_about_layya} onChange={(e) => setData('heard_about_layya', e.target.value)}>
                                        <option value="">Select an option</option>
                                        <option value="friend">Friend / Family</option>
                                        <option value="church">Church / Mosque</option>
                                        <option value="school">School</option>
                                        <option value="radio">Radio / Media</option>
                                        <option value="social-media">Social media</option>
                                        <option value="community-leader">Community leader</option>
                                    </select>
                                </Field>
                                <div className="rounded-2xl bg-brand-soft p-4 text-sm text-brand-muted">
                                    By submitting, you consent to LAYYA using your answers in aggregated form to plan youth programs.
                                    Contact details are used only to share relevant opportunities.
                                </div>
                            </div>
                        )}

                        <div className="mt-8 flex items-center justify-between border-t border-brand/10 pt-5">
                            <GuestButton variant="outline" onClick={() => setStep((s) => Math.max(1, s - 1))} disabled={step === 1}>
                                Back
                            </GuestButton>
                            {step < 5 ? (
                                <GuestButton onClick={next} disabled={!canContinue()}>
                                    Continue
                                </GuestButton>
                            ) : (
                                <GuestButton type="submit" variant="amber" disabled={processing}>
                                    {processing ? 'Submitting…' : 'Submit'}
                                </GuestButton>
                            )}
                        </div>
                    </form>
                </div>
            </section>
        </GuestLayout>
    );
}
