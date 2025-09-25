import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Mail, Phone, MapPin, Heart, Users, Building, MessageCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useContactContent } from '@/hooks/useContent';

const contactSchema = z.object({
  name: z.string().min(2, 'Name muss mindestens 2 Zeichen haben'),
  email: z.string().email('Ungültige E-Mail-Adresse'),
  subject: z.string().min(5, 'Betreff muss mindestens 5 Zeichen haben'),
  message: z.string().min(10, 'Nachricht muss mindestens 10 Zeichen haben'),
});

type ContactFormData = z.infer<typeof contactSchema>;

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const content = useContactContent();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    try {
      // In a real implementation, you would send this to your backend
      console.log('Contact form submission:', data);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Nachricht gesendet!",
        description: content?.form.success || "Ihre Nachricht wurde gesendet. Wir melden uns bald bei Ihnen.",
      });
      
      form.reset();
    } catch (error) {
      toast({
        title: "Fehler",
        description: content?.form.error || "Es gab einen Fehler beim Senden. Bitte versuchen Sie es erneut.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!content) return null;

  const iconMap = {
    Mail,
    Phone,
    MapPin,
    Heart,
    Users,
    Building,
    MessageCircle,
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-shamsy-primary">{content.title}</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          {content.subtitle}
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Contact Form */}
        <div className="lg:col-span-2">
          <Card className="shamsy-card">
            <CardHeader>
              <CardTitle>Nachricht senden</CardTitle>
              <CardDescription>
                Füllen Sie das Formular aus und wir melden uns so schnell wie möglich bei Ihnen.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{content.form.name.label}</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder={content.form.name.placeholder}
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{content.form.email.label}</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder={content.form.email.placeholder}
                              type="email"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{content.form.subject.label}</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder={content.form.subject.placeholder}
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{content.form.message.label}</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder={content.form.message.placeholder}
                            rows={6}
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    className="w-full bg-shamsy-primary hover:bg-shamsy-dark shamsy-transition"
                    disabled={isSubmitting}
                    size="lg"
                  >
                    {isSubmitting ? "Wird gesendet..." : content.form.send}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        {/* Contact Info & Reasons */}
        <div className="space-y-6">
          {/* Contact Information */}
          <Card className="shamsy-card">
            <CardHeader>
              <CardTitle>{content.info.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {content.info.items.map((item, index) => {
                const IconComponent = iconMap[item.icon as keyof typeof iconMap];
                return (
                  <div key={index} className="flex items-start gap-3">
                    <div className="p-2 bg-shamsy-primary/10 rounded-lg">
                      <IconComponent className="w-4 h-4 text-shamsy-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-sm text-muted-foreground">
                        {item.label}
                      </p>
                      {item.link ? (
                        <a 
                          href={item.link}
                          className="text-shamsy-primary hover:text-shamsy-dark shamsy-transition"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="whitespace-pre-line">{item.value}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Contact Reasons */}
          <Card className="shamsy-card">
            <CardHeader>
              <CardTitle>Wobei können wir helfen?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {content.reasons.map((reason, index) => {
                const IconComponent = iconMap[reason.icon as keyof typeof iconMap];
                return (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-shamsy-primary/5 shamsy-transition">
                    <div className="p-2 bg-shamsy-primary/10 rounded-lg">
                      <IconComponent className="w-4 h-4 text-shamsy-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm mb-1">{reason.title}</h4>
                      <p className="text-xs text-muted-foreground">
                        {reason.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;