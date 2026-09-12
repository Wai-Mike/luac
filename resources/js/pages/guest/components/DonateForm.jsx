import { useForm, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import useSiteContent from '@/hooks/useSiteContent';
import { campaignTitle } from '../data/money';

const paymentMethods = [
    { value: 'mobile_money', label: 'MPESA / MTN Mobile Money' },
    { value: 'bank', label: 'Bank transfer' },
    { value: 'cash', label: 'Cash' },
    { value: 'other', label: 'Contact us for details' },
];

export default function DonateForm({ selectedProgram = '' }) {
    const { flash } = usePage().props;
    const { campaigns } = useSiteContent();
    const programs = campaigns.map((c) => c.title);

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        phone: '',
        email: '',
        program: selectedProgram && programs.includes(selectedProgram) ? selectedProgram : programs[0],
        amount: '',
        currency: 'ssp',
        payment_method: 'mobile_money',
        notes: '',
    });

    useEffect(() => {
        if (selectedProgram && programs.includes(selectedProgram)) {
            setData('program', selectedProgram);
        }
    }, [selectedProgram]);

    function submit(e) {
        e.preventDefault();
        post(route('fundraising.donate'));
    }

    return (
        <form id="donate" onSubmit={submit} className="scroll-mt-24 space-y-4">
            {flash?.error ? <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-800">{flash.error}</p> : null}
            <div>
                <label className="field-label" htmlFor="donor-name">
                    Full name
                </label>
                <input
                    id="donor-name"
                    required
                    className="field-input"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    autoComplete="name"
                />
                {errors.name ? <p className="mt-1 text-sm text-red-700">{errors.name}</p> : null}
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
                <div>
                    <label className="field-label" htmlFor="donor-phone">
                        Phone
                    </label>
                    <input
                        id="donor-phone"
                        required
                        className="field-input"
                        value={data.phone}
                        onChange={(e) => setData('phone', e.target.value)}
                        autoComplete="tel"
                    />
                    {errors.phone ? <p className="mt-1 text-sm text-red-700">{errors.phone}</p> : null}
                </div>
                <div>
                    <label className="field-label" htmlFor="donor-email">
                        Email
                    </label>
                    <input
                        id="donor-email"
                        type="email"
                        className="field-input"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        autoComplete="email"
                    />
                    {errors.email ? <p className="mt-1 text-sm text-red-700">{errors.email}</p> : null}
                </div>
            </div>
            <div>
                <label className="field-label" htmlFor="donor-program">
                    Program you are funding
                </label>
                <select
                    id="donor-program"
                    required
                    className="field-input"
                    value={data.program}
                    onChange={(e) => setData('program', e.target.value)}
                >
                    {campaigns.map((campaign) => (
                        <option key={campaign.title} value={campaign.title}>
                            {campaignTitle(campaign)}
                        </option>
                    ))}
                </select>
                {errors.program ? <p className="mt-1 text-sm text-red-700">{errors.program}</p> : null}
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
                <div>
                    <label className="field-label" htmlFor="donor-amount">
                        Amount
                    </label>
                    <input
                        id="donor-amount"
                        required
                        type="number"
                        min="1"
                        step="0.01"
                        className="field-input"
                        value={data.amount}
                        onChange={(e) => setData('amount', e.target.value)}
                    />
                    {errors.amount ? <p className="mt-1 text-sm text-red-700">{errors.amount}</p> : null}
                </div>
                <div>
                    <label className="field-label" htmlFor="donor-currency">
                        Currency
                    </label>
                    <select
                        id="donor-currency"
                        required
                        className="field-input"
                        value={data.currency}
                        onChange={(e) => setData('currency', e.target.value)}
                    >
                        <option value="ssp">South Sudanese pounds (SSP)</option>
                        <option value="usd">US dollars (USD)</option>
                    </select>
                    {errors.currency ? <p className="mt-1 text-sm text-red-700">{errors.currency}</p> : null}
                </div>
            </div>
            <p className="text-xs text-brand-muted">You can give in South Sudanese pounds or US dollars.</p>
            <div>
                <label className="field-label" htmlFor="donor-method">
                    How you are paying
                </label>
                    <select
                        id="donor-method"
                        required
                        className="field-input"
                        value={data.payment_method}
                        onChange={(e) => setData('payment_method', e.target.value)}
                    >
                        {paymentMethods.map((m) => (
                            <option key={m.value} value={m.value}>
                                {m.label}
                            </option>
                        ))}
                    </select>
                    {errors.payment_method ? <p className="mt-1 text-sm text-red-700">{errors.payment_method}</p> : null}
            </div>
            <div>
                <label className="field-label" htmlFor="donor-notes">
                    Note (optional)
                </label>
                <textarea
                    id="donor-notes"
                    rows={3}
                    className="field-input resize-y"
                    placeholder="Payment reference, message to LAYYA…"
                    value={data.notes}
                    onChange={(e) => setData('notes', e.target.value)}
                />
                {errors.notes ? <p className="mt-1 text-sm text-red-700">{errors.notes}</p> : null}
            </div>
            <button type="submit" className="btn btn-amber w-full" disabled={processing}>
                {processing ? 'Sending…' : 'Submit donation'}
            </button>
            <p className="text-center text-xs text-brand-muted">
                LAYYA will record your gift and follow up if we need to confirm payment.
            </p>
        </form>
    );
}
