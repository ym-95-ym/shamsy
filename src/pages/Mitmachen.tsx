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

const Mitmachen = () => {
  const supportOptions = [
    {
      id: 1,
      title: "Spenden",
      subtitle: "Direkte finanzielle Unterstützung",
      icon: Heart,
      color: "shamsy-primary",
      description: "Ihre Spende fließt zu 100% in die richtigen Händen. Sie können auch direkt für ein Projekt spenden. Jeder Euro hilft beim Wiederaufbau Syriens.",
      benefits: [
        "Transparente Verwendung Ihrer Spende",
        "Regelmäßige Updates über Projektfortschritte", 
        "Spendenquittung für Steuerersparnis",
        "Einladung zu exklusiven Spendenveranstaltungen"
      ],
      cta: "Jetzt Spenden",
      ctaLink: "/spenden"
    },
    {
      id: 2,
      title: "Vereinsmitgliedschaft",
      subtitle: "Aktiv mitgestalten und entscheiden",
      icon: Users,
      color: "shamsy-light",
      description: "Als Vereinsmitglied haben Sie Mitspracherecht bei wichtigen Entscheidungen und gestalten die Zukunft von ShamSy aktiv mit.",
      benefits: [
        "Stimmrecht bei Vereinsversammlungen",
        "Mitgestaltung der Projektstrategie",
        "Exklusiver Zugang zu Mitgliederversammlungen",
        "Vernetzung mit Gleichgesinnten",
        "Bereits ab €5/Monat möglich"
      ],
      cta: "Mitglied werden",
      ctaLink: "/spenden"
    },
    {
      id: 3,
      title: "Ehrenamtliche Mitarbeit",
      subtitle: "Zeit und Fähigkeiten einsetzen",
      icon: Handshake,
      color: "shamsy-dark", 
      description: "Bringen Sie Ihre Expertise ein - ob Marketing, Technik, Organisation oder Projektmanagement.",
      benefits: [
        "Flexible Zeiteinteilung",
        "Remote oder vor Ort möglich",
        "Weiterbildungsmöglichkeiten",
        "Internationale Projekterfahrung sammeln",
        "Direkten Impact auf Projekte haben"
      ],
      cta: "Kontakt aufnehmen",
      ctaLink: "mailto:info.shamsyr@gmail.com"
    },
    {
      id: 4,
      title: "Unternehmenskooperationen",
      subtitle: "Corporate Social Responsibility",
      icon: Gift,
      color: "shamsy-glow",
      description: "Ihr Unternehmen kann durch Kooperationen, Sponsoring oder Pro-Bono-Services einen wertvollen Beitrag leisten.",
      benefits: [
        "Positive Unternehmensreputation",
        "CSR-Berichterstattung möglich",
        "Marketing-Kooperationen",
        "Team-Building durch gemeinnützige Projekte",
        "Steuerliche Vorteile"
      ],
      cta: "Partnerschaft anfragen",
      ctaLink: "mailto:info.shamsyr@gmail.com"
    }
  ];

  const currentStats = {
    totalDonated: "300,000 €",
    activeMembers: 10,
    volunteers: 10,
    partnerships: 1
  };

  return (
    <div className="min-h-screen">
      <PageHeader 
        title="Mitmachen"
        subtitle="Werden Sie Teil unserer Mission für den Wiederaufbau Syriens"
      />

      {/* Current Impact Stats */}
      <section className="py-16 shamsy-bg-gradient">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-light text-foreground mb-4">
              Gemeinsam bereits erreicht
            </h2>
            <p className="text-lg text-muted-foreground">
              Dank unserer Unterstützer konnten wir schon viel bewegen
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <Card className="shamsy-card border-shamsy-primary/20 text-center">
              <CardContent className="p-6">
                <Euro className="w-12 h-12 text-shamsy-primary mx-auto mb-4" />
                <div className="text-3xl font-bold text-shamsy-primary mb-2">
                  {currentStats.totalDonated}
                </div>
                <div className="text-sm text-muted-foreground">Spendengelder mit unseren Partnern eingesetzt</div>
              </CardContent>
            </Card>

            <Card className="shamsy-card border-shamsy-primary/20 text-center">
              <CardContent className="p-6">
                <UserPlus className="w-12 h-12 text-shamsy-primary mx-auto mb-4" />
                <div className="text-3xl font-bold text-shamsy-primary mb-2">
                  {currentStats.activeMembers}
                </div>
                <div className="text-sm text-muted-foreground">Aktive Mitglieder</div>
              </CardContent>
            </Card>

            <Card className="shamsy-card border-shamsy-primary/20 text-center">
              <CardContent className="p-6">
                <Handshake className="w-12 h-12 text-shamsy-primary mx-auto mb-4" />
                <div className="text-3xl font-bold text-shamsy-primary mb-2">
                  {currentStats.volunteers}
                </div>
                <div className="text-sm text-muted-foreground">Ehrenamtliche Helfer</div>
              </CardContent>
            </Card>

            <Card className="shamsy-card border-shamsy-primary/20 text-center">
              <CardContent className="p-6">
                <Gift className="w-12 h-12 text-shamsy-primary mx-auto mb-4" />
                <div className="text-3xl font-bold text-shamsy-primary mb-2">
                  {currentStats.partnerships}
                </div>
                <div className="text-sm text-muted-foreground">Unternehmenspartnerschaften</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Support Options */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-foreground mb-6">
              Wie Sie helfen können
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Wählen Sie die Art der Unterstützung, die am besten zu Ihnen passt
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {supportOptions.map((option) => {
              const IconComponent = option.icon;
              return (
                <Card key={option.id} className="shamsy-card border-shamsy-primary/20 hover:shadow-xl shamsy-transition group">
                  <CardContent className="p-8 h-full flex flex-col">
                    <div className="flex items-start gap-4 mb-6">
                      <div className={`w-16 h-16 bg-${option.color}/10 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 shamsy-transition`}>
                        <IconComponent className={`w-8 h-8 text-${option.color}`} />
                      </div>
                      <div>
                        <h3 className="text-2xl font-semibold text-foreground mb-2 group-hover:text-shamsy-primary shamsy-transition">
                          {option.title}
                        </h3>
                        <p className="text-shamsy-primary font-medium">
                          {option.subtitle}
                        </p>
                      </div>
                    </div>

                    <p className="text-muted-foreground mb-6 leading-relaxed flex-grow">
                      {option.description}
                    </p>

                    <div className="mb-8">
                      <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                        <Star className="w-5 h-5 text-shamsy-primary" />
                        Ihre Vorteile:
                      </h4>
                      <ul className="space-y-2">
                        {option.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-shamsy-primary mt-0.5 flex-shrink-0" />
                            <span className="text-muted-foreground">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button 
                      asChild 
                      className="bg-shamsy-primary hover:bg-shamsy-dark shamsy-transition group-hover:shamsy-shadow-green w-full"
                    >
                      {option.ctaLink.startsWith('mailto:') ? (
                        <a href={option.ctaLink} className="flex items-center justify-center gap-2 w-full">
                          <span className="truncate">{option.cta}</span>
                          <ArrowRight className="w-4 h-4 flex-shrink-0" />
                        </a>
                      ) : option.id === 2 ? (
                        <a href="mailto:info.shamsyr@gmail.com?subject=Vereinsmitgliedschaft&body=Hallo, ich interessiere mich für eine Vereinsmitgliedschaft bei ShamSy." className="flex items-center justify-center gap-2 w-full">
                          <span className="truncate">{option.cta}</span>
                          <ArrowRight className="w-4 h-4 flex-shrink-0" />
                        </a>
                      ) : option.id === 4 ? (
                        <a href="mailto:info.shamsyr@gmail.com?subject=Unternehmenspartnerschaft&body=Hallo, wir interessieren uns für eine Unternehmenspartnerschaft mit ShamSy." className="flex items-center justify-center gap-2 w-full">
                          <span className="truncate">{option.cta}</span>
                          <ArrowRight className="w-4 h-4 flex-shrink-0" />
                        </a>
                      ) : (
                        <Link to={option.ctaLink} className="flex items-center justify-center gap-2 w-full">
                          <span className="truncate">{option.cta}</span>
                          <ArrowRight className="w-4 h-4 flex-shrink-0" />
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
              
              <blockquote className="text-2xl md:text-3xl font-light italic text-foreground mb-8 leading-relaxed">
                "Ich bin mit ShamSy nach Syrien geflogen und habe gesehen, was für eine Wirkung ihre Unterstützung dort hat. Ich habe auch gesehen, was für Arbeit noch zu tun ist und wie viele Lebensgrundlagen fehlen."
              </blockquote>
              
              <cite className="text-lg font-semibold text-shamsy-primary">
                — Marie W., Spenderin seit 2018
              </cite>
            </CardContent>
            <CardContent className="p-12">
              <div className="w-16 h-16 bg-shamsy-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Megaphone className="w-8 h-8 text-shamsy-primary" />
              </div>
              
              <blockquote className="text-2xl md:text-3xl font-light italic text-foreground mb-8 leading-relaxed">
                "Ich freue mich aus Deutschland helfen zu können. V.a. mit ShamSy, was relevante Projekte vor Ort verwirklichen kann. Durch die Transparenz und die regelmäßigen Updates weiß ich sicher, wie mein Beitrag konkret hilft."
              </blockquote>
              
              <cite className="text-lg font-semibold text-shamsy-primary">
                — Marie W., Spenderin seit 2018
              </cite>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-foreground mb-6">
              Häufige Fragen
            </h2>
            <p className="text-xl text-muted-foreground">
              Antworten auf die wichtigsten Fragen zum Mitmachen
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: "Wie transparent ist ShamSy mit Spendengeldern?",
                answer: "Wir veröffentlichen detaillierte Projektberichte und Finanzberichte. Jeder Euro wird dokumentiert und Sie erhalten regelmäßige Updates über die Verwendung Ihrer Spende."
              },
              {
                question: "Kann ich als Nicht-Syrer/Deutsche auch Mitglied werden?",
                answer: "Selbstverständlich! ShamSy ist offen für alle Menschen, die unsere Mission unterstützen möchten, unabhängig von Nationalität oder Herkunft."
              },
              {
                question: "Wie viel Zeit muss ich als Ehrenamtlicher investieren?",
                answer: "Das bestimmen Sie selbst! Wir haben Aufgaben von 2-3 Stunden pro Monat bis hin zu größeren Projekten. Jede Hilfe ist wertvoll."
              },
              {
                question: "Sind Sachspenden möglich?",
                answer: "Ja, gerne! Besonders medizinisches Equipment, Schulmaterialien oder Werkzeuge können wir gut gebrauchen. Kontaktieren Sie uns für Details."
              }
            ].map((faq, index) => (
              <Card key={index} className="shamsy-card border-shamsy-primary/20">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
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
 
export default Mitmachen;