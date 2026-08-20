import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export const motionTokens = {
  duration: {
    quick: 0.28,
    standard: 0.64,
    slow: 0.88,
  },
  ease: [0.22, 1, 0.36, 1],
  viewport: {
    once: true,
    amount: 0.08,
    margin: '0px 0px 12% 0px',
  },
  eventViewport: {
    once: true,
    amount: 0.06,
    margin: '0px 0px -12% 0px',
  },
};

export const motionVariants = {
  section: {
    hidden: { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: motionTokens.duration.slow,
        ease: motionTokens.ease,
      },
    },
  },
  group: {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1, delayChildren: 0.06 },
    },
  },
  fastGroup: {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.065, delayChildren: 0.04 },
    },
  },
  timelineCard: {
    hidden: { opacity: 0, y: 26, scale: 0.992 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: motionTokens.duration.slow,
        ease: motionTokens.ease,
        staggerChildren: 0.07,
        delayChildren: 0.04,
      },
    },
  },
  heading: {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: motionTokens.duration.slow,
        ease: motionTokens.ease,
        delay: 0.02,
      },
    },
  },
  eyebrow: {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: motionTokens.duration.standard,
        ease: motionTokens.ease,
        delay: 0.13,
      },
    },
  },
  supporting: {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: motionTokens.duration.standard,
        ease: motionTokens.ease,
        delay: 0.2,
      },
    },
  },
  item: {
    hidden: { opacity: 0, y: 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: motionTokens.duration.standard,
        ease: motionTokens.ease,
      },
    },
  },
  image: {
    hidden: { opacity: 0, y: 18, scale: 1.035 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.96,
        ease: motionTokens.ease,
      },
    },
  },
  memoryDetail: {
    hidden: { opacity: 0, y: 20, scale: 1.03, scaleX: 1.1 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1.03,
      scaleX: 1.1,
      transition: {
        duration: 0.94,
        ease: motionTokens.ease,
        delay: 0.16,
      },
    },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.94 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: motionTokens.duration.standard,
        ease: motionTokens.ease,
      },
    },
  },
};

function motionElement(tag) {
  return motion[tag] || motion.div;
}

export function AnimatedSection({
  children,
  className = '',
  variants = motionVariants.section,
  viewport = motionTokens.viewport,
  ...props
}) {
  const reduced = useReducedMotion();

  return (
    <motion.section
      className={className}
      initial={reduced ? false : 'hidden'}
      whileInView="visible"
      viewport={viewport}
      variants={variants}
      {...props}
    >
      {children}
    </motion.section>
  );
}

export function MotionPage({ children, ...props }) {
  const reduced = useReducedMotion();

  return (
    <motion.main
      initial={reduced ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.72, ease: motionTokens.ease }}
      {...props}
    >
      {children}
    </motion.main>
  );
}

export function MotionGroup({
  as = 'div',
  children,
  variants = motionVariants.group,
  ...props
}) {
  const Component = motionElement(as);
  return <Component variants={variants} {...props}>{children}</Component>;
}

export function MotionItem({
  as = 'div',
  children,
  variants = motionVariants.item,
  ...props
}) {
  const Component = motionElement(as);
  return <Component variants={variants} {...props}>{children}</Component>;
}

export function ScrollRevealItem({
  as = 'div',
  children,
  variants = motionVariants.item,
  viewport = motionTokens.eventViewport,
  ...props
}) {
  const reduced = useReducedMotion();
  const Component = motionElement(as);

  return (
    <Component
      initial={reduced ? false : 'hidden'}
      animate={reduced ? 'visible' : 'hidden'}
      whileInView="visible"
      viewport={viewport}
      variants={variants}
      {...props}
    >
      {children}
    </Component>
  );
}

export function MotionInteractive({ as = 'button', children, ...props }) {
  const reduced = useReducedMotion();
  const Component = motionElement(as);

  return (
    <Component
      whileHover={reduced ? undefined : { y: -2, scale: 1.012 }}
      whileTap={reduced ? undefined : { y: 0, scale: 0.975 }}
      transition={{ duration: motionTokens.duration.quick, ease: motionTokens.ease }}
      {...props}
    >
      {children}
    </Component>
  );
}

export function AmbientGlow() {
  const reduced = useReducedMotion();

  return (
    <motion.div
      aria-hidden="true"
      className="ambient-glow"
      animate={reduced ? undefined : {
        x: [0, 26, -10, 0],
        y: [0, 38, 16, 0],
        scale: [1, 1.06, 0.98, 1],
      }}
      transition={{ duration: 20, ease: 'easeInOut', repeat: Infinity }}
    />
  );
}
