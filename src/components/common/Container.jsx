export function Container({ children, className = '' }) { return <div className={`mx-auto w-full max-w-[var(--page-max-width)] px-5 sm:px-8 ${className}`}>{children}</div>; }
