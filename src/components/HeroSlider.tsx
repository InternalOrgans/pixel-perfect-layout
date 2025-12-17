import { useState, useEffect, useCallback } from 'react';
import { ArrowRight, Menu, X, Phone, Instagram, Globe, Mail } from 'lucide-react';
import hero1 from '@/assets/hero-1.jpg';
import hero2 from '@/assets/hero-2.jpg';
import hero3 from '@/assets/hero-3.jpg';
import hero4 from '@/assets/hero-4.jpg';

interface Slide {
  image: string;
  titleLine1: string;
  titleLine2: string;
}

const slides: Slide[] = [
  {
    image: hero1,
    titleLine1: "From my journey to yours",
    titleLine2: "Nutrition by Saoirse.",
  },
  {
    image: hero2,
    titleLine1: "Beyond the Scale",
    titleLine2: "Sustainable Weight Loss.",
  },
  {
    image: hero3,
    titleLine1: "Fueling Your Body Right",
    titleLine2: "Strength & Vitality.",
  },
  {
    image: hero4,
    titleLine1: "Feel Your Best Everyday",
    titleLine2: "Health & Lifestyle Guide.",
  },
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const goToSlide = useCallback((index: number) => {
    if (isTransitioning || index === currentSlide) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 1200);
  }, [currentSlide, isTransitioning]);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextSlide = (currentSlide + 1) % slides.length;
      goToSlide(nextSlide);
    }, 6000);
    return () => clearInterval(interval);
  }, [currentSlide, goToSlide]);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-background">
      {/* Background Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-[1200ms] ease-out ${
            index === currentSlide 
              ? 'opacity-100 scale-100' 
              : 'opacity-0 scale-105'
          }`}
        >
          <img
            src={slide.image}
            alt={slide.titleLine1}
            className={`h-full w-full object-cover ${
              index === currentSlide ? 'animate-ken-burns' : ''
            }`}
          />
          <div className="hero-overlay absolute inset-0" />
        </div>
      ))}

      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6 md:px-12 md:py-8">
        <div className="font-script text-2xl md:text-3xl text-foreground text-shadow tracking-wide">
          nutrition
          <span className="block text-xs font-serif font-light tracking-[0.3em] opacity-70">
            by saoirse
          </span>
        </div>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="relative z-50 p-2 text-foreground transition-transform hover:scale-110"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-background/95 backdrop-blur-md transition-all duration-500 ${
          menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <nav className="flex h-full flex-col items-center justify-center gap-8">
          {['Home', 'About Me', 'Services', 'Programs', 'Contact'].map((item, i) => (
            <a
              key={item}
              href="#"
              className={`font-serif text-3xl md:text-5xl text-foreground transition-all duration-300 hover:opacity-60 ${
                menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
              style={{ transitionDelay: `${i * 100 + 200}ms` }}
            >
              {item}
            </a>
          ))}
        </nav>
      </div>

      {/* Social Icons - Right Side */}
      <div className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-5">
        {[
          { icon: Phone, label: 'WhatsApp' },
          { icon: Instagram, label: 'Instagram' },
          { icon: Globe, label: 'Website' },
          { icon: Mail, label: 'Email' },
        ].map(({ icon: Icon, label }) => (
          <a
            key={label}
            href="#"
            className="text-foreground/80 transition-all duration-300 hover:text-foreground hover:scale-110"
            aria-label={label}
          >
            <Icon size={20} />
          </a>
        ))}
      </div>

      {/* Main Content */}
      <div className="absolute inset-0 z-20 flex items-center justify-center px-6">
        <div className="text-center">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ${
                index === currentSlide
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="flex items-center justify-center gap-4 mb-4">
                <span 
                  className={`inline-block h-[1px] bg-foreground/60 transition-all duration-700 delay-300 ${
                    index === currentSlide ? 'w-12 md:w-16' : 'w-0'
                  }`}
                />
              </div>
              <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl text-foreground text-shadow leading-tight">
                {slide.titleLine1}
              </h1>
              <p className="mt-2 text-foreground/80 text-lg md:text-xl">—</p>
              <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-foreground text-shadow leading-tight mt-2">
                {slide.titleLine2}
              </h2>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="absolute bottom-8 md:bottom-12 left-0 right-0 z-30 flex items-center justify-between px-6 md:px-12">
        <a
          href="#"
          className="group flex items-center gap-3 text-foreground/90 transition-all hover:text-foreground"
        >
          <span className="font-serif text-sm md:text-base tracking-wide link-underline">
            my journey
          </span>
          <ArrowRight 
            size={18} 
            className="transition-transform group-hover:translate-x-1" 
          />
        </a>

        {/* Slide Indicators */}
        <div className="absolute left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                index === currentSlide
                  ? 'w-8 bg-foreground'
                  : 'w-1.5 bg-foreground/40 hover:bg-foreground/60'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <a
          href="#"
          className="group flex items-center gap-3 text-foreground/90 transition-all hover:text-foreground"
        >
          <span className="font-serif text-sm md:text-base tracking-wide link-underline">
            join the team
          </span>
          <ArrowRight 
            size={18} 
            className="transition-transform group-hover:translate-x-1" 
          />
        </a>
      </div>
    </div>
  );
};

export default HeroSlider;
