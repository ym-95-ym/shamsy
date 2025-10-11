import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-white">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold text-shamsy-light mb-3">ShamSy</h3>
            <p className="text-gray-300 mb-4 leading-relaxed">
              Die Sonne Syriens - Wiederaufbau in eigener Hand
            </p>
            <p className="text-gray-400 text-sm">
              Gemeinnütziger Verein für den nachhaltigen Wiederaufbau Syriens durch Bildung, Energie und Gesundheitsprojekte.
            </p>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-lg font-semibold text-shamsy-light mb-4">Kontakt</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-shamsy-light mt-0.5 flex-shrink-0" />
                <a 
                  href="mailto:info.shamsyr@gmail.com"
                  className="text-gray-300 hover:text-shamsy-light shamsy-transition"
                >
                  info.shamsyr@gmail.com
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-shamsy-light mt-0.5 flex-shrink-0" />
                <a 
                  href="tel:+4991143332926"
                  className="text-gray-300 hover:text-shamsy-light shamsy-transition"
                >
                  +49 911 43332926
                </a>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-shamsy-light mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">
                  ShamSy e.V.<br />
                  Nürnberg, 90425
                </span>
              </div>
            </div>
          </div>

          {/* Transparency Links */}
          <div>
            <h4 className="text-lg font-semibold text-shamsy-light mb-4">Transparenz</h4>
            <div className="space-y-2">
              <a 
                href="/data-input/satzung.pdf" 
                className="block text-gray-300 hover:text-shamsy-light shamsy-transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                Satzung & Policies
              </a>
              <a 
                href="/data-input/projektberichte.pdf" 
                className="block text-gray-300 hover:text-shamsy-light shamsy-transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                Projektberichte
              </a>
              <a 
                href="/data-input/finanzberichte.pdf" 
                className="block text-gray-300 hover:text-shamsy-light shamsy-transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                Finanzberichte
              </a>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-lg font-semibold text-shamsy-light mb-4">Folgen Sie uns</h4>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="p-2 bg-shamsy-primary/20 rounded-lg hover:bg-shamsy-primary/30 shamsy-transition"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5 text-shamsy-light" />
              </a>
              <a 
                href="#" 
                className="p-2 bg-shamsy-primary/20 rounded-lg hover:bg-shamsy-primary/30 shamsy-transition"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-shamsy-light" />
              </a>
              <a 
                href="#" 
                className="p-2 bg-shamsy-primary/20 rounded-lg hover:bg-shamsy-primary/30 shamsy-transition"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5 text-shamsy-light" />
              </a>
            </div>
            
            {/* Quick Links */}
            <div className="mt-6 space-y-2">
              <Link 
                to="/spenden" 
                className="block text-shamsy-light hover:text-white font-medium shamsy-transition"
              >
                → Jetzt Spenden
              </Link>
              <Link 
                to="/mitmachen" 
                className="block text-gray-300 hover:text-shamsy-light shamsy-transition"
              >
                → Mitglied werden
              </Link>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-600 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            &copy; 2025 Shams Syria e.V. - Alle Rechte vorbehalten | 
            <span className="mx-2">•</span>
            Ein Projekt für den Wiederaufbau Syriens
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
