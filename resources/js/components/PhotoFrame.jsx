export default function PhotoFrame({ src, alt = '', fit = 'contain', className = '', imgClass = '', children }) {
    const fitClass = fit === 'face' ? 'photo-fill-face' : fit === 'cover' ? 'photo-fill-cover' : '';

    return (
        <div className={`relative overflow-hidden bg-brand-dark ${className}`}>
            {src ? <img src={src} alt={alt} className={`photo-fill ${fitClass} ${imgClass}`.trim()} /> : null}
            {children}
        </div>
    );
}
