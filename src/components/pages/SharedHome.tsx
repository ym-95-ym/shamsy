import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Heart } from "lucide-react";
import { useHomeContent } from "@/hooks/useContent";

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

  if (!content) {
    return <div>Loading...</div>;
  }

  const { hero, quote, overview, language } = content;
  const isRTL = language === 'ar';

  return (
    <div className="min-h-screen" dir={isRTL ? 'rtl' : 'ltr'}>
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
                        index % 2 === 0 ? part : `<strong>${part}</strong>`
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