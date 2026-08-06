import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';
export function AnimatedSection({ children, className = '' }) { const reduced = useReducedMotion(); return <motion.section className={className} initial={reduced ? false : { opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .16 }} transition={{ duration: .65, ease: 'easeOut' }}>{children}</motion.section>; }
