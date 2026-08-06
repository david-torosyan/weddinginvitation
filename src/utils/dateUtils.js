import { format } from 'date-fns';
export const formatWeddingDate = (date) => format(new Date(date), 'dd.MM.yyyy');
export const formatRsvpDeadline = (date) => new Intl.DateTimeFormat('hy-AM', { day: 'numeric', month: 'long', timeZone: 'Asia/Yerevan' }).format(new Date(date));
