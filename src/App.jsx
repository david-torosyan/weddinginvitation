import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowUpRight,
  CheckCircle2,
  Heart,
  MapPin,
} from 'lucide-react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import {
  AmbientGlow,
  AnimatedSection,
  MotionGroup,
  MotionInteractive,
  MotionItem,
  MotionPage,
  ScrollRevealItem,
  motionTokens,
  motionVariants,
} from './components/common/AnimatedSection';
import { useCountdown } from './hooks/useCountdown';
import { useReducedMotion } from './hooks/useReducedMotion';
import { submitRsvp } from './services/rsvpService';
import { getWeddingConfig } from './config/weddingConfig';
import leLogo from './assets/pics/LElogo.png';
import elenAndLyovLogo from './assets/pics/ElenAndLyovLogopng.png';
import handsImage from './assets/pics/hands.jpg';
import iranqImage from './assets/pics/iranq.jpg';
import pictureOne from './assets/pics/picture1.jpg';
import pictureTwo from './assets/pics/picture2.jpg';
import pictureThree from './assets/pics/picture3.jpg';
import musicTrack from "./musics/Elvis_Presley_Can't_Help_Falling_In_Love_Official_Audio.mp3";

const formatNumber = value => String(value).padStart(2, '0');
const NumericText = ({ children }) => String(children).split(/(\d+)/).map((part, index) => (
  /^\d+$/.test(part) ? <span className="numeric-text" key={index}>{part}</span> : part
));
const LANGUAGE_STORAGE_KEY = 'invitation-language';
const DEFAULT_LANGUAGE = 'hy';
const supportedLanguages = ['hy', 'ru', 'en'];
const languageOptions = [
  { code: 'hy', label: 'ARM' },
  { code: 'ru', label: 'RUS' },
  { code: 'en', label: 'ENG' },
];

function Countdown({ className = '', config }) {
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
    <MotionGroup className={`countdown ${className}`.trim()} aria-label={countdown.heading} variants={motionVariants.fastGroup}>
      <MotionItem as="p" variants={motionVariants.supporting}>{countdown.heading}</MotionItem>
      <MotionGroup className="countdown-grid" variants={motionVariants.fastGroup}>
        {units.map(unit => (
          <MotionItem as="span" className="countdown-unit" key={unit.label} variants={motionVariants.scale}>
            <strong><NumericText>{formatNumber(unit.value)}</NumericText></strong>
            <small>{unit.label}</small>
          </MotionItem>
        ))}
      </MotionGroup>
    </MotionGroup>
  );
}

function ClosingPhotoCarousel({ ariaLabel, photos }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const carouselRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const inView = useInView(carouselRef, { amount: 0.35 });

  useEffect(() => {
    setActiveIndex(0);
  }, [photos]);

  useEffect(() => {
    if (!inView || paused || reducedMotion || photos.length < 2) return undefined;

    const intervalId = window.setInterval(() => {
      setActiveIndex(currentIndex => (currentIndex + 1) % photos.length);
    }, 1800);

    return () => window.clearInterval(intervalId);
  }, [inView, paused, photos.length, reducedMotion]);

  const activePhoto = photos[activeIndex];

  return (
    <AnimatedSection className="closing-photo" id="closing-gallery" aria-label={ariaLabel}>
      <MotionGroup
        className="closing-photo-frame"
        ref={carouselRef}
        variants={motionVariants.group}
        onPointerEnter={() => setPaused(true)}
        onPointerLeave={() => setPaused(false)}
      >
        <div className="closing-photo-viewport">
          <AnimatePresence initial={false}>
            <motion.img
              src={activePhoto.src}
              alt={activePhoto.alt}
              key={activePhoto.src}
              loading="lazy"
              decoding="async"
              draggable="false"
              initial={reducedMotion ? false : { x: '100%', opacity: 0.45, scale: 1.025 }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              exit={reducedMotion ? { opacity: 0 } : { x: '-100%', opacity: 0.45, scale: 1.025 }}
              transition={{ duration: reducedMotion ? 0 : 0.58, ease: motionTokens.ease }}
            />
          </AnimatePresence>
        </div>
      </MotionGroup>

      <div className="closing-photo-controls" aria-label={ariaLabel} role="group">
        {photos.map((photo, index) => (
          <button
            type="button"
            className={index === activeIndex ? 'is-active' : ''}
            aria-label={photo.alt}
            aria-pressed={index === activeIndex}
            key={photo.src}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
    </AnimatedSection>
  );
}

function WeddingCalendar({ config }) {
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
    <AnimatedSection
      className="calendar-section section"
      id="date"
      viewport={motionTokens.eventViewport}
    >
      <MotionGroup className="section-copy armenian-decorative-text">
        <MotionItem as="p" className="kicker" variants={motionVariants.eyebrow}>{calendar.kicker}</MotionItem>
        <MotionItem as="h2" className="armenian-decorative-text calendar-invite-heading" variants={motionVariants.heading}>{calendar.heading}</MotionItem>
        <MotionItem as="p" className="calendar-invite-lead" variants={motionVariants.supporting}>{calendar.leadText}</MotionItem>
      </MotionGroup>

      <MotionItem className="calendar-card" aria-label={wedding.longDate} variants={motionVariants.scale}>
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
              <NumericText>{value || ''}</NumericText>
            </span>
          ))}
        </div>
      </MotionItem>

      <MotionItem className="calendar-date-display" aria-label={calendar.rail.ariaLabel} variants={motionVariants.item}>
        <div className="date-rail-heading">
          <span><NumericText>{calendar.rail.heading}</NumericText></span>
        </div>
        <MotionGroup className="date-rail" role="list" variants={motionVariants.fastGroup}>
          {calendar.rail.days.map(([day, weekday]) => (
            <MotionItem as="span" className={day === '20' ? 'date-rail-day selected' : 'date-rail-day'} key={day} role="listitem" variants={motionVariants.scale}>
              <small>{weekday}</small>
              <strong><NumericText>{day}</NumericText></strong>
            </MotionItem>
          ))}
        </MotionGroup>
      </MotionItem>

      <MotionItem className="calendar-love-symbol" aria-hidden="true" variants={motionVariants.scale}>
        <Heart size={42} strokeWidth={1.25} />
      </MotionItem>
    </AnimatedSection>
  );
}

