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
    date: '2026-10-25T14:00:00+04:00', displayDate: '20 · 10 · 2026', longDate: 'Երեքշաբթի · 20 Հոկտեմբեր · 2026',
    locale: 'hy-AM', timezone: 'Asia/Yerevan', rsvpDeadline: '2026-10-15T23:59:59+04:00',
  },
  cover: {
    note: 'A day to remember',
    buttonText: 'Բացել հրավերը',
    image: elenlyovImage,
    imageAlt: 'Հարսանյաց վայրի նկարազարդում',
  },
  hero: {
    eyebrow: 'ՄԵՐ ՀԱՐՍԱՆԻՔԸ',
    title: 'ԷԼԵՆ & ԼՅՈՎԱ',
    invitationText: 'Սիրով հրավիրում ենք Ձեզ ներկա գտնվելու մեր հարսանյաց արարողությանը։',
    image: elenlyovImage,
    imageAlt: 'Հարսանյաց վայրի նկարազարդում',
  },
  introduction: { kicker: 'Հարգելի՛ հյուրեր', heading: 'Մեր պատմությունը շարունակվում է', emphasis: 'Ձեզ հետ միասին', paragraphs: ['Սիրով հրավիրում ենք Ձեզ կիսելու մեզ հետ մեր կյանքի կարևորագույն օրը։'] },
  itinerary: { kicker: 'Տոնակատարությունը', heading: 'Երեք վայր,', emphasis: 'մեկ գեղեցիկ օր', description: 'Պահպանեք ստորև նշված ժամերը և քարտեզի հղումներով գտեք յուրաքանչյուր վայրի ճանապարհը։' },
  calendar: { kicker: 'Our Day', heading: 'Սիրելի՛ Հյուրեր,', description: 'Սիրով հրավիրում ենք Ձեզ ներկա գտնվելու մեր հարսանյաց արարողությանը։ Ծանոթացեք օրվա ծրագրին և հաստատեք Ձեր ներկայությունը։', weekdays: ['Երկ', 'Երք', 'Չոր', 'Հնգ', 'Ուրբ', 'Շաբ', 'Կիր'] },
  gallery: {
    image: elenlyovImage,
    imageAlt: 'Էլենի և Լյովայի լուսանկարը',
  },
  location: { kicker: 'Վայրը', heading: 'Location', emphasis: 'for you', description: 'Մեզ համար կարևոր յուրաքանչյուր պահը կանցկացնենք գեղեցիկ և սիրելի վայրերում։', mapButtonText: 'Քարտեզ' },
  timing: { kicker: 'Օրվա ծրագիր', heading: 'Timing', emphasis: 'special' },
  events: [
    {
      id: 'groom-house',
      number: '01',
      title: 'Աղաբաբյան հյուրանոց',
      timelineTitle: 'Աղաբաբյան հյուրանոց',
      addressTitle: 'Աղաբաբյան հյուրանոց',
      time: '11:00',
      venue: 'Աղաբաբյան հյուրանոց',
      address: 'Հասցեն կավելացվի ավելի ուշ',
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=Aghababyan+Hotel',
      image: groomHouseImage,
      imageAlt: 'Փեսայի տան նկարազարդում',
      enabled: true,
    },
    {
      id: 'bride-house',
      number: '02',
      title: 'Հարսի տուն',
      timelineTitle: 'Հարսի տուն',
      addressTitle: 'Հարսի տուն',
      time: '12:00',
      venue: 'Հավաքվում ենք միասին',
      address: 'Հասցեն կավելացվի ավելի ուշ',
      mapUrl: 'https://maps.app.goo.gl/gG79oo6hbpifjj3x9',
      image: homeImage,
      imageAlt: 'Հարսի տան նկարազարդում',
      enabled: true,
    },
    {
      id: 'church',
      number: '03',
      title: 'Հովհանավանք',
      timelineTitle: 'Պսակադրություն',
      addressTitle: 'Հովհաննավանք',
      time: '15:00',
      venue: 'Հովհանավանք',
      address: 'Արագածոտնի մարզ, Հայաստան',
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=Hovhannavank+Monastery+Aragatsotn+Armenia',
      image: churchImage,
      imageAlt: 'Սուրբ Հռիփսիմե եկեղեցու նկարազարդում',
      enabled: true,
    },
    {
      id: 'zags',
      number: '04',
      title: 'Ամուսնության գրանցում',
      timelineTitle: 'Ամուսնության գրանցում',
      addressTitle: 'Ադանա ռեստորանային համալիրի բակ',
      time: '16:00',
      venue: 'Ադանա ռեստորանային համալիր',
      address: 'Արագածոտնի մարզ, Հայաստան',
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=Hovhannavank+Monastery+Aragatsotn+Armenia',
      image: zagsImage,
      imageAlt: 'Ադանա Ռեստորանային համալիրի նկարազարդում',
      enabled: true,
    },
    {
      id: 'reception',
      number: '05',
      title: 'Հարսանյաց հանդիսություն',
      timelineTitle: 'Հարսանյաց հանդիսություն',
      addressTitle: 'Ադանա ռեստորանային համալիր',
      time: '17:00',
      venue: 'Ադանա ռեստորանային համալիր',
      address: 'Ադանա ռեստորանային համալիր',
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=Adana+restaurant+complex+Armenia',
      image: restorantImage,
      imageAlt: 'Ռեստորանի նկարազարդում',
      enabled: true,
    },
  ],
  countdown: { heading: 'Մնացել է․․․', labels: { days: 'ՕՐ', hours: 'ԺԱՄ', minutes: 'ՐՈՊԵ', seconds: 'ՎՐԿ' } },
  notes: {
    kicker: 'Օրվա մասին', items: [
      { icon: 'calendar', title: 'Ինչ է սպասվում', text: 'Ջերմ ընդունելություն, եկեղեցական օրհնություն, ընտանեկան լուսանկարներ, ընթրիք, երաժշտություն և պարեր։' },
      { icon: 'heart', title: 'Սիրով', text: 'Ձեր ներկայությունը մեզ համար ամենամեծ նվերն է։ Եկեք և միասին նշենք մեր նոր սկիզբը։' },
    ]
  },
  rsvp: {
    enabled: true, kicker: 'RSVP', heading: 'Խնդրում ենք հաստատել Ձեր ներկայությունը', description: '',
    namePlaceholder: 'Ձեր անունը', guestCountPlaceholder: 'Հյուրերի քանակը', attendancePlaceholder: 'Կմասնակցե՞ք', invitedByPlaceholder: 'Ում կողմից եք հրավիրված',
    invitedByOptions: [{ value: 'bride', label: 'Հարսի կողմից' }, { value: 'groom', label: 'Փեսայի կողմից' }],
    attendanceOptions: [{ value: 'yes', label: 'Այո, սիրով կմասնակցեմ' }, { value: 'no', label: 'Ցավոք, չեմ կարողանա մասնակցել' }],
    submitButtonText: 'Ուղարկել պատասխանը', sendingText: 'Ուղարկվում է…', successMessage: 'Ձեր պատասխանը ուղարկված է։ Շնորհակալություն։',
    invalidGuestCountMessage: 'Մասնակցելու դեպքում խնդրում ենք նշել առնվազն մեկ հյուր։', errorMessage: 'Չհաջողվեց ուղարկել պատասխանը։ Խնդրում ենք կրկին փորձել։',
  },
};
