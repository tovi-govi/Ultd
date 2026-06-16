import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const initGsap = () => {
  try {
    gsap.registerPlugin(ScrollTrigger);
  } catch (e) {
    /* already registered or unavailable */
  }
};

export function arrivalHighlight(target: Element | null) {
  if (!target) return;
  try {
    const tl = gsap.timeline();
    tl.fromTo(
      target,
      { y: 8, opacity: 0.96 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
    );
    tl.fromTo(
      target,
      { boxShadow: "0 0 0 rgba(0,0,0,0)" },
      { boxShadow: "0 14px 40px rgba(2,6,23,0.12)", duration: 0.7, ease: "power2.out" },
      0,
    );
    tl.to(target, { boxShadow: "0 0 0 rgba(0,0,0,0)", duration: 0.7, delay: 0.15 });
  } catch (e) {
    /* noop */
  }
}
