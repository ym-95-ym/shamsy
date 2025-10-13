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
    <div className="min-h-screen bg-gradient-to-br from-background to-shamsy-primary/5 pt-24 md:pt-32">
      <main className="container mx-auto px-4 pb-16 md:pb-24">
        <div className="max-w-7xl mx-auto">
          <ContactForm />
        </div>
      </main>
    </div>
  );
};

export default SharedContactNewsletter;
