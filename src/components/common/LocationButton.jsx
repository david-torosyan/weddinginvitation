import { MapPin } from 'lucide-react';
export function LocationButton({ href }) { if (!href) return null; return <a className="editorial-button focus-ring mt-6 inline-flex items-center gap-2" href={href} target="_blank" rel="noopener noreferrer"><MapPin size={14} />Բացել քարտեզը</a>; }
