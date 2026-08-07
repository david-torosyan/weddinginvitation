import { useEffect, useMemo, useState } from 'react';
import {
  ArrowDown,
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Heart,
  MapPin,
  Music2,
  Send,
} from 'lucide-react';
import { useCountdown } from './hooks/useCountdown';
import { submitRsvp } from './services/rsvpService';
import { weddingConfig as config } from './config/weddingConfig';
import loveSymbolImage from './assets/pics/loveSymbol.png';

const formatNumber = value => String(value).padStart(2, '0');

function Countdown() {
  const { countdown, wedding } = config;
  const { labels } = countdown;
  const t = useCountdown(wedding.date);
  const units = [
    { label: labels.days, value: t.days },
    { label: labels.hours, value: t.hours },
    { label: labels.minutes, value: t.minutes },
    { label: labels.seconds, value: t.seconds },
  ];

  return (
    <div className="countdown" aria-label={countdown.heading}>
      <p>{countdown.heading}</p>
      <div className="countdown-grid">
        {units.map(unit => (
          <span className="countdown-unit" key={unit.label}>
            <strong>{formatNumber(unit.value)}</strong>
            <small>{unit.label}</small>
          </span>
        ))}
      </div>
    </div>
  );
}

function WeddingCalendar() {
  const { wedding, calendar } = config;
  const [datePart] = wedding.date.split('T');
  const [year, month, day] = datePart.split('-').map(Number);
  const firstDay = new Date(year, month - 1, 1);
  const daysInMonth = new Date(year, month, 0).getDate();
  const firstWeekday = (firstDay.getDay() + 6) % 7;
  const monthName = new Intl.DateTimeFormat(wedding.locale, { month: 'long' }).format(firstDay);
  const cells = useMemo(
    () => [...Array(firstWeekday).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)],
    [daysInMonth, firstWeekday],
  );

  return (
    <section className="calendar-section section" id="date">
      <div className="section-copy">
        <p className="kicker">{calendar.kicker}</p>
        <h2>{calendar.heading}</h2>
        <p>{calendar.description}</p>
      </div>

      <div className="calendar-card" aria-label={wedding.longDate}>
        <div className="calendar-heading">
          <strong>{monthName}</strong>
          <span>{year}</span>
        </div>
        <div className="calendar-weekdays">
          {calendar.weekdays.map(weekday => <span key={weekday}>{weekday}</span>)}
        </div>
        <div className="calendar-grid">
          {cells.map((value, index) => (
            <span
              className={value === day ? 'calendar-day selected' : value ? 'calendar-day' : 'calendar-day empty'}
              key={`${value || 'empty'}-${index}`}
            >
              {value}
            </span>
          ))}
        </div>
      </div>

      <div className="calendar-love-symbol" aria-hidden="true">
        <img src={loveSymbolImage} alt="" loading="lazy" />
      </div>
    </section>
  );
}

function EventCard({ event, mapButtonText }) {
  return (
    <article className="event-card">
      <div className="event-media">
        <img src={event.image} alt={event.imageAlt || event.title} loading="lazy" />
        <span>{event.number}</span>
      </div>
      <div className="event-content">
        <p className="event-time"><Clock3 size={17} />{event.time}</p>
        <h3>{event.title}</h3>
        <p className="event-venue">{event.venue}</p>
        <p className="event-address"><MapPin size={16} />{event.address}</p>
        {event.mapUrl && (
          <a className="text-link" href={event.mapUrl} target="_blank" rel="noreferrer">
            {mapButtonText}<ArrowUpRight size={16} />
          </a>
        )}
      </div>
    </article>
  );
}

