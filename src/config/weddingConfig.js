// Edit this file to update the invitation content without changing the page layout.
import elenlyovImage from '../assets/pics/elenlyov.jpg';
import homeImage from '../assets/pics/bribehouse.png';
import groomHouseImage from '../assets/pics/groomhouse.png';
import churchImage from '../assets/pics/church.png';
import zagsImage from '../assets/pics/zags.png';
import restorantImage from '../assets/pics/restorant.png';

export const weddingConfig = {
  // Quick visual controls. Change these values to tune the timing section.
  appearance: {
    timeline: {
      eventGap: '3rem',
      timeSize: 'clamp(6.5rem, 26vw, 10rem)',
      captionSize: '2.6rem',
      maxWidth: '25rem',
    },
  },
  couple: { partnerOne: 'Էլեն', partnerTwo: 'Լյովա', combinedName: 'ԷԼԵՆ & ԼՅՈՎԱ', initials: { partnerOne: 'Է', partnerTwo: 'Լ' } },
  wedding: {
    date: '2026-10-25T14:00:00+04:00', displayDate: '20 · 10 · 2026', longDate: 'Կիրակի · 25 Հոկտեմբեր · 2026',
    locale: 'hy-AM', timezone: 'Asia/Yerevan', rsvpDeadline: '2026-10-15T23:59:59+04:00',
  },
  cover: { note: 'A day to remember', buttonText: 'Բացել հրավերը', image: '/pics/elenlyov.jpg', imageAlt: 'Հարսանյաց վայրի նկարազարդում' },
  hero: { eyebrow: 'ՄԵՐ ՀԱՐՍԱՆԻՔԸ', title: 'ԷԼԵՆ & ԼՅՈՎԱ', invitationText: 'Սիրով հրավիրում ենք Ձեզ ներկա գտնվելու մեր հարսանյաց արարողությանը։', image: '/pics/elenlyov.jpg', imageAlt: 'Հարսանյաց վայրի նկարազարդում' },
  introduction: { kicker: 'Հարգելի՛ հյուրեր', heading: 'Մեր պատմությունը շարունակվում է', emphasis: 'Ձեզ հետ միասին', paragraphs: ['Սիրով հրավիրում ենք Ձեզ կիսելու մեզ հետ մեր կյանքի կարևորագույն օրը։'] },
  itinerary: { kicker: 'Տոնակատարությունը', heading: 'Երեք վայր,', emphasis: 'մեկ գեղեցիկ օր', description: 'Պահպանեք ստորև նշված ժամերը և քարտեզի հղումներով գտեք յուրաքանչյուր վայրի ճանապարհը։' },
  calendar: { kicker: 'Our Day', heading: 'Սիրելի՛ Հյուրեր,', description: 'Սիրով հրավիրում ենք Ձեզ ներկա գտնվելու մեր հարսանյաց արարողությանը։ Ծանոթացեք օրվա ծրագրին և հաստատեք Ձեր ներկայությունը։', weekdays: ['Երկ', 'Երք', 'Չոր', 'Հնգ', 'Ուրբ', 'Շաբ', 'Կիր'] },
  gallery: { image: '/pics/elenlyov.jpg', imageAlt: 'Էլենի և Լյովայի լուսանկարը' },
  location: { kicker: 'Վայրը', heading: 'Location', emphasis: 'for you', description: 'Մեզ համար կարևոր յուրաքանչյուր պահը կանցկացնենք գեղեցիկ և սիրելի վայրերում։', mapButtonText: 'Քարտեզ' },
  timing: { kicker: 'Օրվա ծրագիր', heading: 'Timing', emphasis: 'special' },
  events: [
    { id: 'groom-house', number: '01', title: 'Փեսայի տուն', time: '11:00', venue: 'Հավաքվում ենք միասին', address: 'Հասցեն կավելացվի ավելի ուշ', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Groom%27s+home+Armenia', image: '/pics/groomhouse.png', imageAlt: 'Փեսայի տան նկարազարդում', enabled: true },
    { id: 'bride-house', number: '02', title: 'Հարսի տուն', time: '12:00', venue: 'Հավաքվում ենք միասին', address: 'Հասցեն կավելացվի ավելի ուշ', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Bride%27s+home+Armenia', image: '/pics/bribehouse.png', imageAlt: 'Հարսի տան նկարազարդում', enabled: true },
    { id: 'church', number: '03', title: 'Պսակադրության արարողություն', time: '15:00', venue: 'Սուրբ Հռիփսիմե եկեղեցի', address: 'Վաղարշապատ, Արմավիրի մարզ', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Saint+Hripsime+Church+Vagharshapat', image: '/pics/church.png', imageAlt: 'Սուրբ Հռիփսիմե եկեղեցու նկարազարդում', enabled: true },
    { id: 'zags', number: '04', title: 'Ամուսնության գրանցում', time: '16:00', venue: 'Սուրբ Հռիփսիմե եկեղեցի', address: 'Վաղարշապատ, Արմավիրի մարզ', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Saint+Hripsime+Church+Vagharshapat', image: '/pics/zags.png', imageAlt: 'Սուրբ Հռիփսիմե եկեղեցու նկարազարդում', enabled: true },
    { id: 'reception', number: '05', title: 'Հարսանյանց հանդիսություն', time: '17:00', venue: 'Արարատ Հոլ', address: 'Հասցեն կավելացվի ավելի ուշ', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Ararat+Hall+Armenia', image: '/pics/restorant.png', imageAlt: 'Ռեստորանի նկարազարդում', enabled: true },
  ],
  countdown: { heading: 'Մնացել է․․․', labels: { days: 'ՕՐ', hours: 'ԺԱՄ', minutes: 'ՐՈՊԵ', seconds: 'ՎՐԿ' } },
  notes: {
    kicker: 'Օրվա մասին', items: [
      { icon: 'calendar', title: 'Ինչ է սպասվում', text: 'Ջերմ ընդունելություն, եկեղեցական օրհնություն, ընտանեկան լուսանկարներ, ընթրիք, երաժշտություն և պարեր։' },
      { icon: 'heart', title: 'Սիրով', text: 'Ձեր ներկայությունը մեզ համար ամենամեծ նվերն է։ Եկեք և միասին նշենք մեր նոր սկիզբը։' },
    ]
  },
  rsvp: {
    enabled: true, kicker: 'RSVP', heading: 'Կմիանա՞ք մեզ', description: 'Խնդրում ենք հաստատել Ձեր ներկայությունը մինչև 15 Հոկտեմբեր, 2026։',
    namePlaceholder: 'Ձեր անունը', guestCountPlaceholder: 'Հյուրերի քանակը', attendancePlaceholder: 'Կմասնակցե՞ք', invitedByPlaceholder: 'Ում կողմից եք հրավիրված',
    invitedByOptions: [{ value: 'bride', label: 'Հարսի կողմից' }, { value: 'groom', label: 'Փեսայի կողմից' }],
    attendanceOptions: [{ value: 'yes', label: 'Այո, սիրով կմասնակցեմ' }, { value: 'no', label: 'Ցավոք, չեմ կարողանա մասնակցել' }],
    submitButtonText: 'Ուղարկել պատասխանը', sendingText: 'Ուղարկվում է…', successMessage: 'Ձեր պատասխանը ուղարկված է։ Շնորհակալություն։',
    invalidGuestCountMessage: 'Մասնակցելու դեպքում խնդրում ենք նշել առնվազն մեկ հյուր։', errorMessage: 'Չհաջողվեց ուղարկել պատասխանը։ Խնդրում ենք կրկին փորձել։',
  },
};

weddingConfig.cover.image = elenlyovImage;
weddingConfig.hero.image = elenlyovImage;
weddingConfig.gallery.image = elenlyovImage;
weddingConfig.events[0].image = groomHouseImage;
weddingConfig.events[1].image = homeImage;
weddingConfig.events[2].image = churchImage;
  weddingConfig.events[3].image = zagsImage;
weddingConfig.events[4].image = restorantImage;
weddingConfig.events[2].venue = 'Ադանա ռեստորանային համալիր';
weddingConfig.events[2].address = 'Ադանա ռեստորանային համալիր';
weddingConfig.events[2].mapUrl = 'https://www.google.com/maps/search/?api=1&query=Adana+restaurant+complex+Armenia';
