import { ArrowRight, Instagram, Mail, MessageCircle, Phone } from "lucide-react";

import { cn } from "@/lib/utils";

interface FooterTapedDesignProps {
  logoSrc: string;
  className?: string;
}

function Tape({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 95 80"
      fill="none"
      className={cn("h-16 w-20 text-black", className)}
    >
      <path d="M1 45 70.3 5 88.3 36.2 19 76.2 1 45Z" fill="currentColor" />
      <path
        d="M9.5 44.5c11.1-6.9 22.4-13.6 33.8-20.2C54 18.1 64.5 12 75 6.2l8.8 15.2c-10.5 5.7-21 11.8-31.7 18.1-11.3 6.6-22.6 13.4-33.6 20.2L9.5 44.5Z"
        fill="white"
        opacity="0.08"
      />
      <path
        d="M17.5 41.5c8.7-5.1 17.5-10.3 26.3-15.3 8-4.6 16.1-9.1 24.2-13.5"
        stroke="white"
        strokeOpacity="0.13"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function FooterTapedDesign({ logoSrc, className }: FooterTapedDesignProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={cn("footer-taped", className)}>
      <div className="footer-taped-card">
        <Tape className="footer-tape footer-tape-left" />
        <Tape className="footer-tape footer-tape-right" />

        <div className="footer-taped-main">
          <div className="footer-taped-brand">
            <a href="#top" className="footer-taped-logo">
              <img src={logoSrc} alt="Udvitha Technologies" />
              <span>Udvitha Technologies</span>
            </a>
            <p>
              Practical IT training, placement support, and industry-ready projects for learners
              moving into modern tech roles.
            </p>
            <a href="#contact" className="footer-taped-action">
              Book counselling <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="footer-taped-links">
            <div>
              <h3>Programs</h3>
              <ul>
                <li>
                  <a href="#programs">IAM and Cyber Security</a>
                </li>
                <li>
                  <a href="#programs">Cloud and DevOps</a>
                </li>
                <li>
                  <a href="#programs">Full Stack and AI</a>
                </li>
                <li>
                  <a href="#programs">Data and Enterprise Platforms</a>
                </li>
              </ul>
            </div>

            <div>
              <h3>Reach us</h3>
              <ul>
                <li>Hyderabad, India</li>
                <li>
                  <a href="tel:9100052143">
                    <Phone className="h-3.5 w-3.5" />
                    +91 91000 52143
                  </a>
                </li>
                <li>
                  <a href="mailto:info@udvitechnologies.com">
                    <Mail className="h-3.5 w-3.5" />
                    info@udvitechnologies.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-taped-bottom">
        <div>
          <p>Copyright {currentYear} Udvitha Technologies. All rights reserved.</p>
        </div>
        <div className="footer-taped-social">
          <a
            href="https://www.instagram.com/udvithatechnologies?utm_source=qr"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Udvitha Technologies on Instagram"
          >
            <Instagram className="h-5 w-5" />
          </a>
          <a
            href="https://wa.me/919100052143"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with Udvitha Technologies on WhatsApp"
          >
            <MessageCircle className="h-5 w-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
