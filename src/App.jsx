import { useEffect, useState } from 'react';
import { ArrowDown, ArrowUpRight, CalendarDays, Clock3, Heart, MapPin, Send } from 'lucide-react';
import { useCountdown } from './hooks/useCountdown';
import { submitRsvp } from './services/rsvpService';
import { weddingConfig as config } from './config/weddingConfig';

function Countdown() {
  const { countdown, wedding } = config;
  const { labels } = countdown;
  const t = useCountdown(wedding.date);
  return <div className="countdown"><p>{countdown.heading}</p><strong>{String(t.days).padStart(2, '0')} : {String(t.hours).padStart(2, '0')} : {String(t.minutes).padStart(2, '0')} : {String(t.seconds).padStart(2, '0')}</strong><span>{labels.days} · {labels.hours} · {labels.minutes} · {labels.seconds}</span></div>;
}

function WeddingCalendar() {
  const { wedding, calendar } = config;
  const [datePart] = wedding.date.split('T');
  const [year, month, day] = datePart.split('-').map(Number);
  const firstDay = new Date(year, month - 1, 1);
  const daysInMonth = new Date(year, month, 0).getDate();
  const firstWeekday = (firstDay.getDay() + 6) % 7;
  const monthName = new Intl.DateTimeFormat(wedding.locale, { month: 'long' }).format(firstDay);
  const cells = [...Array(firstWeekday).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];

  return <section className="calendar-section section-pad"><p className="section-kicker">{calendar.kicker}</p><h2>{calendar.heading}</h2><p className="calendar-description">{calendar.description}</p><div className="calendar-card"><div className="calendar-heading"><strong>{monthName}</strong><span>{year}</span></div><div className="calendar-weekdays">{calendar.weekdays.map(weekday => <span key={weekday}>{weekday}</span>)}</div><div className="calendar-grid">{cells.map((value, index) => <span className={value === day ? 'calendar-day selected' : value ? 'calendar-day' : 'calendar-day empty'} key={`${value || 'empty'}-${index}`}>{value === day ? <i>{value}</i> : value}</span>)}</div></div></section>;
}

