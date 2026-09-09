import { Link } from '@inertiajs/react';

const variants = {
    primary: 'btn-primary',
    amber: 'btn-amber',
    ghost: 'btn-ghost',
    outline: 'btn-outline',
};

export default function GuestButton({ href, children, variant = 'primary', className = '', type = 'button', onClick, disabled }) {
    const classes = `btn ${variants[variant] ?? 'btn-primary'} ${className}`.trim();

    if (href) {
        return (
            <Link href={href} className={classes}>
                {children}
            </Link>
        );
    }

    return (
        <button type={type} onClick={onClick} disabled={disabled} className={`${classes} disabled:opacity-50`}>
            {children}
        </button>
    );
}
