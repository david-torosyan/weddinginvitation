import { motion } from 'framer-motion';
import { formatWeddingDate } from '../../utils/dateUtils';

export function HeroSection({ config }) {
  const [day, month, year] = formatWeddingDate(config.wedding.date).split('.');
  return <section className="overflow-hidden px-5 pb-11 pt-9 text-center sm:px-8">
    <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65 }}>
      <p className="latin-display text-[clamp(2.6rem,10vw,4rem)] leading-none">Wedding Day</p>
      <div className="relative mt-5"><div className="aspect-[1.04/1] overflow-hidden rounded-[14px]"><img src={config.hero.image} alt="Wedding portrait" className="mono-image h-full w-full object-cover object-[52%_center]"/></div><p className="absolute right-4 top-2 text-right text-lg font-semibold leading-7 text-white">{day}<br/>{month}<br/>{year.slice(-2)}</p></div>
      <h1 className="display mt-5 text-[clamp(1.6rem,6vw,2.35rem)] font-normal tracking-[-.04em]">{config.couple.combinedName}</h1>
    </motion.div>
  </section>;
}