export default function App() {
  const [opened, setOpened] = useState(false);
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState('');
  const { couple, wedding, cover, hero, events, notes, rsvp, gallery, location, timing } = config;

  useEffect(() => {
    document.title = `${couple.combinedName} — Հարսանեկան հրավիրատոմս`;
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
    return () => { if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'auto'; };
  }, []);

  useEffect(() => {
    document.body.classList.toggle('opened', opened);
    document.body.style.overflow = opened ? '' : 'hidden';
    if (!opened) return () => { document.body.style.overflow = ''; };
    const nodes = [...document.querySelectorAll('.content > section, .content > footer')];
    nodes.forEach((node, i) => { node.classList.add('reveal'); node.style.setProperty('--reveal-delay', `${Math.min(i * 70, 420)}ms`); });
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('in-view'); observer.unobserve(entry.target); } }), { threshold: .12, rootMargin: '0px 0px -8%' });
    nodes.forEach(node => observer.observe(node));
    return () => observer.disconnect();
  }, [opened]);

  async function handleRsvp(event) {
    event.preventDefault(); setBusy(true); setStatus('');
    const form = new FormData(event.currentTarget);
    try {
      const attendance = form.get('attendance');
      const enteredGuestCount = form.get('guestCount');
      const guestCount = attendance === 'no' ? (enteredGuestCount === '' ? 0 : Number(enteredGuestCount)) : Number(enteredGuestCount);
      if (attendance === 'yes' && (!guestCount || guestCount < 1)) throw new Error(rsvp.invalidGuestCountMessage);
      submitRsvp({ guestName: form.get('guestName').trim(), guestCount, attendance, invitedBy: form.get('invitedBy'), submittedAt: new Date().toISOString() }).catch(() => {});
      await new Promise(resolve => setTimeout(resolve, 900)); setSent(true);
    } catch (error) { setStatus(error.message || rsvp.errorMessage); }
    finally { setBusy(false); }
  }

  return <div className="invite-shell">
    {!opened && <section className="cover"><div className="cover-mark">{couple.initials?.partnerOne || couple.partnerOne[0]} <i>&amp;</i> {couple.initials?.partnerTwo || couple.partnerTwo[0]}</div><p className="cover-date">{wedding.displayDate}</p><div className="cover-photo"><img src={cover.image} alt={cover.imageAlt} /></div><p className="cover-note">{cover.note}</p><button onClick={() => setOpened(true)}>{cover.buttonText} <ArrowDown size={16} /></button></section>}
    <main className={opened ? 'content visible' : 'content'}>
      <section className="hero"><p className="pretitle">{hero.eyebrow}</p><div className="hero-photo"><img src={hero.image} alt={hero.imageAlt} /><div className="date">{wedding.displayDate.split(' · ').map((part, i) => <span key={part}>{i ? part.slice(-2) : part}<br /></span>)}</div></div><h1>{hero.title}</h1><p className="hero-subtitle">{hero.invitationText}</p></section>
      <WeddingCalendar />
      <section className="memory-gallery"><img src={gallery.image} alt={gallery.imageAlt} /></section>
      <section className="itinerary location-section section-pad" id="itinerary"><div className="section-intro"><p className="section-kicker">{location.kicker}</p><h2>{location.heading}<br /><em>{location.emphasis}</em></h2><p>{location.description}</p></div><div className="event-list">{events.filter(event => event.enabled !== false).map(event => <article className="event-card" key={event.id}><div className="event-image"><img src={event.image} alt={event.imageAlt || event.title} /><span>{event.number}</span></div><div className="event-copy"><div className="event-time"><Clock3 size={16} /> {event.time}</div><h3>{event.title}</h3><p className="event-venue">{event.venue}</p><p className="event-address"><MapPin size={15} /> {event.address}</p>{event.mapUrl && <a className="map-link" href={event.mapUrl} target="_blank" rel="noreferrer">{location.mapButtonText} <ArrowUpRight size={15} /></a>}</div></article>)}</div></section>
      <section className="timeline section-pad"><p className="section-kicker">{timing.kicker}</p><h2>{timing.heading}<br /><em>{timing.emphasis}</em></h2><div className="timing-list">{events.filter(event => event.enabled !== false).map(event => <article key={event.id}><time>{event.time}</time><h3>{event.title}</h3><p>{event.venue}</p><span>{event.address}</span></article>)}</div><Countdown /></section>
      {rsvp.enabled && <section className="rsvp section-pad" id="rsvp"><p className="pretitle">{rsvp.kicker}</p><h2>{rsvp.heading}</h2><p>{rsvp.description}</p>{sent ? <div className="thanks">{rsvp.successMessage} <Heart size={17} fill="currentColor" /></div> : <form onSubmit={handleRsvp}><input name="guestName" required autoComplete="name" placeholder={rsvp.namePlaceholder} /><input name="guestCount" type="number" min="0" max="20" inputMode="numeric" placeholder={rsvp.guestCountPlaceholder} /><select name="invitedBy" defaultValue="" required><option value="" disabled>{rsvp.invitedByPlaceholder}</option>{rsvp.invitedByOptions.map(option => <option value={option.value} key={option.value}>{option.label}</option>)}</select><select name="attendance" defaultValue="" required><option value="" disabled>{rsvp.attendancePlaceholder}</option>{rsvp.attendanceOptions.map(option => <option value={option.value} key={option.value}>{option.label}</option>)}</select><button disabled={busy} type="submit">{busy ? rsvp.sendingText : rsvp.submitButtonText} {!busy && <Send size={15} />}</button><p className="form-status" aria-live="polite">{status}</p></form>}</section>}
      <section className="details section-pad"><p className="details-kicker">DETAILS</p><h2>special<br /><em>with love</em></h2>{notes.items.map(note => <article key={note.title}>{note.icon === 'calendar' ? <CalendarDays size={22} /> : <Heart size={22} />}<h3>{note.title}</h3><p>{note.text}</p></article>)}</section>
      <footer>{couple.combinedName} <span>{wedding.displayDate}</span></footer>
    </main>
  </div>;
}
