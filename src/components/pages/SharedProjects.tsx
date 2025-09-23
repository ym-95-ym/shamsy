import { useState, useEffect } from "react";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { loadProjects, Project } from "@/lib/projectManager";
import { useProjectsContent } from "@/hooks/useContent";
import { getStats } from "@/lib/statsManager";

const SharedProjects = () => {
  const content = useProjectsContent();
  const [projects, setProjects] = useState<Project[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [loadedProjects, loadedStats] = await Promise.all([
          loadProjects(),
          getStats()
        ]);
        setProjects(loadedProjects);
        setStats(loadedStats);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  useEffect(() => {
    if (content?.language) {
      document.documentElement.dir = content.language === 'ar' ? 'rtl' : 'ltr';
    }
  }, [content?.language]);

  if (!content || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-shamsy-primary">Loading...</div>
      </div>
    );
  }

  const humanitarianProjects = projects.filter(p => p.type === 'humanitarian');
  const majorProjects = projects.filter(p => p.type === 'major');
  const isRTL = content.language === 'ar';
  const donateRoute = content.language === 'de' ? '/spenden' : `/${content.language}/donate`;
  const getInvolvedRoute = content.language === 'de' ? '/mitmachen' : `/${content.language}/get-involved`;

  return (
    <div className="min-h-screen" dir={isRTL ? 'rtl' : 'ltr'}>
      <PageHeader 
        title={content.header.title}
        subtitle={content.header.subtitle}
      />

      {/* Overview Stats */}
      <section className="py-16 shamsy-bg-gradient">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {content.stats.map((stat, index) => {
              let displayValue = stat.value;
              if (stat.key && stats) {
                displayValue = stats[stat.key] || stat.value;
              }
              
              return (
                <Card key={index} className="shamsy-card border-shamsy-primary/20 text-center">
                  <CardContent className="p-6">
                    <div className="text-3xl font-bold text-shamsy-primary mb-2 break-words">
                      {displayValue}
                    </div>
                    <div className="text-sm text-muted-foreground break-words">
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Humanitarian Projects */}
      {humanitarianProjects.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-light text-foreground mb-6 break-words">
                {content.humanitarian.title}
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto break-words">
                {content.humanitarian.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {humanitarianProjects.map((project) => {
                const IconComponent = project.icon;
                return (
                  <Card key={project.id} className="shamsy-card border-shamsy-primary/20 overflow-hidden hover:shadow-xl shamsy-transition group hover:-translate-y-2">
                    <CardContent className="p-0">
                      <div className="relative h-64">
                        <img 
                          src={project.image} 
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 shamsy-transition"
                        />
                        <div className={`absolute bottom-2 ${isRTL ? 'left-2' : 'right-2'} bg-black/60 text-white text-xs px-2 py-1 rounded`}>
                          {content.imageSource}
                        </div>
                        <div className={`absolute top-4 ${isRTL ? 'right-4' : 'left-4'} bg-shamsy-primary text-white px-3 py-1 rounded-full text-sm font-semibold`}>
                          {project.category}
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                      </div>

                      <div className="p-6">
                        <div className="flex items-start gap-3 mb-4">
                          <div className="w-12 h-12 bg-shamsy-primary/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-shamsy-primary/20 shamsy-transition">
                            <IconComponent className="w-6 h-6 text-shamsy-primary" />
                          </div>
                          <div className="flex-grow">
                            <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-foreground mb-2 group-hover:text-shamsy-primary shamsy-transition leading-tight break-words">
                              {project.title}
                            </h3>
                          </div>
                        </div>

                        <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-4 break-words">
                          {project.description}
                        </p>

                        <Button 
                          asChild 
                          className="w-full bg-shamsy-primary hover:bg-shamsy-dark shamsy-transition shamsy-shadow-green"
                        >
                          <Link to={donateRoute} className="flex items-center justify-center gap-2">
                            {content.humanitarian.button}
                            <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Major Projects */}
      {majorProjects.length > 0 && (
        <section className="py-20 shamsy-bg-gradient">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-light text-foreground mb-6 break-words">
                {content.major.title}
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto break-words">
                {content.major.subtitle}
              </p>
            </div>

            <div className="space-y-12">
              {majorProjects.map((project) => {
                const IconComponent = project.icon;
                return (
                  <Card key={project.id} className="shamsy-card border-shamsy-primary/20 overflow-hidden hover:shadow-2xl shamsy-transition group">
                    <CardContent className="p-0">
                      <div className="grid grid-cols-1 lg:grid-cols-2">
                        {/* Project Image */}
                        <div className="relative h-80 lg:h-auto">
                          <img 
                            src={project.image} 
                            alt={project.title}
                            className="w-full h-full object-cover group-hover:scale-105 shamsy-transition"
                          />
                          <div className={`absolute bottom-2 ${isRTL ? 'left-2' : 'right-2'} bg-black/60 text-white text-xs px-2 py-1 rounded`}>
                            {content.imageSource}
                          </div>
                          <div className={`absolute top-4 ${isRTL ? 'right-4' : 'left-4'} bg-shamsy-primary text-white px-4 py-2 rounded-full text-sm font-semibold`}>
                            {project.category}
                          </div>
                          <div className={`absolute inset-0 ${isRTL ? 'bg-gradient-to-l' : 'bg-gradient-to-r'} from-black/30 via-transparent to-transparent lg:bg-gradient-to-t lg:from-black/50 lg:via-transparent lg:to-transparent`} />
                        </div>

                        {/* Project Details */}
                        <div className="p-8 lg:p-10 flex flex-col justify-between">
                          <div>
                            <div className="flex items-start gap-4 mb-6">
                              <div className="w-16 h-16 bg-shamsy-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-shamsy-primary/20 shamsy-transition">
                                <IconComponent className="w-8 h-8 text-shamsy-primary" />
                              </div>
                              <div className="flex-grow">
                                <h3 className="text-2xl lg:text-3xl font-semibold text-foreground mb-3 group-hover:text-shamsy-primary shamsy-transition leading-tight break-words">
                                  {project.title}
                                </h3>
                              </div>
                            </div>

                            <p className="text-muted-foreground mb-8 leading-relaxed text-lg break-words">
                              {project.description}
                            </p>

                            {/* Project Stats */}
                            {project.stats && (
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                                {project.stats.map((stat, index) => (
                                  <div key={index} className="shamsy-card border-shamsy-primary/20 text-center p-6 hover:bg-shamsy-primary/5 shamsy-transition">
                                    <div className="text-3xl font-bold text-shamsy-primary mb-2 break-words">
                                      {stat.number}
                                    </div>
                                    <div className="text-sm text-muted-foreground leading-tight break-words">
                                      {stat.label}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>

                          <div className="space-y-4">
                            <Button 
                              asChild 
                              size="lg"
                              className="w-full bg-shamsy-primary hover:bg-shamsy-dark shamsy-transition shamsy-shadow-green"
                            >
                              <Link to={donateRoute} className="flex items-center justify-center gap-2">
                                {content.major.supportButton}
                                <ArrowRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
                              </Link>
                            </Button>
                            <Button 
                              asChild 
                              variant="outline"
                              size="lg"
                              className="w-full border-shamsy-primary text-shamsy-primary hover:bg-shamsy-primary hover:text-white shamsy-transition"
                            >
                              <Link to={getInvolvedRoute} className="flex items-center justify-center gap-2">
                                {content.major.learnMoreButton}
                                <ArrowRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Call to Action */}
      <section className="py-20 shamsy-bg-gradient">
        <div className="container mx-auto px-4 text-center">
          <Card className="shamsy-card border-shamsy-primary/20 max-w-4xl mx-auto">
            <CardContent className="p-12">
              <h2 className="text-3xl md:text-4xl font-light text-foreground mb-6 break-words">
                {content.cta.title}
              </h2>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed break-words">
                {content.cta.subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  asChild 
                  size="lg"
                  className="bg-shamsy-primary hover:bg-shamsy-dark shamsy-transition shamsy-shadow-green"
                >
                  <Link to={donateRoute} className="flex items-center gap-2">
                    {content.cta.donateButton}
                    <ArrowRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
                  </Link>
                </Button>
                <Button 
                  asChild 
                  variant="outline" 
                  size="lg"
                  className="border-shamsy-primary text-shamsy-primary hover:bg-shamsy-primary hover:text-white"
                >
                  <Link to={getInvolvedRoute}>{content.cta.memberButton}</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default SharedProjects;