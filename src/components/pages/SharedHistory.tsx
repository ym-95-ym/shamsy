import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Users, Target, Heart } from "lucide-react";
import { useHistoryContent } from "@/hooks/useContent";

// Helper function to render text with markdown-style bold formatting
function renderText(text: string) {
  return text
    .split('**')
    .map((part, index) => 
      index % 2 === 0 ? part : <strong key={index}>{part}</strong>
    );
}

const iconMap = {
  calendar: Calendar,
  users: Users,
  target: Target,
  heart: Heart
};

const SharedHistory = () => {
  const content = useHistoryContent();

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
 
      {/* Timeline Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            
            {/* Introduction */}
            <Card className="shamsy-card border-shamsy-primary/20 mb-12">
              <CardContent className="p-8">
                <div className="flex items-start gap-4 mb-6">
                  <Heart className="w-8 h-8 text-shamsy-primary mt-1" />
                  <div>
                    <h3 className="text-2xl font-semibold text-foreground mb-4">
                      {content.intro.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-lg">
                      {content.intro.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Timeline Items */}
            <div className="space-y-8 md:space-y-12">
              
              {content.timeline.map((item: any, index: number) => {
                const icons = [Calendar, Users, Target, Heart];
                const IconComponent = icons[index % icons.length];
                
                return (
                  <div key={index} className="flex gap-4 md:gap-8 items-start">
                    <div className="flex-shrink-0 w-16 h-16 md:w-24 md:h-24 bg-shamsy-primary/10 rounded-full flex items-center justify-center">
                      <IconComponent className="w-5 h-5 md:w-8 md:h-8 text-shamsy-primary" />
                    </div>
                    <Card className={`shamsy-card flex-grow ${index === content.timeline.length - 1 ? 'border-shamsy-light/30 shadow-2xl' : 'border-shamsy-primary/20'}`}>
                      <CardContent className="p-4 md:p-8">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-4">
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            index === content.timeline.length - 1 
                              ? 'bg-gradient-to-r from-shamsy-primary to-shamsy-light text-white px-4 py-2'
                              : 'bg-shamsy-primary text-white'
                          }`}>
                            {item.period}
                          </span>
                          <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-foreground break-words">
                            {item.title}
                          </h3>
                        </div>
                        
                        <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-4 break-words">
                          {item.description}
                        </p>
                        
                        {item.quote && (
                          <p className="text-sm md:text-base text-foreground font-medium break-words mb-4">
                            "{item.quote}"
                          </p>
                        )}
                        
                        {item.highlight && (
                          <div className="bg-shamsy-primary/5 p-3 md:p-4 rounded-lg mb-4">
                            <p className="text-sm md:text-base text-foreground font-medium break-words">
                              {item.highlight}
                            </p>
                          </div>
                        )}
                        
                        {item.stats && (
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 mb-6">
                            {item.stats.map((stat: any, statIndex: number) => (
                              <div key={statIndex} className="bg-shamsy-primary/5 p-4 rounded-lg text-center">
                                <div className="text-2xl font-bold text-shamsy-primary mb-2">{stat.number}</div>
                                <div className="text-sm text-foreground">{stat.label}</div>
                              </div>
                            ))}
                          </div>
                        )}
                        
                        {item.vision && (
                          <div className="bg-gradient-to-r from-shamsy-primary/10 to-shamsy-light/10 p-6 rounded-lg border border-shamsy-primary/20">
                            <h4 className="text-xl font-semibold text-shamsy-primary mb-3">
                              {item.vision.title}
                            </h4>
                            <ul className="space-y-2 text-foreground">
                              {item.vision.points.map((point: string, pointIndex: number) => (
                                <li key={pointIndex} className="flex items-start gap-2">
                                  <div className="w-2 h-2 bg-shamsy-primary rounded-full mt-2 flex-shrink-0"></div>
                                  <span className="text-sm md:text-base break-words">{point}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                );
              })}

            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 shamsy-bg-gradient">
        <div className="container mx-auto px-4 text-center">
          <Card className="shamsy-card border-shamsy-primary/20 max-w-4xl mx-auto">
            <CardContent className="p-6 md:p-12">
              <h2 className="text-3xl md:text-4xl font-light text-foreground mb-8">
                {content.mission.title}
              </h2>
              <div className="text-xl text-muted-foreground leading-relaxed mb-8">
                {renderText(content.mission.description)}
              </div>
              <div className="w-24 h-1 bg-shamsy-primary mx-auto rounded-full"></div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};
 
export default SharedHistory;