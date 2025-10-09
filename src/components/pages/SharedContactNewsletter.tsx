import { PageHeader } from "@/components/ui/page-header";
import ContactForm from "@/components/forms/ContactForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useContactContent } from "@/hooks/useContent";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";

const SharedContactNewsletter = () => {
  const contactContent = useContactContent();
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  // Icon mapping for contact info
  const iconMap: { [key: string]: any } = {
    Mail: Mail,
    Phone: Phone,
    MapPin: MapPin,
  };

  if (!contactContent) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-shamsy-primary"></div>
    </div>;
  }

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Erfolgreich angemeldet!",
      description: "Sie erhalten in Kürze eine Bestätigung per E-Mail.",
    });
    setEmail("");
  };

  document.documentElement.setAttribute('dir', contactContent.language === 'ar' ? 'rtl' : 'ltr');

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-shamsy-primary/5">
      <PageHeader 
        title={contactContent.title}
        subtitle={contactContent.subtitle}
      />

      <main className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">

          {/* Contact Form */}
          <Card className="shamsy-card">
            <CardContent>
              <ContactForm />
            </CardContent>
          </Card>

          {/* Newsletter Form */}
          <Card className="shamsy-card">
            <CardHeader>
              <CardTitle className="text-2xl text-shamsy-primary">
                Newsletter abonnieren
              </CardTitle>
              <p className="text-muted-foreground">
                Bleiben Sie über unsere Projekte und Erfolge informiert.
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleNewsletterSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="newsletter-email">E-Mail Adresse</Label>
                  <Input
                    id="newsletter-email"
                    type="email"
                    placeholder="ihre.email@beispiel.de"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-shamsy-primary hover:bg-shamsy-dark shamsy-transition"
                >
                  Newsletter abonnieren
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default SharedContactNewsletter;