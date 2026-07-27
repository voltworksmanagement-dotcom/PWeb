/**
 * Shared motion vocabulary.
 *
 * Every scroll reveal across the site draws from these so timing, distance and
 * easing stay consistent page to page. Prefer adding a variant here over
 * hand-tuning `initial`/`animate` at the call site.
 */

/** easeOutExpo-ish — quick off the line, settles gently. */
export const EASE = [0.22, 1, 0.36, 1] as const;

/** Standard viewport trigger: fire once, slightly before the element is centred. */
export const VIEWPORT = { once: true, margin: '-100px' } as const;

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6, ease: EASE } },
};

/** Parent wrapper — children using the variants above will cascade. */
export const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

/** Slightly slower cascade, for grids of 3+ cards. */
export const staggerSlow = {
  hidden: {},
  show: { transition: { staggerChildren: 0.16, delayChildren: 0.1 } },
};

export const slideFrom = (dir: 'left' | 'right') => ({
  hidden: { opacity: 0, x: dir === 'left' ? -48 : 48 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: EASE } },
});
