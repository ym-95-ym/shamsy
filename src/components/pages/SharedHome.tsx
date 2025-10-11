import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Heart, AlertTriangle } from "lucide-react";
import { useHomeContent } from "@/hooks/useContent";
import { useEffect, useState } from "react";
import { loadWarFacts, groupFactsByYear, type YearGroup } from "@/lib/factsManager";
import SEOHead from "@/components/SEOHead";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Helper function to render text with markdown-style bold formatting
function renderText(text: string) {
  return text
    .split('**')
    .map((part, index) => 
      index % 2 === 0 ? part : <strong key={index}>{part}</strong>
    );
}

const SharedHome = () => {
  const content = useHomeContent();
  const [yearGroups, setYearGroups] = useState<YearGroup[]>([]);

  useEffect(() => {
    loadWarFacts().then(facts => {
      const grouped = groupFactsByYear(facts);
      setYearGroups(grouped);
    });
  }, []);

  if (!content) {
    return <div>Loading...</div>;
  }

  const { hero, quote, overview, language } = content;
  const isRTL = language === 'ar';

  const factsTitle = language === 'de' 
    ? 'Syrien: 14 Jahre Krieg und Zerstörung' 
    : language === 'en' 
    ? 'Syria: 14 Years of War and Destruction'
    : 'سوريا: 14 عامًا من الحرب والدمار';

  const factsSubtitle = language === 'de'
    ? 'Dokumentierte Kriegsverbrechen und humanitäre Katastrophen'
    : language === 'en'
    ? 'Documented war crimes and humanitarian catastrophes'
    : 'جرائم حرب موثقة وكوارث إنسانية';

  return (
    <div className="min-h-screen" dir={isRTL ? 'rtl' : 'ltr'}>
      <SEOHead 
        title="ShamSy e.V. - Wiederaufbau Syriens durch nachhaltige Projekte"
        description={`${hero.description1} ${hero.description2}`.replace(/<[^>]*>/g, '').replace(/\*\*/g, '')}
        keywords="ShamSy, Syrien, Wiederaufbau, Hilfsorganisation, Spenden, nachhaltige Projekte"
        ogImage="/images/hero-destruction.jpg"
      />
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center text-center text-white pt-20">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="/images/hero-destruction.jpg"
            alt="Hero background - ShamSy Archive"
            className="w-full h-full object-cover"
          />
          <div className={`absolute bottom-2 ${isRTL ? 'left-2' : 'right-2'} bg-black/60 text-white text-xs px-2 py-1 rounded`}>
            {language === 'de' ? 'Quelle: ShamSy Archive' : 
             language === 'en' ? 'Source: ShamSy Archive' : 
             'المصدر: أرشيف شمس سوريا'}
          </div>
        </div>
        
        {/* Green Overlay */}
        <div className="absolute inset-0 shamsy-hero-gradient" />
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-light mb-6 md:mb-8 text-white drop-shadow-lg tracking-tight leading-tight break-words">
              {hero.title}
            </h1>
            
            <div className="space-y-4 md:space-y-6 mb-8 md:mb-12 text-base sm:text-lg md:text-xl leading-relaxed drop-shadow-md px-2">
              <p className="break-words">
                {renderText(hero.description1)}
              </p>
              
              <p className="break-words" dangerouslySetInnerHTML={{ __html: hero.description2.split('**').map((part, index) => 
                index % 2 === 0 ? part : `<strong>${part}</strong>`
              ).join('') }} />

              <p className="break-words">
                {renderText(hero.description3)}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button 
                asChild 
                size="lg"
                className="bg-shamsy-dark hover:bg-shamsy-primary shamsy-transition text-lg px-8 py-6 shamsy-shadow-green"
              >
                <Link to={`${language === 'de' ? '/projekte' : '/' + language + '/projects'}`} className="flex items-center gap-2">
                  {hero.button1}
                  <ArrowRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
                </Link>
              </Button>
              
              <Button 
                asChild 
                variant="outline" 
                size="lg"
                className="bg-white/20 border-white/80 text-white hover:bg-white/30 hover:border-white backdrop-blur-sm text-lg px-8 py-6"
              >
                <Link to={`${language === 'de' ? '/mitmachen' : '/' + language + '/get-involved'}`} className="flex items-center gap-2">
                  <Heart className="w-5 h-5" />
                  {hero.button2}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-20 shamsy-bg-gradient">
        <div className="container mx-auto px-4 text-center">
          <blockquote className="text-lg sm:text-xl md:text-3xl lg:text-4xl font-light italic text-foreground max-w-5xl mx-auto mb-6 md:mb-8 leading-relaxed break-words px-2"
                      dangerouslySetInnerHTML={{ __html: quote.text.split('**').map((part, index) => 
                        index % 2 === 0 ? part : `<strong class="text-shamsy-primary">${part}</strong>`
                      ).join('') }} />
          <cite className="text-lg sm:text-xl md:text-2xl font-semibold text-shamsy-primary break-words">
            — {quote.author}
          </cite>
        </div>
      </section>

      {/* War Facts Section */}
      {yearGroups.length > 0 && (
        <section className="py-20 bg-destructive/5">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 md:mb-16 px-2">
              <div className="flex items-center justify-center gap-3 mb-4">
                <AlertTriangle className="w-8 h-8 text-destructive" />
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-foreground tracking-tight break-words">
                  {factsTitle}
                </h2>
              </div>
              <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed break-words">
                {factsSubtitle}
              </p>
            </div>
            
            <div className="max-w-5xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                {yearGroups.map((yearGroup) => (
                  <AccordionItem 
                    key={yearGroup.year} 
                    value={yearGroup.year}
                    className="border border-destructive/20 rounded-lg bg-card overflow-hidden"
                  >
                    <AccordionTrigger className="hover:no-underline px-6 py-4 hover:bg-destructive/5 transition-colors">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full text-left">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl md:text-3xl font-bold text-destructive">
                            {yearGroup.year}
                          </span>
                          <span className="text-sm md:text-base font-semibold bg-destructive/10 text-destructive px-3 py-1 rounded-full">
                            {yearGroup.summary.totalEvents} {language === 'de' ? 'Ereignisse' : language === 'en' ? 'Events' : 'أحداث'}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2 text-xs md:text-sm text-muted-foreground">
                          {yearGroup.summary.categories.slice(0, 3).map((cat, idx) => (
                            <span key={idx} className="bg-muted px-2 py-1 rounded">
                              {cat}
                            </span>
                          ))}
                          {yearGroup.summary.categories.length > 3 && (
                            <span className="bg-muted px-2 py-1 rounded">
                              +{yearGroup.summary.categories.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6">
                      <div className="space-y-4 pt-4">
                        {yearGroup.facts.map((fact) => (
                          <Card key={fact.id} className="border-destructive/10 bg-background">
                            <CardContent className="p-4">
                              <div className="flex flex-col md:flex-row md:items-start gap-4">
                                <div className="flex-shrink-0">
                                  <div className="bg-destructive/10 text-destructive font-semibold px-3 py-1.5 rounded text-xs whitespace-nowrap">
                                    {fact.date}
                                  </div>
                                </div>
                                <div className="flex-grow space-y-2">
                                  <div>
                                    <h3 className="text-base md:text-lg font-semibold text-foreground mb-1">
                                      {fact.event}
                                    </h3>
                                    <div className="flex flex-wrap gap-2 text-xs text-muted-foreground mb-2">
                                      <span className="bg-muted px-2 py-0.5 rounded">
                                        📍 {fact.location}
                                      </span>
                                      <span className="bg-muted px-2 py-0.5 rounded">
                                        {fact.category}
                                      </span>
                                    </div>
                                  </div>
                                  <p className="text-sm text-muted-foreground leading-relaxed">
                                    {fact.details}
                                  </p>
                                  {fact.victims && (
                                    <p className="text-sm font-medium text-destructive">
                                      {language === 'de' ? 'Opfer: ' : language === 'en' ? 'Victims: ' : 'الضحايا: '}
                                      {fact.victims}
                                    </p>
                                  )}
                                  {fact.perpetrator && (
                                    <p className="text-xs text-muted-foreground">
                                      {language === 'de' ? 'Verantwortlich: ' : language === 'en' ? 'Perpetrator: ' : 'المسؤول: '}
                                      {fact.perpetrator}
                                    </p>
                                  )}
                                  {fact.sources && (
                                    <a 
                                      href={fact.sources.split(';')[0].trim()} 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      className="text-xs text-shamsy-primary hover:underline inline-flex items-center gap-1"
                                    >
                                      {language === 'de' ? 'Quelle' : language === 'en' ? 'Source' : 'المصدر'}
                                      <ArrowRight className={`w-3 h-3 ${isRTL ? 'rotate-180' : ''}`} />
                                    </a>
                                  )}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>
      )}

      {/* Overview Section */}
      <section className="py-20 shamsy-bg-gradient">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16 px-2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-foreground mb-4 md:mb-6 tracking-tight break-words">
              {overview.title}
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed break-words">
              {overview.subtitle}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {overview.cards.map((item: any, index: number) => (
              <Card key={index} className="shamsy-card border-shamsy-primary/20 hover:shadow-xl shamsy-transition group">
                <CardContent className="p-8 h-full flex flex-col">
                  <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-3 md:mb-4 group-hover:text-shamsy-primary shamsy-transition break-words">
                    {item.title}
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6 flex-grow leading-relaxed break-words">
                    {item.description}
                  </p>
                  <Button 
                    asChild 
                    variant="outline" 
                    className="border-shamsy-primary text-shamsy-primary hover:bg-shamsy-primary hover:text-white shamsy-transition"
                  >
                    <Link to={item.link} className="flex items-center gap-2">
                      {item.buttonText}
                      <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SharedHome;      <section className="relative min-h-screen flex items-center justify-center text-center text-white pt-20">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="/images/hero-destruction.jpg"
            alt="Hero background - ShamSy Archive"
            className="w-full h-full object-cover"
          />
          <div className={`absolute bottom-2 ${isRTL ? 'left-2' : 'right-2'} bg-black/60 text-white text-xs px-2 py-1 rounded`}>
            {language === 'de' ? 'Quelle: ShamSy Archive' : 
             language === 'en' ? 'Source: ShamSy Archive' : 
             'المصدر: أرشيف شمس سوريا'}
          </div>
        </div>
        
        {/* Green Overlay */}
        <div className="absolute inset-0 shamsy-hero-gradient" />
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-light mb-6 md:mb-8 text-white drop-shadow-lg tracking-tight leading-tight break-words">
              {hero.title}
            </h1>
            
            <div className="space-y-4 md:space-y-6 mb-8 md:mb-12 text-base sm:text-lg md:text-xl leading-relaxed drop-shadow-md px-2">
              <p className="break-words">
                {renderText(hero.description1)}
              </p>
              
              <p className="break-words" dangerouslySetInnerHTML={{ __html: hero.description2.split('**').map((part, index) => 
                index % 2 === 0 ? part : `<strong>${part}</strong>`
              ).join('') }} />

              <p className="break-words">
                {renderText(hero.description3)}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button 
                asChild 
                size="lg"
                className="bg-shamsy-dark hover:bg-shamsy-primary shamsy-transition text-lg px-8 py-6 shamsy-shadow-green"
              >
                <Link to={`${language === 'de' ? '/projekte' : '/' + language + '/projects'}`} className="flex items-center gap-2">
                  {hero.button1}
                  <ArrowRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
                </Link>
              </Button>
              
              <Button 
                asChild 
                variant="outline" 
                size="lg"
                className="bg-white/20 border-white/80 text-white hover:bg-white/30 hover:border-white backdrop-blur-sm text-lg px-8 py-6"
              >
                <Link to={`${language === 'de' ? '/mitmachen' : '/' + language + '/get-involved'}`} className="flex items-center gap-2">
                  <Heart className="w-5 h-5" />
                  {hero.button2}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-20 shamsy-bg-gradient">
        <div className="container mx-auto px-4 text-center">
          <blockquote className="text-lg sm:text-xl md:text-3xl lg:text-4xl font-light italic text-foreground max-w-5xl mx-auto mb-6 md:mb-8 leading-relaxed break-words px-2"
                      dangerouslySetInnerHTML={{ __html: quote.text.split('**').map((part, index) => 
                        index % 2 === 0 ? part : `<strong class="text-shamsy-primary">${part}</strong>`
                      ).join('') }} />
          <cite className="text-lg sm:text-xl md:text-2xl font-semibold text-shamsy-primary break-words">
            — {quote.author}
          </cite>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-20 shamsy-bg-gradient">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16 px-2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-foreground mb-4 md:mb-6 tracking-tight break-words">
              {overview.title}
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed break-words">
              {overview.subtitle}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {overview.cards.map((item: any, index: number) => (
              <Card key={index} className="shamsy-card border-shamsy-primary/20 hover:shadow-xl shamsy-transition group">
                <CardContent className="p-8 h-full flex flex-col">
                  <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-3 md:mb-4 group-hover:text-shamsy-primary shamsy-transition break-words">
                    {item.title}
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6 flex-grow leading-relaxed break-words">
                    {item.description}
                  </p>
                  <Button 
                    asChild 
                    variant="outline" 
                    className="border-shamsy-primary text-shamsy-primary hover:bg-shamsy-primary hover:text-white shamsy-transition"
                  >
                    <Link to={item.link} className="flex items-center gap-2">
                      {item.buttonText}
                      <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SharedHome;
