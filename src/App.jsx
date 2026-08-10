import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowUpRight,
  CheckCircle2,
  Heart,
  MapPin,
} from 'lucide-react';
import { useCountdown } from './hooks/useCountdown';
import { submitRsvp } from './services/rsvpService';
import { weddingConfig as config } from './config/weddingConfig';
import leLogo from './assets/pics/LElogo.png';
import elenAndLyovLogo from './assets/pics/ElenAndLyovLogopng.png';
import handsImage from './assets/pics/hands.jpg';
import iranqImage from './assets/pics/iranq.jpg';
import pictureOne from './assets/pics/picture1.jpg';
import pictureTwo from './assets/pics/picture2.jpg';
import pictureThree from './assets/pics/picture3.jpg';
import musicTrack from './musics/Stephen-Sanchez-Until-I-Found-You.m4a';

const formatNumber = value => String(value).padStart(2, '0');
const closingPhotos = [
  { src: pictureOne, alt: 'Էլենի և Լյովայի լուսանկար 1' },
  { src: pictureTwo, alt: 'Էլենի և Լյովայի լուսանկար 2' },
  { src: pictureThree, alt: 'Էլենի և Լյովայի լուսանկար 3' },
];

function Countdown({ className = '' }) {
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
    <div className={`countdown ${className}`.trim()} aria-label={countdown.heading}>
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
      <div className="section-copy armenian-decorative-text">
        <p className="kicker">{calendar.kicker}</p>
        <h2 className="armenian-decorative-text">{calendar.heading}</h2>
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

      <div className="calendar-date-display" aria-label="Հոկտեմբեր 2026, հարսանիքի օրը՝ հոկտեմբերի 20-ին">
        <div className="date-rail-heading">
          <span>Հոկտեմբեր 2026</span>
        </div>
        <div className="date-rail" role="list">
          {[
            ['18', 'Կիր'],
            ['19', 'Երկ'],
            ['20', 'Երք'],
            ['21', 'Չոր'],
            ['22', 'Հնգ'],
          ].map(([day, weekday]) => (
            <span className={day === '20' ? 'date-rail-day selected' : 'date-rail-day'} key={day} role="listitem">
              <small>{weekday}</small>
              <strong>{day}</strong>
            </span>
          ))}
        </div>
      </div>

      <div className="calendar-love-symbol" aria-hidden="true">
        <Heart size={42} strokeWidth={1.25} />
      </div>
    </section>
  );
}

export default function App() {
  const [opened, setOpened] = useState(true);
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState('');
  const audioRef = useRef(null);
  const { couple, wedding, cover, hero, events, rsvp, gallery, location, timing, appearance } = config;
  const visibleEvents = events.filter(event => event.enabled !== false);
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
            <img src={handsImage} alt="Hands reaching for each other" loading="lazy" />
            <img className="memory-detail" src={iranqImage} alt="Hands reaching for each other at the church" loading="lazy" />
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
            <h2>Օրվա ծրագիրը</h2>
          </div>
          <div className="timeline-list">
            {visibleEvents.map(event => (
              <article className="timeline-card" key={event.id}>
                <div className={`timeline-media event-media-${event.id}`}>
                  <img src={event.image} alt={event.imageAlt || event.title} loading="lazy" />
                </div>
                <div className="timeline-event">
                  <time>{event.time}</time>
                  <h3>{event.timelineTitle || event.title}</h3>
                  <p className="timeline-address-title">{event.addressTitle || event.venue}</p>
                  <p className="timeline-address">{event.address}</p>
                  {event.mapUrl && (
                    <a className="text-link" href={event.mapUrl} target="_blank" rel="noreferrer">
                      <MapPin size={16} />{location.mapButtonText}<ArrowUpRight size={16} />
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
          <Countdown />
        </section>

        <section className="closing-photo" aria-label={gallery.imageAlt}>
          <div className="closing-photo-frame">
            {closingPhotos.map(photo => (
              <img src={photo.src} alt={photo.alt} key={photo.src} loading="lazy" />
            ))}
          </div>
        </section>

        {rsvp.enabled && (
          <section className="rsvp-section section" id="rsvp">
            <div className="rsvp-panel">
              <Countdown className="rsvp-countdown" />
              <div className="section-copy">
                <p className="kicker">{rsvp.kicker}</p>
                <h2>{rsvp.heading}</h2>
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
                  </button>
                  <p className="form-status" aria-live="polite">{status}</p>
                </form>
              )}
            </div>
          </section>
        )}

        <section className="invitation-closing" aria-label="Closing message">
          <p>Սիրով սպասում ենք Ձեզ</p>
        </section>

      </main>
    </div>
  );
}
