import { cloneElement, useEffect, useRef, useState } from 'react';

export default function AdminChart({ children, height = 256, className = '' }) {
    const ref = useRef(null);
    const [width, setWidth] = useState(0);

    useEffect(() => {
        const el = ref.current;
        if (!el) {
            return undefined;
        }

        const update = () => {
            const next = Math.floor(el.getBoundingClientRect().width);
            if (next > 0) {
                setWidth(next);
            }
        };

        update();
        const frame = window.requestAnimationFrame(update);
        const observer = new ResizeObserver(update);
        observer.observe(el);
        window.addEventListener('resize', update);

        return () => {
            window.cancelAnimationFrame(frame);
            observer.disconnect();
            window.removeEventListener('resize', update);
        };
    }, []);

    return (
        <div ref={ref} className={`admin-chart w-full min-w-0 ${className}`} style={{ width: '100%', height, minHeight: height }}>
            {width > 0 ? cloneElement(children, { width, height }) : null}
        </div>
    );
}
