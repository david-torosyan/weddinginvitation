// Edit this file to update the invitation content without changing the page layout.
export const weddingConfig = {
  couple: {
    partnerOne: 'Էլեն',
    partnerTwo: 'Լյովա',
    combinedName: 'ԷԼԵՆ & ԼՅՈՎԱ',
    initials: { partnerOne: 'Է', partnerTwo: 'Լ' },
  },

  wedding: {
    date: '2026-10-25T14:00:00+04:00',
    displayDate: '25 · 10 · 2026',
    longDate: 'Կիրակի · 25 Հոկտեմբեր · 2026',
    locale: 'hy-AM',
    timezone: 'Asia/Yerevan',
    rsvpDeadline: '2026-10-15T23:59:59+04:00',
  },

  cover: {
    note: 'A day to remember',
    buttonText: 'Բացել հրավերը',
    image: '/images/events/elenlyov.png',
    imageAlt: 'Հարսանյաց վայրի նկարազարդում',
  },

  hero: {
    eyebrow: 'ՄԵՐ ՀԱՐՍԱՆԻՔԸ',
    title: 'ԷԼԵՆ & ԼՅՈՎԱ',
    invitationText: 'Սիրով հրավիրում ենք Ձեզ ներկա գտնվելու մեր հարսանյաց արարողությանը։',
    image: '/images/events/elenlyov.png',
    imageAlt: 'Հարսանյաց վայրի նկարազարդում',
  },

  introduction: {
    kicker: 'Հարգելի՛ հյուրեր',
    heading: 'Մեր պատմությունը շարունակվում է',
    emphasis: 'Ձեզ հետ միասին',
    paragraphs: [
      'Սիրով հրավիրում ենք Ձեզ կիսելու մեզ հետ մեր կյանքի կարևորագույն օրը։',
    ],
  },

  itinerary: {
    kicker: 'Տոնակատարությունը',
    heading: 'Երեք վայր,',
    emphasis: 'մեկ գեղեցիկ օր',
    description: 'Պահպանեք ստորև նշված ժամերը և քարտեզի հղումներով գտեք յուրաքանչյուր վայրի ճանապարհը։',
  },

  calendar: {
    kicker: 'Նշեք օրը',
    heading: 'Հարգելի՛ հյուրեր',
    description: 'Սիրով հրավիրում ենք Ձեզ ներկա գտնվելու մեր հարսանյաց արարողությանը։ Ծանոթացեք օրվա ծրագրին և հաստատեք Ձեր ներկայությունը։',
    weekdays: ['Երկ', 'Երք', 'Չոր', 'Հնգ', 'Ուրբ', 'Շաբ', 'Կիր'],
  },

  events: [
    {
      id: 'bride-house', number: '01', title: 'Հարսի տուն', time: '12:00',
      venue: 'Հավաքվում ենք միասին', address: 'Հասցեն կավելացվի ավելի ուշ',
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=Bride%27s+home+Armenia',
      image: '/images/events/bride-home.png', imageAlt: 'Հարսի տան նկարազարդում', enabled: true,
    },
    {
      id: 'church', number: '02', title: 'Պսակադրության արարողություն', time: '15:00',
      venue: 'Սուրբ Հռիփսիմե եկեղեցի', address: 'Վաղարշապատ, Արմավիրի մարզ',
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=Saint+Hripsime+Church+Vagharshapat',
      image: '/images/events/church.png', imageAlt: 'Սուրբ Հռիփսիմե եկեղեցու նկարազարդում', enabled: true,
    },
    {
      id: 'reception', number: '03', title: 'Տոնական խնջույք', time: '17:00',
      venue: 'Արարատ Հոլ', address: 'Հասցեն կավելացվի ավելի ուշ',
      mapUrl: 'https://www.google.com/maps/search/?api=1&query=Ararat+Hall+Armenia',
      image: '/images/events/restaurant.png', imageAlt: 'Ռեստորանի նկարազարդում', enabled: true,
    },
  ],

  countdown: {
    heading: 'Մնացել է․․․',
    labels: { days: 'ՕՐ', hours: 'ԺԱՄ', minutes: 'ՐՈՊԵ', seconds: 'ՎՐԿ' },
  },

  notes: {
    kicker: 'Օրվա մասին',
    items: [
      { icon: 'calendar', title: 'Ինչ է սպասվում', text: 'Ջերմ ընդունելություն, եկեղեցական օրհնություն, ընտանեկան լուսանկարներ, ընթրիք, երաժշտություն և պարեր։' },
      { icon: 'heart', title: 'Սիրով', text: 'Ձեր ներկայությունը մեզ համար ամենամեծ նվերն է։ Եկեք և միասին նշենք մեր նոր սկիզբը։' },
    ],
  },

  rsvp: {
    enabled: true,
    kicker: 'RSVP',
    heading: 'Կմիանա՞ք մեզ',
    description: 'Խնդրում ենք հաստատել Ձեր ներկայությունը մինչև 15 Հոկտեմբեր, 2026։',
    namePlaceholder: 'Ձեր անունը',
    guestCountPlaceholder: 'Հյուրերի քանակը',
    attendancePlaceholder: 'Կմասնակցե՞ք',
    attendanceOptions: [
      { value: 'yes', label: 'Այո, սիրով կմասնակցեմ' },
      { value: 'no', label: 'Ցավոք, չեմ կարողանա մասնակցել' },
    ],
    submitButtonText: 'Ուղարկել պատասխանը',
    sendingText: 'Ուղարկվում է…',
    successMessage: 'Ձեր պատասխանը ուղարկված է։ Շնորհակալություն։',
    invalidGuestCountMessage: 'Խնդրում ենք նշել հյուրերի քանակը։',
    errorMessage: 'Չհաջողվեց ուղարկել պատասխանը։ Խնդրում ենք կրկին փորձել։',
  },
};
