import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Heart,
  MapPin,
  Music2,
} from 'lucide-react';
import { useCountdown } from './hooks/useCountdown';
import { submitRsvp } from './services/rsvpService';
import { weddingConfig as config } from './config/weddingConfig';
import brideIcon from './assets/pics/bribehouse.png';
import churchIcon from './assets/pics/church.png';
import servantIcon from './assets/pics/restorant.png';
import leLogo from './assets/pics/LElogo.png';
import elenAndLyovLogo from './assets/pics/ElenAndLyovLogopng.png';
import handsImage from './assets/pics/hands.jpg';
import musicTrack from './musics/Stephen-Sanchez-Until-I-Found-You.m4a';

const timelineIcons = [brideIcon, churchIcon, servantIcon];

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
        <h2 data-shadow={calendar.heading}>{calendar.heading}</h2>
        <p>{calendar.description.split('։')[0]}։</p>
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

      <p className="calendar-date-display">{wedding.displayDate}</p>

      <div className="calendar-love-symbol" aria-hidden="true">
        <Heart size={42} strokeWidth={1.25} />
      </div>
    </section>
  );
}

function EventCard({ event, mapButtonText, minimal = false }) {
  return (
    <article className="event-card">
      <div className="event-media">
        <img src={event.image} alt={event.imageAlt || event.title} loading="lazy" />
        <span>{event.number}</span>
      </div>
      <div className="event-content">
        <h3>{event.title}</h3>
        {!minimal && <>
          <p className="event-time"><Clock3 size={17} />{event.time}</p>
          <p className="event-venue">{event.venue}</p>
          <p className="event-address"><MapPin size={16} />{event.address}</p>
        </>}
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
  const [opened, setOpened] = useState(true);
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState('');
  const audioRef = useRef(null);
  const { couple, wedding, cover, hero, events, notes, rsvp, gallery, location, timing, appearance } = config;
  const visibleEvents = events.filter(event => event.enabled !== false);
  const timingItems = visibleEvents.map(event => ({ time: event.time, title: event.title }));
  const dateParts = wedding.displayDate.split(' · ');

  function openInvitation() {
    setOpened(true);
    audioRef.current?.play().catch(() => {});
  }

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

  useEffect(() => {
    if (!opened) return undefined;

    const audio = audioRef.current;
    let retryTimer;
    const tryPlay = () => {
      if (!audio) return Promise.resolve();
      const attempt = audio.play();
      return attempt && typeof attempt.then === 'function' ? attempt : Promise.resolve();
    };

    retryTimer = window.setTimeout(() => { tryPlay().catch(() => {}); }, 1000);

    const unlockAudio = () => {
      tryPlay()
        .then(() => {
          document.removeEventListener('pointerdown', unlockAudio);
          document.removeEventListener('touchstart', unlockAudio);
          document.removeEventListener('keydown', unlockAudio);
        })
        .catch(() => {});
    };

    document.addEventListener('pointerdown', unlockAudio, { passive: true });
    document.addEventListener('touchstart', unlockAudio, { passive: true });
    document.addEventListener('keydown', unlockAudio);

    return () => {
      window.clearTimeout(retryTimer);
      document.removeEventListener('pointerdown', unlockAudio);
      document.removeEventListener('touchstart', unlockAudio);
      document.removeEventListener('keydown', unlockAudio);
    };
  }, [opened]);

  useEffect(() => {
    if (!opened) return undefined;

    let cancelled = false;
    let frame;
    let timer;
    const cancelAutoScroll = () => {
      cancelled = true;
      window.clearTimeout(timer);
      window.cancelAnimationFrame(frame);
    };
    const onKeyDown = event => {
      if (['ArrowDown', 'PageDown', ' ', 'End'].includes(event.key)) cancelAutoScroll();
    };

    window.addEventListener('wheel', cancelAutoScroll, { passive: true });
    window.addEventListener('touchmove', cancelAutoScroll, { passive: true });
    window.addEventListener('keydown', onKeyDown);

    timer = window.setTimeout(() => {
      if (cancelled) return;
      const start = window.scrollY;
      const target = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      const distance = target - start;
      if (distance <= 12) return;

      const duration = Math.min(26000, Math.max(14000, distance * 14));
      const startedAt = performance.now();
      const previousScrollBehavior = document.documentElement.style.scrollBehavior;
      document.documentElement.style.scrollBehavior = 'auto';

      const step = now => {
        if (cancelled) {
          document.documentElement.style.scrollBehavior = previousScrollBehavior;
          return;
        }
        const progress = Math.min(1, (now - startedAt) / duration);
        window.scrollTo(0, start + distance * progress);
        if (progress < 1) frame = window.requestAnimationFrame(step);
        else document.documentElement.style.scrollBehavior = previousScrollBehavior;
      };

      frame = window.requestAnimationFrame(step);
    }, 2000);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      window.cancelAnimationFrame(frame);
      window.removeEventListener('wheel', cancelAutoScroll);
      window.removeEventListener('touchmove', cancelAutoScroll);
      window.removeEventListener('keydown', onKeyDown);
    };
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
      <audio ref={audioRef} className="invitation-audio" src={musicTrack} loop preload="auto" playsInline muted />
      {!opened && (
        <section className="cover" aria-label="Invitation cover">
          <div className="cover-panel">
            <div className="cover-art">
              <img src={cover.image} alt={cover.imageAlt} />
            </div>
            <div className="cover-content">
              <p className="cover-date">LYOV <span>&amp;</span> ELEN</p>
              <img className="cover-logo" src={leLogo} alt="Lyov and Elen" />
              <button onClick={openInvitation} type="button">Բացել</button>
            </div>
          </div>
        </section>
      )}

      <main className={opened ? 'content visible' : 'content'}>
        <section className="hero">
          <div className="hero-overlay">
            <img className="hero-names-logo" src={elenAndLyovLogo} alt="Lyov and Elen" />
            <div className="hero-photo">
              <img src={hero.image} alt={hero.imageAlt} />
              <div className="hero-date" aria-label={wedding.displayDate}>
                {dateParts.map(part => <span key={part}>{part}</span>)}
              </div>
            </div>
            <img className="hero-logo" src={leLogo} alt="Lyov and Elen" />
            <p className="hero-invitation">{wedding.displayDate}</p>
          </div>
        </section>

        <WeddingCalendar />

        <section className="memory-section" aria-label={gallery.imageAlt}>
          <div className="memory-frame">
            <img src={gallery.image} alt={gallery.imageAlt} loading="lazy" />
            <img className="memory-detail" src={handsImage} alt="Hands reaching for each other" loading="lazy" />
          </div>
        </section>

        <section className="places-section section" id="places">
          <div className="section-copy">
            <h2 data-shadow="Հասցեներ">Հասցեներ</h2>
          </div>
          <div className="event-list">
            {visibleEvents.map(event => (
              <EventCard event={event} key={event.id} mapButtonText={location.mapButtonText} minimal />
            ))}
          </div>
        </section>

        <section
          className="timeline-section section"
          style={{
            '--timeline-gap': appearance.timeline.eventGap,
            '--timeline-time-size': appearance.timeline.timeSize,
            '--timeline-caption-size': appearance.timeline.captionSize,
            '--timeline-max-width': appearance.timeline.maxWidth,
          }}
        >
          <div className="section-copy">
            <p className="kicker">{timing.kicker}</p>
            <h2 data-shadow="Օրվա Ծրագիրը">Օրվա Ծրագիրը<em>special</em></h2>
          </div>
          <div className="timeline-list">
            {timingItems.map((event, index) => (
              <article key={`${event.time}-${index}`}>
                <div className="timeline-event">
                  <span className="timeline-icon" aria-hidden="true">
                    <img className="timeline-icon-image" src={timelineIcons[index]} alt="" />
                  </span>
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
                <h2 data-shadow={rsvp.heading}>{rsvp.heading}</h2>
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
                    {!busy && <Heart size={16} fill="currentColor" />}
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
            <h2 data-shadow="DETAILS">DETAILS<em>special</em></h2>
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
