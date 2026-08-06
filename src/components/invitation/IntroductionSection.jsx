import { getDay, getDaysInMonth } from 'date-fns';
import { motion } from 'framer-motion';

export function IntroductionSection({ config }) {
  const target = new Date(config.wedding.date);
  const firstWeekday = (getDay(new Date(target.getFullYear(), target.getMonth(), 1)) + 6) % 7;
  const days = getDaysInMonth(target);
  const month = new Intl.DateTimeFormat(config.wedding.locale, { month: 'long', timeZone: config.wedding.timezone }).format(target);
  const cells = Array.from({ length: firstWeekday + days }, (_, index) => index < firstWeekday ? '' : index - firstWeekday + 1);
  return <section id="introduction" className="px-0 pb-8 pt-0 sm:px-4"><motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .6 }} className="rounded-[5px] bg-[#20201f] px-7 py-10 text-center text-[#f7f2ec] sm:rounded-[8px]">
    <h2 className="display text-[clamp(1.45rem,5vw,2rem)] font-medium">{config.introduction.heading}</h2>
    <div className="mx-auto mt-4 max-w-[330px] space-y-1 text-[.72rem] font-light leading-5 text-[#ece7df]">{config.introduction.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
    <div className="mt-8"><div className="flex items-center justify-between px-1"><p className="display text-2xl text-[#aaa7a2]">{month}</p><p className="text-xl font-medium text-[#aaa7a2]">{target.getFullYear()}</p></div><div className="mt-4 grid grid-cols-7 gap-y-2 text-[.62rem] text-[#8f8c87]">{['ԵՐԿ','ԵՐՔ','ՉՈՐ','ՀՆԳ','ՈՒՐԲ','ՇԲԹ','ԿԻՐ'].map((day) => <span key={day}>{day}</span>)}{cells.map((day, i) => <span key={`${day}-${i}`} className={day === target.getDate() ? 'relative text-white before:absolute before:left-1/2 before:top-1/2 before:-z-0 before:grid before:h-7 before:w-7 before:-translate-x-1/2 before:-translate-y-1/2 before:place-items-center before:rounded-full before:bg-white/10' : ''}><span className="relative z-10">{day}</span>{day === target.getDate() && <b className="absolute -top-3 left-1/2 z-20 -translate-x-1/2 text-base text-white">♥</b>}</span>)}</div></div>
  </motion.div></section>;
}
