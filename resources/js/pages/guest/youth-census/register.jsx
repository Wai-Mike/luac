import GuestFooter from '@/components/GuestFooter';
import GuestNavbar from '@/components/GuestNavbar';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function YouthCensusRegister() {
    const [step, setStep] = useState(1);

    const { data, setData, post, processing, errors } = useForm({
        first_name: '',
        last_name: '',
        gender: '',
        date_of_birth: '',
        phone: '',
        email: '',
        county: '',
        payam: '',
        boma: '',
        education_level: '',
        current_school: '',
        employment_status: '',
        skills: [],
        interests: [],
        heard_about_layya: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('youth-census.store'));
    };

    const toggleArrayValue = (field, value) => {
        const current = data[field] || [];
        if (current.includes(value)) {
            setData(field, current.filter((item) => item !== value));
        } else {
            setData(field, [...current, value]);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-amber-50 via-emerald-50 to-slate-50">
            <Head title="LAYYA Youth Census Registration" />
            <GuestNavbar />

            <main className="mx-auto max-w-4xl px-4 py-12">
                <div className="mb-8 text-center">
                    <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-emerald-700">
                        Luac Akok Yieu Youth Association
                    </p>
                    <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
                        Youth Census Registration
                    </h1>
                    <p className="mt-3 text-sm text-slate-600">
                        Help us understand and serve the youth of Luac Akok Yieu better. This form takes just a few minutes
                        and your responses will shape programs, trainings, and opportunities.
                    </p>
                </div>

                {/* Step indicator */}
                <div className="mb-8 flex items-center justify-center space-x-4">
                    {['Demographics', 'Education & Skills', 'Interests'].map((label, index) => {
                        const current = index + 1;
                        const isActive = step === current;
                        const isCompleted = step > current;

                        return (
                            <div key={label} className="flex items-center">
                                <div
                                    className={`flex h-9 w-9 items-center justify-center rounded-full border text-sm font-semibold ${
                                        isActive
                                            ? 'border-emerald-600 bg-emerald-600 text-white shadow'
                                            : isCompleted
                                              ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                                              : 'border-slate-300 bg-white text-slate-500'
                                    }`}
                                >
                                    {current}
                                </div>
                                <span className="ml-2 text-xs font-medium text-slate-600">{label}</span>
                                {index < 2 && (
                                    <div className="mx-2 h-px w-10 bg-gradient-to-r from-slate-200 via-emerald-200 to-slate-200" />
                                )}
                            </div>
                        );
                    })}
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="rounded-2xl bg-white/90 p-6 shadow-xl shadow-emerald-100 ring-1 ring-slate-100 backdrop-blur"
                >
                    {/* Step 1: Demographics */}
                    {step === 1 && (
                        <div className="space-y-6">
                            <h2 className="text-lg font-semibold text-slate-900">Demographic Information</h2>
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700">First Name *</label>
                                    <input
                                        type="text"
                                        value={data.first_name}
                                        onChange={(e) => setData('first_name', e.target.value)}
                                        className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm shadow-sm focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-200"
                                    />
                                    {errors.first_name && (
                                        <p className="mt-1 text-xs text-red-600">{errors.first_name}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700">Last Name *</label>
                                    <input
                                        type="text"
                                        value={data.last_name}
                                        onChange={(e) => setData('last_name', e.target.value)}
                                        className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm shadow-sm focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-200"
                                    />
                                    {errors.last_name && <p className="mt-1 text-xs text-red-600">{errors.last_name}</p>}
                                </div>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700">Gender *</label>
                                    <select
                                        value={data.gender}
                                        onChange={(e) => setData('gender', e.target.value)}
                                        className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm shadow-sm focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-200"
                                    >
                                        <option value="">Select gender</option>
                                        <option value="female">Female</option>
                                        <option value="male">Male</option>
                                        <option value="other">Other / Prefer not to say</option>
                                    </select>
                                    {errors.gender && <p className="mt-1 text-xs text-red-600">{errors.gender}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700">
                                        Date of Birth *
                                        <span className="ml-1 text-xs text-slate-400">(approximate is okay)</span>
                                    </label>
                                    <input
                                        type="date"
                                        value={data.date_of_birth}
                                        onChange={(e) => setData('date_of_birth', e.target.value)}
                                        className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm shadow-sm focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-200"
                                    />
                                    {errors.date_of_birth && (
                                        <p className="mt-1 text-xs text-red-600">{errors.date_of_birth}</p>
                                    )}
                                </div>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700">Phone Number *</label>
                                    <input
                                        type="tel"
                                        value={data.phone}
                                        onChange={(e) => setData('phone', e.target.value)}
                                        placeholder="+211 ..."
                                        className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm shadow-sm focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-200"
                                    />
                                    {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700">Email (optional)</label>
                                    <input
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm shadow-sm focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-200"
                                    />
                                    {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
                                </div>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-3">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700">County *</label>
                                    <input
                                        type="text"
                                        value={data.county}
                                        onChange={(e) => setData('county', e.target.value)}
                                        className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm shadow-sm focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-200"
                                    />
                                    {errors.county && <p className="mt-1 text-xs text-red-600">{errors.county}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700">Payam *</label>
                                    <input
                                        type="text"
                                        value={data.payam}
                                        onChange={(e) => setData('payam', e.target.value)}
                                        className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm shadow-sm focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-200"
                                    />
                                    {errors.payam && <p className="mt-1 text-xs text-red-600">{errors.payam}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700">Boma (optional)</label>
                                    <input
                                        type="text"
                                        value={data.boma}
                                        onChange={(e) => setData('boma', e.target.value)}
                                        className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm shadow-sm focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-200"
                                    />
                                    {errors.boma && <p className="mt-1 text-xs text-red-600">{errors.boma}</p>}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Education & skills */}
                    {step === 2 && (
                        <div className="space-y-6">
                            <h2 className="text-lg font-semibold text-slate-900">Education & Skills</h2>
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700">Highest level of education *</label>
                                    <select
                                        value={data.education_level}
                                        onChange={(e) => setData('education_level', e.target.value)}
                                        className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm shadow-sm focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-200"
                                    >
                                        <option value="">Select level</option>
                                        <option value="none">No formal education</option>
                                        <option value="primary">Primary</option>
                                        <option value="secondary">Secondary</option>
                                        <option value="certificate">Certificate / Vocational</option>
                                        <option value="diploma">Diploma</option>
                                        <option value="degree">University degree</option>
                                    </select>
                                    {errors.education_level && (
                                        <p className="mt-1 text-xs text-red-600">{errors.education_level}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700">
                                        Current school or institution (if any)
                                    </label>
                                    <input
                                        type="text"
                                        value={data.current_school}
                                        onChange={(e) => setData('current_school', e.target.value)}
                                        className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm shadow-sm focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-200"
                                    />
                                    {errors.current_school && (
                                        <p className="mt-1 text-xs text-red-600">{errors.current_school}</p>
                                    )}
                                </div>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700">Employment status</label>
                                    <select
                                        value={data.employment_status}
                                        onChange={(e) => setData('employment_status', e.target.value)}
                                        className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm shadow-sm focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-200"
                                    >
                                        <option value="">Select status</option>
                                        <option value="student">Student</option>
                                        <option value="employed">Employed</option>
                                        <option value="self-employed">Self-employed</option>
                                        <option value="unemployed">Unemployed</option>
                                    </select>
                                    {errors.employment_status && (
                                        <p className="mt-1 text-xs text-red-600">{errors.employment_status}</p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700">
                                    Practical skills you already have (select all that apply)
                                </label>
                                <div className="mt-2 grid gap-2 sm:grid-cols-2">
                                    {['Braiding', 'Manicure', 'Catering', 'Decor', 'Tailoring', 'Agriculture', 'Business'].map(
                                        (skill) => (
                                            <button
                                                type="button"
                                                key={skill}
                                                onClick={() => toggleArrayValue('skills', skill)}
                                                className={`flex items-center justify-between rounded-lg border px-3 py-2 text-sm transition ${
                                                    data.skills.includes(skill)
                                                        ? 'border-emerald-500 bg-emerald-50 text-emerald-800'
                                                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-emerald-200 hover:bg-white'
                                                }`}
                                            >
                                                <span>{skill}</span>
                                                {data.skills.includes(skill) && (
                                                    <span className="ml-2 rounded-full bg-emerald-600 px-2 py-0.5 text-xs font-semibold text-white">
                                                        Selected
                                                    </span>
                                                )}
                                            </button>
                                        ),
                                    )}
                                </div>
                                {errors.skills && <p className="mt-1 text-xs text-red-600">{errors.skills}</p>}
                            </div>
                        </div>
                    )}

                    {/* Step 3: Interests */}
                    {step === 3 && (
                        <div className="space-y-6">
                            <h2 className="text-lg font-semibold text-slate-900">Interests & Opportunities</h2>

                            <div>
                                <label className="block text-sm font-medium text-slate-700">
                                    What opportunities are you most interested in? (select all that apply)
                                </label>
                                <div className="mt-2 grid gap-2 sm:grid-cols-2">
                                    {[
                                        'Skills training',
                                        'Business start-up support',
                                        'Mentorship',
                                        'Scholarships',
                                        'Leadership training',
                                        'Arts & culture',
                                        'Sports',
                                    ].map((interest) => (
                                        <button
                                            type="button"
                                            key={interest}
                                            onClick={() => toggleArrayValue('interests', interest)}
                                            className={`flex items-center justify-between rounded-lg border px-3 py-2 text-sm transition ${
                                                data.interests.includes(interest)
                                                    ? 'border-emerald-500 bg-emerald-50 text-emerald-800'
                                                    : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-emerald-200 hover:bg-white'
                                            }`}
                                        >
                                            <span>{interest}</span>
                                            {data.interests.includes(interest) && (
                                                <span className="ml-2 rounded-full bg-emerald-600 px-2 py-0.5 text-xs font-semibold text-white">
                                                    Selected
                                                </span>
                                            )}
                                        </button>
                                    ))}
                                </div>
                                {errors.interests && <p className="mt-1 text-xs text-red-600">{errors.interests}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700">
                                    How did you hear about LAYYA?
                                </label>
                                <select
                                    value={data.heard_about_layya}
                                    onChange={(e) => setData('heard_about_layya', e.target.value)}
                                    className="mt-1 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm shadow-sm focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-200"
                                >
                                    <option value="">Select an option</option>
                                    <option value="friend">Friend / Family</option>
                                    <option value="church">Church / Mosque</option>
                                    <option value="school">School</option>
                                    <option value="radio">Radio / Media</option>
                                    <option value="social-media">Social media</option>
                                    <option value="community-leader">Community leader</option>
                                </select>
                                {errors.heard_about_layya && (
                                    <p className="mt-1 text-xs text-red-600">{errors.heard_about_layya}</p>
                                )}
                            </div>

                            <p className="text-xs text-slate-500">
                                By submitting this form you consent to LAYYA using your data in aggregated, anonymized form to
                                plan youth programs and opportunities. Your contact details will only be used to reach you
                                about relevant opportunities.
                            </p>
                        </div>
                    )}

                    {/* Navigation buttons */}
                    <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-4">
                        <button
                            type="button"
                            onClick={() => setStep((prev) => Math.max(1, prev - 1))}
                            disabled={step === 1}
                            className="inline-flex items-center rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            Back
                        </button>

                        {step < 3 && (
                            <button
                                type="button"
                                onClick={() => setStep((prev) => Math.min(3, prev + 1))}
                                className="inline-flex items-center rounded-full bg-gradient-to-r from-emerald-600 via-teal-600 to-amber-500 px-6 py-2 text-sm font-semibold text-white shadow-md shadow-emerald-200 transition hover:shadow-lg hover:brightness-105"
                            >
                                Next
                            </button>
                        )}

                        {step === 3 && (
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center rounded-full bg-gradient-to-r from-emerald-700 via-teal-700 to-amber-600 px-6 py-2 text-sm font-semibold text-white shadow-md shadow-emerald-300 transition hover:shadow-lg hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-70"
                            >
                                {processing ? 'Submitting...' : 'Submit registration'}
                            </button>
                        )}
                    </div>
                </form>
            </main>

            <GuestFooter />
        </div>
    );
}

