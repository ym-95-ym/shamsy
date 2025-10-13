import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const LanguageSwitcher = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getCurrentLanguage = () => {
    const path = location.pathname;
    if (path.startsWith('/en')) return 'en';
    if (path.startsWith('/ar')) return 'ar';
    return 'de';
  };

  const getEquivalentPath = (targetLanguage: string) => {
    const path = location.pathname;
    
    // Handle home pages
    if (path === '/' || path === '/en' || path === '/en/' || path === '/ar' || path === '/ar/') {
      return targetLanguage === 'de' ? '/' : `/${targetLanguage}`;
    }
    
    // Page mapping between languages
    const pageMap: Record<string, Record<string, string>> = {
      'geschichte': { en: 'history', ar: 'history' },
      'history': { de: 'geschichte', ar: 'history' },
      'projekte': { en: 'projects', ar: 'projects' },
      'projects': { de: 'projekte', ar: 'projects' },
      'vergangene-projekte': { en: 'past-projects', ar: 'past-projects' },
      'past-projects': { de: 'vergangene-projekte', ar: 'past-projects' },
      'mitmachen': { en: 'get-involved', ar: 'get-involved' },
      'get-involved': { de: 'mitmachen', ar: 'get-involved' },
      'spenden': { en: 'donate', ar: 'donate' },
      'donate': { de: 'spenden', ar: 'donate' },
      'kontakt': { en: 'contact', ar: 'contact' },
      'contact': { de: 'kontakt', ar: 'contact' }
    };
    
    // Extract current page name
    let currentPage = '';
    if (path.startsWith('/en/')) {
      currentPage = path.substring(4);
    } else if (path.startsWith('/ar/')) {
      currentPage = path.substring(4);
    } else if (path.startsWith('/')) {
      currentPage = path.substring(1);
    }
    
    // Get target page name
    const targetPage = pageMap[currentPage]?.[targetLanguage] || currentPage;
    
    // Construct target path
    if (targetLanguage === 'de') {
      return `/${targetPage}`;
    } else {
      return `/${targetLanguage}/${targetPage}`;
    }
  };

  const switchLanguage = (language: string) => {
    const targetPath = getEquivalentPath(language);
    navigate(targetPath);
  };

  const currentLang = getCurrentLanguage();

  const languages = {
    de: { name: 'Deutsch', flag: '🇩🇪' },
    en: { name: 'English', flag: '🇬🇧' },
    ar: { name: 'العربية', flag: '🇸🇾' }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <Globe className="h-4 w-4" />
          <span className="hidden md:inline">
            {languages[currentLang as keyof typeof languages].flag} {languages[currentLang as keyof typeof languages].name}
          </span>
          <span className="md:hidden">
            {languages[currentLang as keyof typeof languages].flag}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {Object.entries(languages).map(([code, lang]) => (
          <DropdownMenuItem
            key={code}
            onClick={() => switchLanguage(code)}
            className={`cursor-pointer ${currentLang === code ? 'bg-accent' : ''}`}
          >
            <span className="mr-2">{lang.flag}</span>
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
