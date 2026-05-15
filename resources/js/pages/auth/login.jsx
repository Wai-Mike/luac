import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

const LOGIN_HERO_IMAGE = '/images/pexels-pixabay-51953.jpg';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const [showPassword, setShowPassword] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    const handleGoogleLogin = () => {
        setIsGoogleLoading(true);
        window.location.href = route('auth.google');
    };

    const fieldClass =
        'w-full rounded-lg border border-slate-200/90 bg-slate-50/60 px-3 py-2 text-sm text-navy shadow-inner shadow-slate-900/5 outline-none transition-[border-color,box-shadow,background-color] placeholder:text-slate-400 focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/15 sm:rounded-xl sm:px-4 sm:py-2.5 sm:text-[15px]';

    return (
        <>
            <Head title="Login - LAYYA" />
            <div className="flex h-dvh max-h-dvh flex-col overflow-hidden overscroll-none bg-gradient-to-b from-brand-surface/70 via-white to-slate-50 lg:flex-row lg:min-h-0 lg:bg-white lg:bg-none">
                {/* Desktop hero */}
                <aside className="relative hidden min-h-0 lg:flex lg:h-full lg:w-[min(52%,520px)] lg:shrink-0 xl:w-[min(48%,600px)]">
                    <img
                        src={LOGIN_HERO_IMAGE}
                        alt=""
                        className="absolute inset-0 h-full w-full object-cover object-center"
                        draggable={false}
                        decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-dark/[0.88] via-brand/78 to-navy/85" aria-hidden />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_20%_-10%,rgba(255,225,86,0.14),transparent_55%)]" aria-hidden />
                    <div className="relative z-10 flex h-full min-h-0 flex-col justify-between gap-4 p-7 xl:p-9 [@media(max-height:700px)]:p-6">
                        <Link
                            href={route('home')}
                            prefetch
                            className="inline-flex w-fit shrink-0 items-center gap-2.5 rounded-xl bg-white/10 px-2.5 py-1.5 backdrop-blur-sm transition-colors hover:bg-white/[0.14] [@media(max-height:700px)]:gap-2"
                        >
                            <img
                                src="/images/logo.jpg"
                                alt=""
                                className="size-9 rounded-full object-cover ring-2 ring-white/25 [@media(max-height:700px)]:size-8"
                                draggable={false}
                            />
                            <span className="text-left leading-tight">
                                <span className="block text-[11px] font-semibold uppercase tracking-[0.12em] text-white/85">Layya</span>
                                <span className="mt-0.5 block max-w-[10rem] text-[10px] leading-snug text-white/65">
                                    Luac Akok Yieu Youth Association
                                </span>
                            </span>
                        </Link>
                        <div className="min-w-0 space-y-2 [@media(max-height:700px)]:space-y-1.5">
                            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-layya-star/95">Portal</p>
                            <h1 className="max-w-[18ch] text-2xl font-bold leading-[1.12] tracking-tight text-white xl:text-3xl [@media(max-height:700px)]:text-xl">
                                Welcome back — your community is here.
                            </h1>
                            <p className="hidden max-w-sm text-sm leading-relaxed text-white/75 lg:block [@media(max-height:720px)]:lg:hidden">
                                Programs, updates, and member tools in one place.
                            </p>
                        </div>
                        <p className="shrink-0 text-[10px] text-white/35">Secure sign-in · Encrypted session</p>
                    </div>
                </aside>

                {/* Mobile top band */}
                <div className="relative h-[5.25rem] shrink-0 overflow-hidden lg:hidden [@media(max-height:620px)]:h-[4.25rem]">
                    <img
                        src={LOGIN_HERO_IMAGE}
                        alt=""
                        className="h-full w-full object-cover object-center"
                        draggable={false}
                        decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-dark/80 to-navy/80" aria-hidden />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Link
                            href={route('home')}
                            prefetch
                            className="flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 backdrop-blur-md"
                        >
                            <img src="/images/logo.jpg" alt="" className="size-8 rounded-full object-cover ring-2 ring-white/30" draggable={false} />
                            <span className="text-sm font-semibold text-white">LAYYA</span>
                        </Link>
                    </div>
                </div>

                {/* Sign-in */}
                <main className="flex min-h-0 flex-1 flex-col items-center justify-center overflow-hidden px-3 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 sm:px-6 lg:px-10 xl:px-14 [@media(max-height:640px)]:pt-1">
                    <div className="flex max-h-full min-h-0 w-full max-w-[400px] flex-col justify-center">
                        <div className="max-h-full min-h-0 w-full overflow-hidden rounded-[1.25rem] border border-slate-200/70 bg-white/95 p-4 shadow-[0_18px_48px_-28px_rgba(0,77,77,0.25)] backdrop-blur-sm sm:rounded-[1.5rem] sm:p-5 lg:p-6 [@media(max-height:680px)]:p-3.5">
                            {status ? (
                                <div className="mb-3 rounded-lg bg-brand-surface px-3 py-2 text-xs leading-snug text-brand-dark sm:text-sm" role="status">
                                    {status}
                                </div>
                            ) : null}

                            <div className="mb-4 lg:hidden [@media(max-height:640px)]:mb-3">
                                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-brand [@media(max-height:640px)]:hidden">Sign in</p>
                                <h2 className="mt-0.5 text-lg font-bold tracking-tight text-navy [@media(min-height:700px)]:text-xl [@media(min-height:800px)]:text-2xl">
                                    Access your account
                                </h2>
                                <p className="mt-1 text-xs text-slate-500 [@media(max-height:640px)]:hidden sm:text-sm">Use the email on your profile.</p>
                            </div>

                            <div className="mb-4 hidden lg:block [@media(max-height:700px)]:mb-3">
                                <h2 className="text-xl font-bold tracking-tight text-navy [@media(min-height:820px)]:text-2xl">Sign in</h2>
                                <p className="mt-0.5 text-xs text-slate-500 sm:text-sm">Enter your credentials to continue.</p>
                                <div className="mt-2 h-0.5 w-8 rounded-full bg-brand [@media(max-height:700px)]:mt-1.5" aria-hidden />
                            </div>

                            <form className="space-y-3 sm:space-y-4 [@media(max-height:680px)]:space-y-2.5" onSubmit={submit} noValidate>
                                <div>
                                    <label htmlFor="email" className="mb-1 block text-xs font-medium text-navy sm:text-sm">
                                        Email
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className={fieldClass}
                                        placeholder="you@example.com"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                    />
                                    {errors.email ? <p className="mt-1 text-xs text-red-600 sm:text-sm">{errors.email}</p> : null}
                                </div>

                                <div>
                                    <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
                                        <label htmlFor="password" className="text-xs font-medium text-navy sm:text-sm">
                                            Password
                                        </label>
                                        {canResetPassword ? (
                                            <Link
                                                href={route('auth.password.request')}
                                                prefetch
                                                className="text-[11px] font-semibold text-brand underline-offset-2 hover:text-brand-dark hover:underline sm:text-xs"
                                            >
                                                Forgot password?
                                            </Link>
                                        ) : null}
                                    </div>
                                    <div className="relative">
                                        <input
                                            id="password"
                                            name="password"
                                            type={showPassword ? 'text' : 'password'}
                                            autoComplete="current-password"
                                            required
                                            className={`${fieldClass} pr-[3.75rem]`}
                                            placeholder="••••••••"
                                            value={data.password}
                                            onChange={(e) => setData('password', e.target.value)}
                                        />
                                        <button
                                            type="button"
                                            className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-md px-2 py-0.5 text-[11px] font-semibold text-slate-500 transition-colors hover:bg-slate-100 hover:text-brand"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? 'Hide' : 'Show'}
                                        </button>
                                    </div>
                                    {errors.password ? <p className="mt-1 text-xs text-red-600 sm:text-sm">{errors.password}</p> : null}
                                </div>

                                <label className="flex cursor-pointer items-center gap-2 text-xs text-slate-600 sm:text-sm">
                                    <input
                                        id="remember"
                                        name="remember"
                                        type="checkbox"
                                        className="size-3.5 rounded border-slate-300 text-brand focus:ring-brand/30 sm:size-4"
                                        checked={data.remember}
                                        onChange={(e) => setData('remember', e.target.checked)}
                                    />
                                    <span className="[@media(max-height:640px)]:hidden">Remember this device</span>
                                    <span className="hidden [@media(max-height:640px)]:inline">Remember</span>
                                </label>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full rounded-xl bg-brand py-2.5 text-sm font-semibold text-white shadow-md shadow-brand/20 transition-[filter,transform] hover:bg-brand-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:cursor-not-allowed disabled:opacity-50 active:scale-[0.99] sm:py-3 [@media(max-height:680px)]:py-2"
                                >
                                    {processing ? 'Signing in…' : 'Sign in'}
                                </button>
                            </form>

                            <p className="mt-4 text-center text-xs text-slate-600 sm:mt-5 sm:text-sm [@media(max-height:680px)]:mt-3">
                                Don&apos;t have an account?{' '}
                                <Link href={route('register')} prefetch className="font-semibold text-brand hover:text-brand-dark">
                                    Register
                                </Link>
                            </p>

                            <div className="relative my-4 sm:my-5 [@media(max-height:680px)]:my-3">
                                <div className="absolute inset-0 flex items-center" aria-hidden>
                                    <div className="w-full border-t border-slate-200" />
                                </div>
                                <div className="relative flex justify-center text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400 sm:text-[10px]">
                                    <span className="bg-white/95 px-2">Or</span>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={handleGoogleLogin}
                                disabled={isGoogleLoading}
                                aria-busy={isGoogleLoading}
                                className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-2 text-sm font-semibold text-navy shadow-sm transition-[background-color,box-shadow] hover:border-slate-300 hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-300 disabled:cursor-not-allowed disabled:opacity-60 sm:py-2.5 [@media(max-height:680px)]:py-1.5"
                            >
                                {isGoogleLoading ? (
                                    <>
                                        <span className="size-3.5 shrink-0 animate-spin rounded-full border-2 border-slate-200 border-t-brand" aria-hidden />
                                        Redirecting…
                                    </>
                                ) : (
                                    'Continue with Google'
                                )}
                            </button>

                            <div className="mt-4 flex flex-col items-center gap-0.5 border-t border-slate-100 pt-4 text-center sm:mt-5 sm:gap-1 sm:pt-5 [@media(max-height:680px)]:mt-3 [@media(max-height:680px)]:pt-3">
                                <Link href={route('home')} prefetch className="text-xs font-medium text-slate-500 hover:text-brand sm:text-sm">
                                    Back to home
                                </Link>
                                <p className="text-[10px] text-slate-400 [@media(max-height:620px)]:hidden">Luac Akok Yieu Youth Association</p>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