export default function App() {
  const [opened, setOpened] = useState(false);
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState('');
  const { couple, wedding, cover, hero, events, notes, rsvp, gallery, location, timing } = config;
  const visibleEvents = events.filter(event => event.enabled !== false);
  const dateParts = wedding.displayDate.split(' · ');

  useEffect(() => {
    document.title = `${couple.combinedName} | Հարսանեկան հրավեր`;
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
    return () => {
      if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'auto';
    };
  }, [couple.combinedName]);

  useEffect(() => {
    document.body.classList.toggle('opened', opened);
    document.body.style.overflow = opened ? '' : 'hidden';
    if (!opened) return () => { document.body.style.overflow = ''; };

    const nodes = [...document.querySelectorAll('.content > section, .content > footer')];
    nodes.forEach((node, i) => {
      node.classList.add('reveal');
      node.style.setProperty('--reveal-delay', `${Math.min(i * 80, 480)}ms`);
    });

    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.14, rootMargin: '0px 0px -8%' },
    );

    nodes.forEach(node => observer.observe(node));
    return () => observer.disconnect();
  }, [opened]);

  async function handleRsvp(event) {
    event.preventDefault();
    setBusy(true);
    setStatus('');

    const form = new FormData(event.currentTarget);
    try {
      const attendance = form.get('attendance');
      const enteredGuestCount = form.get('guestCount');
      const guestCount = attendance === 'no'
        ? (enteredGuestCount === '' ? 0 : Number(enteredGuestCount))
        : Number(enteredGuestCount);

      if (attendance === 'yes' && (!guestCount || guestCount < 1)) {
        throw new Error(rsvp.invalidGuestCountMessage);
      }

      submitRsvp({
        guestName: form.get('guestName').trim(),
        guestCount,
        attendance,
        invitedBy: form.get('invitedBy'),
        submittedAt: new Date().toISOString(),
      }).catch(() => {});

      await new Promise(resolve => setTimeout(resolve, 900));
      setSent(true);
    } catch (error) {
      setStatus(error.message || rsvp.errorMessage);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="invite-shell">
      {!opened && (
        <section className="cover" aria-label="Invitation cover">
          <div className="cover-panel">
            <div className="cover-art">
              <img src={cover.image} alt={cover.imageAlt} />
            </div>
            <div className="cover-content">
              <p className="cover-date">{wedding.displayDate}</p>
              <h1>{couple.partnerOne}<span>&amp;</span>{couple.partnerTwo}</h1>
              <p>{cover.note}</p>
              <button onClick={() => setOpened(true)} type="button">
                {cover.buttonText}<ArrowDown size={18} />
              </button>
            </div>
          </div>
        </section>
      )}

      <main className={opened ? 'content visible' : 'content'}>
        <section className="hero">
          <div className="hero-overlay">
            <p className="hero-day">Wedding Day</p>
            <div className="hero-photo">
              <img src={hero.image} alt={hero.imageAlt} />
              <div className="hero-date" aria-label={wedding.displayDate}>
                {dateParts.map(part => <span key={part}>{part}</span>)}
              </div>
            </div>
            <h1>{couple.partnerOne}<span>&amp;</span>{couple.partnerTwo}</h1>
            <p className="hero-invitation">{hero.invitationText}</p>
          </div>
        </section>

        <WeddingCalendar />

        <section className="memory-section" aria-label={gallery.imageAlt}>
          <div className="memory-frame">
            <img src={gallery.image} alt={gallery.imageAlt} loading="lazy" />
            <span aria-hidden="true">{couple.initials?.partnerOne || 'H'}<i>&amp;</i>{couple.initials?.partnerTwo || 'O'}</span>
          </div>
        </section>

        <section className="places-section section" id="places">
          <div className="section-copy">
            <p className="kicker">{location.kicker}</p>
            <h2>Location<em>for you</em></h2>
            <p>{location.description}</p>
          </div>
          <div className="event-list">
            {visibleEvents.map(event => (
              <EventCard event={event} key={event.id} mapButtonText={location.mapButtonText} />
            ))}
          </div>
        </section>

        <section className="timeline-section section">
          <div className="section-copy">
            <p className="kicker">{timing.kicker}</p>
            <h2>Timing<em>special</em></h2>
          </div>
          <div className="timeline-list">
            {visibleEvents.map(event => (
              <article key={event.id}>
                <div className="timeline-event">
                  <time>{event.time}</time>
                  <h3>{event.title}</h3>
                  <p>{event.venue}</p>
                </div>
                <span aria-hidden="true" />
              </article>
            ))}
          </div>
          <Countdown />
        </section>

        <section className="closing-photo" aria-label={gallery.imageAlt}>
          <div className="closing-photo-frame">
            <img src={gallery.image} alt={gallery.imageAlt} loading="lazy" />
            <span>{couple.initials?.partnerOne || 'H'}<i>&amp;</i>{couple.initials?.partnerTwo || 'O'}</span>
          </div>
        </section>

        {rsvp.enabled && (
          <section className="rsvp-section section" id="rsvp">
            <div className="rsvp-panel">
              <div className="section-copy">
                <p className="kicker">{rsvp.kicker}</p>
                <h2>{rsvp.heading}</h2>
                <p>{rsvp.description}</p>
              </div>

              {sent ? (
                <div className="thanks" role="status">
                  <CheckCircle2 size={24} />
                  <p>{rsvp.successMessage}</p>
                </div>
              ) : (
                <form onSubmit={handleRsvp}>
                  <label>
                    <span>{rsvp.namePlaceholder}</span>
                    <input name="guestName" required autoComplete="name" placeholder={rsvp.namePlaceholder} />
                  </label>
                  <label>
                    <span>{rsvp.guestCountPlaceholder}</span>
                    <input name="guestCount" type="number" min="0" max="20" inputMode="numeric" placeholder="1" />
                  </label>
                  <label>
                    <span>{rsvp.invitedByPlaceholder}</span>
                    <select name="invitedBy" defaultValue="" required>
                      <option value="" disabled>{rsvp.invitedByPlaceholder}</option>
                      {rsvp.invitedByOptions.map(option => (
                        <option value={option.value} key={option.value}>{option.label}</option>
                      ))}
                    </select>
                  </label>
                  <label>
                    <span>{rsvp.attendancePlaceholder}</span>
                    <select name="attendance" defaultValue="" required>
                      <option value="" disabled>{rsvp.attendancePlaceholder}</option>
                      {rsvp.attendanceOptions.map(option => (
                        <option value={option.value} key={option.value}>{option.label}</option>
                      ))}
                    </select>
                  </label>
                  <button disabled={busy} type="submit">
                    {busy ? rsvp.sendingText : rsvp.submitButtonText}
                    {!busy && <Send size={16} />}
                  </button>
                  <p className="form-status" aria-live="polite">{status}</p>
                </form>
              )}
            </div>
          </section>
        )}

        <section className="details-section section">
          <div className="section-copy">
            <p className="kicker">{notes.kicker}</p>
            <h2>DETAILS<em>special</em></h2>
          </div>
          <div className="details-grid">
            {notes.items.map(note => (
              <article key={note.title}>
                {note.icon === 'calendar' ? <CalendarDays size={24} /> : <Heart size={24} />}
                <h3>{note.title}</h3>
                <p>{note.text}</p>
              </article>
            ))}
            <article>
              <Music2 size={24} />
              <h3>{wedding.displayDate}</h3>
              <p>Սպասում ենք Ձեզ ջերմ, լուսավոր և անմոռանալի երեկոյի համար։</p>
            </article>
          </div>
          <div className="signature" aria-label="With love">
            <p>WITH LOVE</p>
            <strong>{couple.initials?.partnerOne || 'H'}<i>&amp;</i>{couple.initials?.partnerTwo || 'O'}</strong>
            <small>Belle âme</small>
          </div>
        </section>

        <footer>
          <span>{couple.combinedName}</span>
          <small>{wedding.longDate}</small>
        </footer>
      </main>
    </div>
  );
}
