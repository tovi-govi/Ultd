import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const initGsap = () => {
  try {
    gsap.registerPlugin(ScrollTrigger);
  } catch (e) {
    /* already registered or unavailable */
  }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

export const heroItem = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] } },
};

export const cardItem = {
  hidden: { opacity: 0, y: 18, scale: 0.995 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

export function arrivalHighlight(target: Element | null) {
  if (!target) return;
  try {
    const tl = gsap.timeline();
    tl.fromTo(
      target,
      { y: 8, opacity: 0.96 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
    );
    tl.fromTo(
      target,
      { boxShadow: '0 0 0 rgba(0,0,0,0)' },
      { boxShadow: '0 14px 40px rgba(2,6,23,0.12)', duration: 0.7, ease: 'power2.out' },
      0
    );
    tl.to(target, { boxShadow: '0 0 0 rgba(0,0,0,0)', duration: 0.7, delay: 0.15 });
  } catch (e) {
    /* noop */
  }
}

export default {
  initGsap,
  staggerContainer,
  heroItem,
  cardItem,
  arrivalHighlight,
};
