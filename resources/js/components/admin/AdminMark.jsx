import { GOLD } from '@/lib/admin-theme';

export default function AdminMark({ size = 38 }) {
    return (
        <img
            src="/images/logo.jpg"
            alt="LAYYA"
            width={size}
            height={size}
            className="shrink-0 object-cover"
            style={{
                width: size,
                height: size,
                borderRadius: 10,
                border: `2px solid ${GOLD}`,
                background: '#fff',
            }}
        />
    );
}
