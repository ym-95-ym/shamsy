import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Home, 
  Heart, 
  GraduationCap, 
  Users, 
  ShieldCheck,
  AlertTriangle,
  Star
} from "lucide-react";
import { getPastProjects } from "@/lib/pastProjectsManager";
import { getStats } from "@/lib/statsManager";
import { useEffect, useState } from "react";
import { usePastProjectsContent } from "@/hooks/useContent";

const SharedPastProjects = () => {
  const content = usePastProjectsContent();
  const [pastProjects, setPastProjects] = useState<any[]>([]);
  const [totalStats, setTotalStats] = useState<any>({});

  useEffect(() => {
    const loadData = async () => {
      const projects = await getPastProjects(content?.language || 'de');
      const stats = await getStats();
      
      // Map projects with icons
      const projectsWithIcons = projects.map((project: any) => ({
        ...project,
        icon: project.category === 'Bildung' || project.category === 'Education' || project.category === 'التعليم' ? GraduationCap :
              project.category === 'Gesundheit' || project.category === 'Health' || project.category === 'الصحة' ? Heart :
              project.category === 'Unterkünfte' || project.category === 'Shelter' || project.category === 'المأوى' ? Home :
              Users
      }));
      
      setPastProjects(projectsWithIcons);
      setTotalStats(stats);
    };
    
    loadData();
  }, [content?.language]);

  useEffect(() => {
    if (content?.language) {
      document.documentElement.dir = content.language === 'ar' ? 'rtl' : 'ltr';
    }
  }, [content?.language]);

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-shamsy-primary">Loading...</div>
      </div>
    );
  }

  const isRTL = content.language === 'ar';

  return (
    <div className="min-h-screen" dir={isRTL ? 'rtl' : 'ltr'}>
      <PageHeader 
        title={content.header.title}
        subtitle={content.header.subtitle}
      />

      {/* Warning Banner */}
      <section className="py-8 md:py-12 shamsy-bg-gradient">
        <div className="container mx-auto px-4">
          <Card className="border-orange-200 bg-white/90 backdrop-blur-sm">
            <CardContent className="p-4 md:p-8">
              <div className="flex items-start gap-3 md:gap-4">
                <AlertTriangle className="w-6 h-6 md:w-8 md:h-8 text-orange-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg md:text-2xl font-semibold text-orange-800 mb-2 md:mb-3">
                    {content.warning.title}
                  </h3>
                  <p className="text-orange-700 leading-relaxed text-sm md:text-lg">
                    <strong>{content.warning.description.split('**')[1]}</strong>{' '}
                    {content.warning.description.split('**')[2]}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Success Stats */}
      <section className="py-16 shamsy-bg-gradient">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-light text-foreground mb-4 md:mb-6">
              {content.stats.title}
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
              {content.stats.subtitle}
            </p>
          </div>

          <div className="flex justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8 max-w-2xl">
              {content.stats.items.map((item, index) => (
                <Card key={index} className="shamsy-card border-shamsy-primary/20 text-center">
                  <CardContent className="p-4 md:p-8">
                    {index === 0 ? (
                      <Star className="w-8 h-8 md:w-12 md:h-12 text-shamsy-primary mx-auto mb-3 md:mb-4" />
                    ) : (
                      <ShieldCheck className="w-8 h-8 md:w-12 md:h-12 text-shamsy-primary mx-auto mb-3 md:mb-4" />
                    )}
                    <div className="text-2xl md:text-4xl font-bold text-shamsy-primary mb-1 md:mb-2">
                      {item.format ? 
                        item.format.replace('{value}', (totalStats[item.key] || (index === 0 ? 7 : 300000)).toLocaleString()) :
                        (totalStats[item.key] || (index === 0 ? 7 : 300000)).toLocaleString()
                      }
                    </div>
                    <div className="text-xs md:text-sm text-muted-foreground">{item.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="space-y-16">
            {pastProjects.map((project, index) => {
              const IconComponent = project.icon;
              return (
                <div key={project.id} className="relative">
                  {index < pastProjects.length - 1 && (
                    <div className={`absolute ${isRTL ? 'right-8' : 'left-8'} top-24 bottom-0 w-0.5 bg-shamsy-primary/20 hidden lg:block`} />
                  )}
                  
                  <Card className="shamsy-card border-shamsy-primary/20 overflow-hidden">
                    <CardContent className="p-0">
                      <div className="grid grid-cols-1 lg:grid-cols-3">
                        {/* Project Image */}
                        <div className="relative h-48 md:h-64 lg:h-auto">
                          <img 
                            key={`${project.id}-${content.language}`}
                            src={project.image} 
                            alt={project.title}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                          <div className={`absolute top-2 md:top-4 ${isRTL ? 'right-2 md:right-4' : 'left-2 md:left-4'}`}>
                            <Badge className="bg-shamsy-primary text-white text-xs">
                              {project.category}
                            </Badge>
                          </div>
                          <div className={`absolute top-2 md:top-4 ${isRTL ? 'left-2 md:left-4' : 'right-2 md:right-4'}`}>
                            <Badge variant="outline" className="bg-white/90 backdrop-blur-sm text-xs">
                              {project.year}
                            </Badge>
                          </div>
                        </div>

                        {/* Project Content */}
                        <div className="lg:col-span-2 p-4 md:p-8">
                          <div className="flex items-start gap-3 md:gap-4 mb-4 md:mb-6">
                            <div className="w-12 h-12 md:w-16 md:h-16 bg-shamsy-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                              <IconComponent className="w-6 h-6 md:w-8 md:h-8 text-shamsy-primary" />
                            </div>
                            <div className="flex-grow">
                              <h3 className="text-lg md:text-2xl font-semibold text-foreground mb-2">
                                {project.title}
                              </h3>
                              <div className="flex flex-col gap-1 md:flex-row md:items-center md:gap-4 text-xs md:text-sm text-muted-foreground mb-3 md:mb-4">
                                <span className="break-words">{project.location}</span>
                                <span className="hidden md:inline">•</span>
                                <span className="break-words">{project.beneficiaries} {content.language === 'ar' ? 'مستفيد' : content.language === 'en' ? 'benefited' : 'begünstigt'}</span>
                              </div>
                              <Badge 
                                className={`${
                                  project.status.includes('completed') || project.status.includes('abgeschlossen') || project.status.includes('اكتمل')
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-blue-100 text-blue-800'
                                }`}
                              >
                                {project.status}
                              </Badge>
                            </div>
                          </div>

                          <p className="text-muted-foreground mb-4 md:mb-6 leading-relaxed text-sm md:text-lg">
                            {project.description}
                          </p>

                          {/* Challenge & Impact */}
                          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
                            <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                              <h4 className="font-semibold text-red-800 mb-2 flex items-center gap-2">
                                <AlertTriangle className="w-4 h-4" />
                                {content.language === 'ar' ? 'التحديات' : content.language === 'en' ? 'Challenges' : 'Herausforderungen'}
                              </h4>
                              <p className="text-red-700 text-sm leading-relaxed">
                                {project.challenges}
                              </p>
                            </div>
                            
                            <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                              <h4 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                                <Star className="w-4 h-4" />
                                {content.language === 'ar' ? 'التأثير المحقق' : content.language === 'en' ? 'Impact achieved' : 'Erreichte Wirkung'}
                              </h4>
                              <p className="text-green-700 text-sm leading-relaxed">
                                {project.impact}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
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
                <Heart className="w-8 h-8 text-shamsy-primary" />
              </div>
              
              <blockquote className="text-2xl md:text-3xl font-light italic text-foreground mb-8 leading-relaxed">
                "{content.testimonial.quote}"
              </blockquote>
              
              <cite className="text-lg font-semibold text-shamsy-primary">
                — {content.testimonial.author}
              </cite>

              <div className="mt-8 p-6 bg-shamsy-primary/5 rounded-lg border border-shamsy-primary/20">
                <p className="text-foreground font-medium">
                  <strong>{content.testimonial.highlight}</strong>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default SharedPastProjects;