import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Heart, 
  Users, 
  Handshake, 
  Gift, 
  ArrowRight, 
  CheckCircle,
  Star,
  Euro,
  UserPlus,
  Megaphone
} from "lucide-react";
import { getStats } from "@/lib/statsManager";
import { useEffect, useState } from "react";
import { useGetInvolvedContent } from "@/hooks/useContent";

const iconMap = {
  Heart,
  Users,
  Handshake,
  Gift,
  Euro,
  UserPlus,
  Megaphone
};

const SharedGetInvolved = () => {
  const [currentStats, setCurrentStats] = useState<any>({});
  const content = useGetInvolvedContent();

  useEffect(() => {
    const loadStats = async () => {
      const stats = await getStats();
      setCurrentStats(stats);
    };
    
    loadStats();
  }, []);

  if (!content) {
    return <div>Loading...</div>;
  }

  const isRTL = content.language === 'ar';

  return (
    <div className="min-h-screen" dir={isRTL ? 'rtl' : 'ltr'}>
      <PageHeader 
        title={content.header.title}
        subtitle={content.header.subtitle}
      />

      {/* Current Impact Stats */}
      <section className="py-16 shamsy-bg-gradient">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-light text-foreground mb-4">
              {content.stats.title}
            </h2>
            <p className="text-lg text-muted-foreground">
              {content.stats.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {content.stats.items.map((stat: any, index: number) => {
              const icons = [Euro, UserPlus, Handshake, Gift];
              const IconComponent = icons[index];
              
              return (
                <Card key={index} className="shamsy-card border-shamsy-primary/20 text-center">
                  <CardContent className="p-6">
                    <IconComponent className="w-12 h-12 text-shamsy-primary mx-auto mb-4" />
                    <div className="text-3xl font-bold text-shamsy-primary mb-2">
                      {currentStats[stat.key] || stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Support Options */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-foreground mb-6">
              {content.options.title}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {content.options.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {content.options.items.map((option: any, index: number) => {
              const icons = [Heart, Users, Handshake, Gift];
              const colors = ['shamsy-primary', 'shamsy-light', 'shamsy-dark', 'shamsy-glow'];
              const IconComponent = icons[index];
              const color = colors[index];
              
              return (
                <Card key={index} className="shamsy-card border-shamsy-primary/20 hover:shadow-xl shamsy-transition group">
                  <CardContent className="p-8 h-full flex flex-col">
                    <div className="flex items-start gap-4 mb-6">
                      <div className={`w-16 h-16 bg-${color}/10 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 shamsy-transition`}>
                        <IconComponent className={`w-8 h-8 text-${color}`} />
                      </div>
                      <div>
                        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-foreground mb-2 group-hover:text-shamsy-primary shamsy-transition break-words">
                          {option.title}
                        </h3>
                        <p className="text-sm md:text-base text-shamsy-primary font-medium break-words">
                          {option.subtitle}
                        </p>
                      </div>
                    </div>

                    <p className="text-sm md:text-base text-muted-foreground mb-6 leading-relaxed flex-grow break-words">
                      {option.description}
                    </p>

                    <div className="mb-8">
                      <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                        <Star className="w-5 h-5 text-shamsy-primary" />
                        {content.language === 'de' ? 'Ihre Vorteile:' : content.language === 'en' ? 'Your Benefits:' : 'فوائدك:'}
                      </h4>
                      <ul className="space-y-2">
                        {option.benefits.map((benefit: string, benefitIndex: number) => (
                          <li key={benefitIndex} className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-shamsy-primary mt-0.5 flex-shrink-0" />
                            <span className="text-sm md:text-base text-muted-foreground break-words">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button 
                      asChild 
                      className="bg-shamsy-primary hover:bg-shamsy-dark shamsy-transition group-hover:shamsy-shadow-green w-full"
                    >
                      {option.ctaEmail ? (
                        <a href={option.ctaEmail} className="flex items-center justify-center gap-2 w-full">
                          <span className="truncate">{option.cta}</span>
                          <ArrowRight className={`w-4 h-4 flex-shrink-0 ${isRTL ? 'rotate-180' : ''}`} />
                        </a>
                      ) : (
                        <Link to={option.ctaLink} className="flex items-center justify-center gap-2 w-full">
                          <span className="truncate">{option.cta}</span>
                          <ArrowRight className={`w-4 h-4 flex-shrink-0 ${isRTL ? 'rotate-180' : ''}`} />
                        </Link>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-20 shamsy-bg-gradient">
        <div className="container mx-auto px-4">
          <Card className="shamsy-card border-shamsy-primary/20 max-w-4xl mx-auto text-center">
            <CardContent className="p-12">
              <div className="w-16 h-16 bg-shamsy-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Megaphone className="w-8 h-8 text-shamsy-primary" />
              </div>
              
              {content.testimonial.quotes.map((quote: any, index: number) => (
                <div key={index} className={index > 0 ? 'mt-12' : ''}>
                  <blockquote className="text-xl md:text-2xl lg:text-3xl font-light italic text-foreground mb-6 md:mb-8 leading-relaxed break-words">
                    "{quote.text}"
                  </blockquote>
                  
                  <cite className="text-base md:text-lg font-semibold text-shamsy-primary block">
                    — {quote.author}
                  </cite>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-foreground mb-6">
              {content.faq.title}
            </h2>
            <p className="text-xl text-muted-foreground">
              {content.faq.subtitle}
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {content.faq.items.map((faq: any, index: number) => (
              <Card key={index} className="shamsy-card border-shamsy-primary/20">
                <CardContent className="p-6">
                  <h3 className="text-base md:text-lg font-semibold text-foreground mb-3 break-words">
                    {faq.question}
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed break-words">
                    {faq.answer}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
 
export default SharedGetInvolved; 