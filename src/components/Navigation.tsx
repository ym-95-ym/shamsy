import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Heart } from "lucide-react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import flagSyria from "@/assets/flag-syria-clean.jpeg";
import flagGermany from "@/assets/flag-germany.jpeg";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const getCurrentLanguage = () => {
    const path = location.pathname;
    if (path.startsWith('/en')) return 'en';
    if (path.startsWith('/ar')) return 'ar';
    return 'de';
  };

  const getLocalizedNavItems = () => {
    const currentLang = getCurrentLanguage();
    const basePath = currentLang === 'de' ? '' : `/${currentLang}`;

    switch (currentLang) {
      case 'en':
        return [
          { href: `${basePath}` || '/', label: "Home" },
          { href: `${basePath}/history`, label: "History" },
          { href: `${basePath}/projects`, label: "Projects" },
          { href: `${basePath}/past-projects`, label: "Past Projects" },
          { href: `${basePath}/get-involved`, label: "Get Involved" },
          { href: `${basePath}/contact`, label: "Contact & Newsletter" }
        ];
      case 'ar':
        return [
          { href: `${basePath}` || '/', label: "الرئيسية" },
          { href: `${basePath}/history`, label: "قصتنا" },
          { href: `${basePath}/projects`, label: "المشاريع" },
          { href: `${basePath}/past-projects`, label: "المشاريع السابقة" },
          { href: `${basePath}/get-involved`, label: "شارك معنا" },
          { href: `${basePath}/contact`, label: "التواصل و المجلة السنوية" }
        ];
      default:
        return [
          { href: "/", label: "Home" },
          { href: "/geschichte", label: "Geschichte" },
          { href: "/projekte", label: "Aktuelle Projekte" },
          { href: "/vergangene-projekte", label: "Alte Projekte" },
          { href: "/mitmachen", label: "Mitmachen" },
          { href: "/kontakt", label: "Kontakt" }
        ];
    }
  };

  const getDonateLink = () => {
    const currentLang = getCurrentLanguage();
    return currentLang === 'de' ? '/spenden' : `/${currentLang}/donate`;
  };

  const getDonateLabel = () => {
    const currentLang = getCurrentLanguage();
    switch (currentLang) {
      case 'en': return 'Donate Now';
      case 'ar': return 'تبرع الآن';
      default: return 'Jetzt Spenden';
    }
  };

  const navLinks = getLocalizedNavItems();
  const isRTL = getCurrentLanguage() === 'ar';

  return (
    <>
      <nav className={`fixed w-full top-0 z-50 shamsy-transition ${
        isScrolled 
          ? 'bg-white/98 backdrop-blur-md shadow-lg' 
          : 'bg-white/95 backdrop-blur-md'
      } border-b border-shamsy-primary/10`} dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            {/* Logo with Flags */}
            <Link 
              to={getCurrentLanguage() === 'de' ? '/' : `/${getCurrentLanguage()}`}
              className="flex items-center gap-3 text-2xl font-bold text-shamsy-primary hover:text-shamsy-light shamsy-transition tracking-tight"
            >
              ShamSy
          {/*    <div className="flex items-center gap-2">
                <img src={flagSyria} alt="Syrian Flag" className="w-8 h-6 object-cover rounded-sm shadow-sm" />
                <img src={flagGermany} alt="German Flag" className="w-8 h-6 object-cover rounded-sm shadow-sm" />
              </div> */}
            </Link>

            {/* Desktop Navigation with Language Switcher and Donate Button */}
            <div className="hidden md:flex items-center space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`font-medium shamsy-transition hover:text-shamsy-primary ${
                    location.pathname === link.href
                      ? 'text-shamsy-primary'
                      : 'text-foreground/80'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <LanguageSwitcher />
              <Button 
                asChild 
                className="bg-shamsy-primary hover:bg-shamsy-dark shamsy-transition shamsy-shadow-green"
              >
                <Link to={getDonateLink()} className="flex items-center gap-2">
                  <Heart className="w-4 h-4" />
                  {getDonateLabel()}
                </Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`md:hidden p-3 border-2 border-shamsy-primary rounded-lg shamsy-transition ${
                isMenuOpen 
                  ? 'bg-shamsy-primary/20 border-shamsy-dark' 
                  : 'bg-shamsy-primary/10 hover:bg-shamsy-primary/20'
              }`}
              aria-label="Toggle navigation"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5 text-shamsy-primary" />
              ) : (
                <Menu className="w-5 h-5 text-shamsy-primary" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        <div className={`md:hidden shamsy-transition overflow-hidden ${
          isMenuOpen 
            ? 'max-h-screen opacity-100' 
            : 'max-h-0 opacity-0'
        }`}>
          <div className="bg-white border-t border-shamsy-primary/10 shadow-lg">
            <div className="container mx-auto px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`block py-3 px-4 rounded-xl font-medium shamsy-transition ${
                    location.pathname === link.href
                      ? 'text-shamsy-primary bg-shamsy-primary/10'
                      : 'text-foreground hover:text-shamsy-primary hover:bg-shamsy-primary/5'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              
              {/* Language Switcher for mobile */}
              <div className="pt-4 border-t border-shamsy-primary/10">
                <LanguageSwitcher />
              </div>
              
              <div className="pt-4 border-t border-shamsy-primary/10">
                <Button 
                  asChild 
                  className="w-full bg-shamsy-primary hover:bg-shamsy-dark shamsy-transition"
                  size="lg"
                >
                  <Link to={getDonateLink()} className="flex items-center justify-center gap-2">
                    <Heart className="w-4 h-4" />
                    {getDonateLabel()}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Backdrop */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 md:hidden shamsy-transition"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Navigation;
