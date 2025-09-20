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

const VergangeneProj = () => {
  const pastProjects = [
    {
      id: 1,
      title: "Schulen renoviert und ausgestattet",
      category: "Bildung",
      location: "Der El-Asafir, Rural Damaskus",
      year: "2022-2024",
      description: "Die Wiedereröffnung einer kriegsbeschädigten Schule wurde durch die Mobilisierung von Freiwilligen, die Reparatur der Infrastruktur und die Wiederherstellung sicherer Lernräume ermöglicht. Gemeinsam gaben wir Kindern ihre Zukunft zurück – einen Ort, an dem Hoffnung und Bildung wieder gedeihen können.",
      beneficiaries: "400 Schüler",
      challenges: "Beschaffung von Materialien, Transport in unsichere Gebiete, Koordination mit lokalen Partnern unter Geheimhaltung",
      impact: "Bessere Lernbedingungen für eine ganze Generation",
      icon: GraduationCap,
      status: "Erfolgreich abgeschlossen",
      image: "/shamsy/images/kindergruppe.jpg"
    },
    {
      id: 3,
      title: "Medizinische Operationen ermöglicht",
      category: "Gesundheit",
      location: "Verschiedene Krankenhäuser",
      year: "2011-2024",
      description: "Lebensverändernde Operationen und medizinische Eingriffe für bedürftige Patienten und Kindedr wurden finanziert und koordiniert – einschließlich der Bereitstellung von spezialisierten Hörgeräten für Kriegsbetroffene. Gemeinsam schenkten wir Menschen ihre Gesundheit und Lebensqualität zurück, die durch den Krieg verloren gegangen waren.",
      challenges: "Suche nach bedürftigen Patienten in Kriegszeiten, Koordination mit Ärzten und Krankenhäuser, Anschaffung medizinischer Geräte",
      impact: "Menschenleben gerettet, Neue Möglichkeiten geschaffen",
      icon: Heart,
      status: "Erfolgreich abgeschlossen",
      image: "/shamsy/images/operation.jpg"
    },
    {
      id: 2,
      title: "15 Notunterkünfte gebaut",
      category: "Unterkünfte",
      location: "Eastern Ghouta",
      year: "2011-2024",
      description: "15 widerstandsfähige Unterkünfte wurden für Familien errichtet, die durch den Krieg im ländlichen Damaskus ihr Zuhause verloren haben – von der Planung über den Bau bis hin zur vollständigen Ausstattung. Gemeinsam mit unseren lokalen Partner NGOs sorgte unser transparentes Auswahlverfahren dafür, dass die Hilfe die Familien erreichte, die sie am dringendsten benötigten.",
      beneficiaries: "120 Familien",
      challenges: "Materialtransport unter Kriegsbedingungen, Sicherheit der Bauteams, Geheimhaltung vor dem Regime",
      impact: "Über 500 Menschen erhielten sicheren Wohnraum",
      icon: Home,
      status: "Erfolgreich abgeschlossen",
      image: "/shamsy/images/hero-destruction.jpg"
    },
    {
      id: 4,
      title: "Essen und Kleidung für alle",
      category: "Humanitär",
      location: "Damascus und Umgebung",
      year: "2011-2024",
      description: "Winterhilfe, Kleidung und Nahrungsmittel erreichten vertriebene Familien, während Jugendliche und Frauen durch IT- und Sprachworkshops neue Perspektiven erhielten. Gemeinsam schafften wir nicht nur Überlebenshilfe, sondern auch Wege in eine selbstbestimmte Zukunft.",
      beneficiaries: "Menschen die mit Nichts fliehen mussten, Kinder, Frauen",
      challenges: "Materialtransport unter Kriegsbedingungen und von Deutschland nach Syrien, Geheimhaltung vor dem Regime",
      icon: Home,
      status: "laufend",
      image: "/shamsy/images/kindergruppe.jpg"
    },
    {
      id: 5,
      title: "Medikamente bereitgestellt",
      category: "Humanitär",
      location: "Damascus und Umgebung",
      year: "2011-2024",
      description: "Beschaffung und Lieferung von Medikamenten und kritischen Diagnostikgeräten zur Verbesserung der Notfall- und Spezialversorgung. Sichere Lieferung und Schulung des Krankenhauspersonals in Douma wurden gewährleistet – damit lebensrettende Hilfe dort ankommt, wo sie am dringendsten gebraucht wird.",
      beneficiaries: "Menschen in Not und Kriegsbetroffene",
      challenges: "Materialtransport unter Kriegsbedingungen und von Deutschland nach Syrien, Geheimhaltung vor dem Regime",
      icon: Home,
      status: "Erfolgreich abgeschlossen",
      image: "/shamsy/images/help.jpg"
    }

  ];

  const totalStats = {
    totalBeneficiaries: 2972,
    totalCost: 300000,
    projectCount: 7,
    timespan: "2011-2024"
  };

  return (
    <div className="min-h-screen">
      <PageHeader 
        title="Vergangene Projekte"
        subtitle="Unsere Erfolge vor der Befreiung - Hilfe trotz Angst und Verfolgung"
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
                    Hilfe unter extremen Bedingungen
                  </h3>
                  <p className="text-orange-700 leading-relaxed text-sm md:text-lg">
                    <strong>Alle Projekte vor 2024 wurden unter der Assad-Diktatur durchgeführt.</strong> 
                    Das bedeutete: Ständige Angst vor Verfolgung, Geheimhaltung zum Schutz unserer Familien in Syrien sowie enorme logistische Herausforderungen. Jedes Projekt war ein Risiko - aber auch ein Akt der Hoffnung. Alles wäre unmöglich ohne Unterstützung unserer Partner NGOs und Kollegen in Syrien.
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
              Erfolge trotz allen Hürden
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
              Was wir seit Jahren heimlicher Arbeit erreicht haben.
            </p>
          </div>

          <div className="flex justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8 max-w-2xl">
              <Card className="shamsy-card border-shamsy-primary/20 text-center">
                <CardContent className="p-4 md:p-8">
                  <Star className="w-8 h-8 md:w-12 md:h-12 text-shamsy-primary mx-auto mb-3 md:mb-4" />
                  <div className="text-2xl md:text-4xl font-bold text-shamsy-primary mb-1 md:mb-2">
                    {totalStats.projectCount}
                  </div>
                  <div className="text-xs md:text-sm text-muted-foreground">Projekte erfolgreich durchgeführt</div>
                </CardContent>
              </Card>
              
              <Card className="shamsy-card border-shamsy-primary/20 text-center">
                <CardContent className="p-4 md:p-8">
                  <ShieldCheck className="w-8 h-8 md:w-12 md:h-12 text-shamsy-primary mx-auto mb-3 md:mb-4" />
                  <div className="text-2xl md:text-4xl font-bold text-shamsy-primary mb-1 md:mb-2">
                    €{totalStats.totalCost.toLocaleString()}
                  </div>
                  <div className="text-xs md:text-sm text-muted-foreground">Spendengelder eingesetzt</div>
                </CardContent>
              </Card>
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
                    <div className="absolute left-8 top-24 bottom-0 w-0.5 bg-shamsy-primary/20 hidden lg:block" />
                  )}
                  
                  <Card className="shamsy-card border-shamsy-primary/20 overflow-hidden">
                    <CardContent className="p-0">
                      <div className="grid grid-cols-1 lg:grid-cols-3">
                        {/* Project Image */}
                        <div className="relative h-48 md:h-64 lg:h-auto">
                          <img 
                            src={project.image} 
                            alt={project.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-2 md:top-4 left-2 md:left-4">
                            <Badge className="bg-shamsy-primary text-white text-xs">
                              {project.category}
                            </Badge>
                          </div>
                          <div className="absolute top-2 md:top-4 right-2 md:right-4">
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
                                <span>{project.location}</span>
                                <span className="hidden md:inline">•</span>
                                <span>{project.beneficiaries} begünstigt</span>
                                <span className="hidden md:inline">•</span>
                                <span>{project.cost} investiert</span>
                              </div>
                              <Badge 
                                className={`${
                                  project.status === 'Erfolgreich abgeschlossen' 
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
                                Herausforderungen
                              </h4>
                              <p className="text-red-700 text-sm leading-relaxed">
                                {project.challenges}
                              </p>
                            </div>
                            
                            <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                              <h4 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                                <Star className="w-4 h-4" />
                                Erreichte Wirkung
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
                "Jedes dieser Projekte kam aus der Not. Unser Diktator hat ganze Städte und viele Familien zerstört. Er hat alle rote Linien überschritten. Hilfe war dort verboten, wo Bomben und chemische Waffen gefallen sind. Familien von politischen Gefangenen wurden vertrieben. Verletzte aus Kriegsgebieten durften nur heimlich versorgt werden. Es war grausam... Aber die Diktatur ist vorbei!"
              </blockquote>
              
              <cite className="text-lg font-semibold text-shamsy-primary">
                — Yazan, ShamSy Gründungsmitglied
              </cite>

              <div className="mt-8 p-6 bg-shamsy-primary/5 rounded-lg border border-shamsy-primary/20">
                <p className="text-foreground font-medium">
                  <strong>Seit 2024 können systematisch planen und agieren. Jetzt dürfen wir offiziell dort helfen, wo es verboten war.</strong>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default VergangeneProj;