export default function App() {
  const [language, setLanguage] = useState(() => {
    if (typeof window === 'undefined') return DEFAULT_LANGUAGE;
    const storedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return supportedLanguages.includes(storedLanguage) ? storedLanguage : DEFAULT_LANGUAGE;
  });
  const [opened, setOpened] = useState(true);
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState('');
  const [musicPlaying, setMusicPlaying] = useState(false);
  const audioRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const config = useMemo(() => getWeddingConfig(language), [language]);
  const { couple, wedding, cover, hero, events, rsvp, gallery, location, timing, appearance } = config;
  const visibleEvents = events.filter(event => event.enabled !== false);
  const dateParts = wedding.displayDate.split(' · ');
  const closingPhotos = useMemo(
    () => [
      { src: pictureOne, alt: gallery.closingPhotoAlts[0] },
      { src: pictureTwo, alt: gallery.closingPhotoAlts[1] },
      { src: pictureThree, alt: gallery.closingPhotoAlts[2] },
    ],
    [gallery.closingPhotoAlts],
  );

  function openInvitation() {
    setOpened(true);
    audioRef.current?.play().catch(() => {});
  }

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  }, [language]);

  useEffect(() => {
    document.title = `${couple.combinedName} | ${config.meta.documentTitleSuffix}`;
    document.documentElement.lang = wedding.locale;
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
    return () => {
      if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'auto';
    };
  }, [config.meta.documentTitleSuffix, couple.combinedName, wedding.locale]);

  useEffect(() => {
    document.body.classList.toggle('opened', opened);
    document.body.style.overflow = opened ? '' : 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [opened]);

  useEffect(() => {
    if (!opened) return undefined;

    const audio = audioRef.current;
    const tryPlay = () => {
      if (!audio) return Promise.resolve();
      const attempt = audio.play();
      return attempt && typeof attempt.then === 'function' ? attempt : Promise.resolve();
    };

    const unlockAudio = event => {
      if (event.target instanceof Element && event.target.closest('.music-toggle')) return;

      tryPlay()
        .then(() => {
          document.removeEventListener('pointerdown', unlockAudio);
          document.removeEventListener('touchstart', unlockAudio);
          document.removeEventListener('keydown', unlockAudio);
          window.removeEventListener('wheel', unlockAudio);
        })
        .catch(() => {});
    };

    document.addEventListener('pointerdown', unlockAudio, { passive: true });
    document.addEventListener('touchstart', unlockAudio, { passive: true });
    document.addEventListener('keydown', unlockAudio);
    window.addEventListener('wheel', unlockAudio, { passive: true });
    tryPlay().catch(() => {});

    return () => {
      document.removeEventListener('pointerdown', unlockAudio);
      document.removeEventListener('touchstart', unlockAudio);
      document.removeEventListener('keydown', unlockAudio);
      window.removeEventListener('wheel', unlockAudio);
    };
  }, [opened]);

  function toggleMusic() {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.play().catch(() => setMusicPlaying(false));
    } else {
      audio.pause();
    }
  }

  useEffect(() => {
    if (!opened || reducedMotion) return undefined;

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
    }, 5000);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      window.cancelAnimationFrame(frame);
      window.removeEventListener('wheel', cancelAutoScroll);
      window.removeEventListener('touchmove', cancelAutoScroll);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [opened, reducedMotion]);

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

      submitRsvp(
        {
          guestName: form.get('guestName').trim(),
          guestCount,
          attendance,
          invitedBy: form.get('invitedBy'),
          submittedAt: new Date().toISOString(),
        },
        { missingWebhookUrl: rsvp.missingWebhookUrlMessage },
      ).catch(() => {});

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
      <AmbientGlow />
      <MotionGroup className="language-switcher" role="group" aria-label={config.meta.languageSelectorAriaLabel} variants={motionVariants.fastGroup}>
        {languageOptions.map(option => (
          <MotionInteractive
            className={language === option.code ? 'active' : ''}
            key={option.code}
            onClick={() => setLanguage(option.code)}
            type="button"
          >
            {option.label}
          </MotionInteractive>
        ))}
      </MotionGroup>
      <audio
        ref={audioRef}
        className="invitation-audio"
        src={musicTrack}
        autoPlay
        loop
        preload="auto"
        playsInline
        onPlay={() => setMusicPlaying(true)}
        onPause={() => setMusicPlaying(false)}
      />
      <button
        type="button"
        className={`music-toggle ${musicPlaying ? 'is-playing' : 'is-paused'}`}
        onClick={toggleMusic}
        aria-label={musicPlaying ? 'Turn music off' : 'Turn music on'}
        aria-pressed={musicPlaying}
        title={musicPlaying ? 'Turn music off' : 'Turn music on'}
      >
        <span className="music-toggle-indicator" aria-hidden="true" />
      </button>
      {!opened && (
        <AnimatedSection className="cover" aria-label={config.meta.coverAriaLabel}>
          <MotionGroup className="cover-panel">
            <MotionItem className="cover-art" variants={motionVariants.image}>
              <img src={cover.image} alt={cover.imageAlt} decoding="async" fetchPriority="high" />
            </MotionItem>
            <MotionGroup className="cover-content">
              <MotionItem as="p" className="cover-date" variants={motionVariants.eyebrow}>LYOV <span>&amp;</span> ELEN</MotionItem>
              <MotionItem as="img" className="cover-logo" src={leLogo} alt="Lyov and Elen" variants={motionVariants.heading} />
              <MotionInteractive onClick={openInvitation} type="button" variants={motionVariants.supporting}>{cover.buttonText}</MotionInteractive>
            </MotionGroup>
          </MotionGroup>
        </AnimatedSection>
      )}

      <MotionPage className={opened ? 'content visible' : 'content'}>
        <AnimatedSection className="hero" viewport={{ once: true, amount: 0.02 }}>
          <MotionGroup className="hero-overlay" variants={motionVariants.group}>
            <MotionItem as="img" className="hero-names-logo" src={elenAndLyovLogo} alt="Lyov and Elen" variants={motionVariants.heading} decoding="async" />
            <MotionItem className="hero-photo" variants={motionVariants.image}>
              <img src={hero.image} alt={hero.imageAlt} decoding="async" fetchPriority="high" />
              <MotionGroup className="hero-date" aria-label={wedding.displayDate} variants={motionVariants.fastGroup}>
                {dateParts.map(part => (
                  <MotionItem as="span" key={part} variants={motionVariants.item}>
                    <NumericText>{part}</NumericText>
                  </MotionItem>
                ))}
              </MotionGroup>
            </MotionItem>
            <MotionItem as="img" className="hero-logo" src={leLogo} alt="Lyov and Elen" variants={motionVariants.item} decoding="async" />
            <MotionItem as="p" className="hero-invitation" variants={motionVariants.supporting}><NumericText>{wedding.displayDate}</NumericText></MotionItem>
          </MotionGroup>
        </AnimatedSection>

        <WeddingCalendar config={config} />

        <AnimatedSection className="memory-section" aria-label={gallery.imageAlt}>
          <MotionGroup className="memory-frame" variants={motionVariants.group}>
            <MotionItem as="img" src={handsImage} alt={gallery.memoryMainAlt} loading="lazy" decoding="async" variants={motionVariants.image} />
            <MotionItem as="img" className="memory-detail" src={iranqImage} alt={gallery.memoryDetailAlt} loading="lazy" decoding="async" variants={motionVariants.memoryDetail} />
          </MotionGroup>
        </AnimatedSection>

        <AnimatedSection
          className="timeline-section section"
          style={{
            '--timeline-gap': appearance.timeline.eventGap,
            '--timeline-time-size': appearance.timeline.timeSize,
            '--timeline-caption-size': appearance.timeline.captionSize,
            '--timeline-max-width': appearance.timeline.maxWidth,
          }}
        >
          <MotionGroup className="section-copy">
            <MotionItem as="p" className="kicker" variants={motionVariants.eyebrow}>{timing.kicker}</MotionItem>
            <MotionItem as="h2" variants={motionVariants.heading}>{timing.heading}</MotionItem>
          </MotionGroup>
          <div className="timeline-list">
            {visibleEvents.map(event => (
              <ScrollRevealItem as="article" className="timeline-card" key={event.id} variants={motionVariants.timelineCard}>
                <MotionItem className={`timeline-media event-media-${event.id}`} variants={motionVariants.image}>
                  <img src={event.image} alt={event.imageAlt || event.title} loading="lazy" decoding="async" />
                </MotionItem>
                <MotionGroup className="timeline-event" variants={motionVariants.fastGroup}>
                  <MotionItem as="time"><NumericText>{event.time}</NumericText></MotionItem>
                  <MotionItem as="h3">{event.timelineTitle || event.title}</MotionItem>
                  <MotionItem as="p" className="timeline-address-title">{event.addressTitle || event.venue}</MotionItem>
                  <MotionItem as="p" className="timeline-address">{event.address}</MotionItem>
                  {event.mapUrl && (
                    <MotionInteractive as="a" className="text-link" href={event.mapUrl} target="_blank" rel="noreferrer" variants={motionVariants.item}>
                      <MapPin size={16} />{location.mapButtonText}<ArrowUpRight size={16} />
                    </MotionInteractive>
                  )}
                </MotionGroup>
              </ScrollRevealItem>
            ))}
          </div>
          <Countdown config={config} />
        </AnimatedSection>

        <ClosingPhotoCarousel ariaLabel={gallery.imageAlt} photos={closingPhotos} />

        {rsvp.enabled && (
          <AnimatedSection className="rsvp-section section" id="rsvp">
            <MotionGroup className="rsvp-panel" variants={motionVariants.group}>
              <Countdown className="rsvp-countdown" config={config} />
              <MotionGroup className="section-copy">
                <MotionItem as="p" className="kicker" variants={motionVariants.eyebrow}>{rsvp.kicker}</MotionItem>
                <MotionItem as="h2" variants={motionVariants.heading}>{rsvp.heading}</MotionItem>
              </MotionGroup>

              {sent ? (
                <MotionItem className="thanks" role="status" variants={motionVariants.scale}>
                  <CheckCircle2 size={24} />
                  <p>{rsvp.successMessage}</p>
                </MotionItem>
              ) : (
                <MotionGroup as="form" onSubmit={handleRsvp} variants={motionVariants.fastGroup}>
                  <MotionItem as="label">
                    <span>{rsvp.namePlaceholder}</span>
                    <input name="guestName" required autoComplete="name" placeholder={rsvp.namePlaceholder} />
                  </MotionItem>
                  <MotionItem as="label">
                    <span>{rsvp.guestCountPlaceholder}</span>
                    <input name="guestCount" type="number" min="0" max="20" inputMode="numeric" placeholder="Հյուրերի քանակը" />
                  </MotionItem>
                  <MotionItem as="label">
                    <span>{rsvp.invitedByPlaceholder}</span>
                    <select name="invitedBy" defaultValue="" required>
                      <option value="" disabled>{rsvp.invitedByPlaceholder}</option>
                      {rsvp.invitedByOptions.map(option => (
                        <option value={option.value} key={option.value}>{option.label}</option>
                      ))}
                    </select>
                  </MotionItem>
                  <MotionItem as="label">
                    <span>{rsvp.attendancePlaceholder}</span>
                    <select name="attendance" defaultValue="" required>
                      <option value="" disabled>{rsvp.attendancePlaceholder}</option>
                      {rsvp.attendanceOptions.map(option => (
                        <option value={option.value} key={option.value}>{option.label}</option>
                      ))}
                    </select>
                  </MotionItem>
                  <MotionInteractive disabled={busy} type="submit" variants={motionVariants.item}>
                    {busy ? rsvp.sendingText : rsvp.submitButtonText}
                  </MotionInteractive>
                  <MotionItem as="p" className="form-status" aria-live="polite">{status}</MotionItem>
                </MotionGroup>
              )}
              <MotionItem as="p" className="rsvp-closing" variants={motionVariants.supporting}>{config.footer.closingMessage}</MotionItem>
            </MotionGroup>
          </AnimatedSection>
        )}

      </MotionPage>
    </div>
  );
}
