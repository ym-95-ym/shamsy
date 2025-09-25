import { useState, useEffect } from "react";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Link, useSearchParams } from "react-router-dom";
import { 
  Heart, 
  CreditCard, 
  Banknote, 
  Shield, 
  CheckCircle, 
  Gift,
  Star,
  Target,
  Users,
  Euro,
  Smartphone,
  Building,
  FileText,
  Award,
  ExternalLink,
  Loader2
} from "lucide-react";
import { loadProjects, Project } from "@/lib/projectManager";
import { useDonationsContent } from "@/hooks/useContent";
import { toast } from "sonner";

// Stripe Publishable Key - Replace with your actual key
const STRIPE_PUBLISHABLE_KEY = "pk_test_51SBEOBHF4Z0Mcr4wdgPvmOsv74mrnhw2Ur75ZmtQFelitMffNOw60qxYSm1XSVneWkLtGDrzMc2RP8ZwRp5oRwDQ00vAAR17TB"; // TODO: Replace with your Stripe publishable key

const SharedDonations = () => {
  const content = useDonationsContent();
  const [searchParams] = useSearchParams();
  const [selectedAmount, setSelectedAmount] = useState<number | null>(50);
  const [customAmount, setCustomAmount] = useState("");
  const [donationType, setDonationType] = useState<"single" | "monthly">("single");
  const [selectedProject, setSelectedProject] = useState("general");
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingPayment, setProcessingPayment] = useState(false);

  const quickAmounts = [5, 10, 25, 50, 100, 250, 500, 1000];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const loadedProjects = await loadProjects();
        // Add the "general" option at the beginning
        const generalProject = {
          id: "general",
          category: content?.projectSelection.general.title || "General",
          title: content?.projectSelection.general.title || "Where most needed",
          description: content?.projectSelection.general.description || "Support us in deploying funds where they are most urgently needed.",
          type: "humanitarian" as const,
          goal: 0,
          raised: 0,
          progress: 0,
          icon: Heart,
          image: ""
        };
        setProjects([generalProject, ...loadedProjects]);
      } catch (error) {
        console.error('Error loading projects:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProjects();
  }, [content]);

  useEffect(() => {
    if (content?.language) {
      document.documentElement.dir = content.language === 'ar' ? 'rtl' : 'ltr';
    }
  }, [content?.language]);

  // Check for success/cancel params from Stripe
  useEffect(() => {
    const success = searchParams.get('success');
    const canceled = searchParams.get('canceled');
    const amount = searchParams.get('amount');
    const type = searchParams.get('type');

    if (success === 'true') {
      toast.success(
        content?.language === 'de' 
          ? `Vielen Dank für Ihre ${type === 'monthly' ? 'monatliche' : 'einmalige'} Spende von €${amount}!`
          : content?.language === 'en'
          ? `Thank you for your ${type === 'monthly' ? 'monthly' : 'one-time'} donation of €${amount}!`
          : `شكراً لك على تبرعك ${type === 'monthly' ? 'الشهري' : 'لمرة واحدة'} بمبلغ €${amount}!`
      );
      // Clean up URL
      window.history.replaceState({}, '', window.location.pathname);
    } else if (canceled === 'true') {
      toast.error(
        content?.language === 'de' 
          ? 'Spende wurde abgebrochen.'
          : content?.language === 'en'
          ? 'Donation was canceled.'
          : 'تم إلغاء التبرع.'
      );
      // Clean up URL
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, [searchParams, content]);

  if (!content || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-shamsy-primary">Loading...</div>
      </div>
    );
  }

  const donationProjects = projects.map(p => ({
    id: p.id,
    name: p.title,
    description: p.description,
    progress: p.progress,
    goal: p.goal,
    raised: p.raised
  }));

  const getCurrentAmount = () => {
    if (customAmount) return parseFloat(customAmount) || 0;
    return selectedAmount || 0;
  };

  const getImpactText = (amount: number) => {
    if (amount >= 1000) return content.amount.impacts["1000"].replace('{count}', Math.floor(amount / 50).toString());
    if (amount >= 500) return content.amount.impacts["500"].replace('{count}', Math.floor(amount / 25).toString());
    if (amount >= 100) return content.amount.impacts["100"].replace('{count}', Math.floor(amount / 20).toString());
    if (amount >= 50) return content.amount.impacts["50"];
    if (amount >= 25) return content.amount.impacts["25"];
    return content.amount.impacts.default;
  };

  const handleDonateClick = async () => {
    const amount = getCurrentAmount();
    if (amount <= 0) {
      toast.error(
        content?.language === 'de' 
          ? 'Bitte wählen Sie einen Spendenbetrag.'
          : content?.language === 'en'
          ? 'Please select a donation amount.'
          : 'يرجى تحديد مبلغ التبرع.'
      );
      return;
    }

    if (!STRIPE_PUBLISHABLE_KEY || STRIPE_PUBLISHABLE_KEY === "pk_test_...") {
      toast.error(
        content?.language === 'de' 
          ? 'Stripe ist noch nicht konfiguriert. Bitte Stripe Publishable Key hinzufügen.'
          : content?.language === 'en'
          ? 'Stripe not configured. Please add Stripe Publishable Key.'
          : 'Stripe غير مكوّن. يرجى إضافة مفتاح Stripe.'
      );
      return;
    }

    setProcessingPayment(true);

    try {
      // Get selected project name
      const selectedProjectData = projects.find(p => p.id === selectedProject);
      const projectName = selectedProjectData?.title || "General";
      
      // Dynamically import Stripe
      const { loadStripe } = await import('@stripe/stripe-js');
      const stripe = await loadStripe(STRIPE_PUBLISHABLE_KEY);

      if (!stripe) {
        throw new Error('Failed to load Stripe');
      }

      const mode = donationType === "monthly" ? "subscription" : "payment";
      const description = donationType === "monthly" 
        ? "Monatliche Spende für ShamSy e.V." 
        : "Einmalige Spende für ShamSy e.V.";

      // Create line items for Stripe
      const lineItems = [{
        price_data: {
          currency: 'eur',
          product_data: {
            name: `Spende - ${projectName}`,
            description: description,
          },
          unit_amount: Math.round(amount * 100), // Convert to cents
          ...(donationType === "monthly" && {
            recurring: {
              interval: 'month',
            },
          }),
        },
        quantity: 1,
      }];

      // Redirect to Stripe Checkout
      const { error } = await stripe.redirectToCheckout({
        mode,
        lineItems,
        successUrl: `${window.location.origin}/spenden?success=true&amount=${amount}&type=${donationType}`,
        cancelUrl: `${window.location.origin}/spenden?canceled=true`,
      });

      if (error) {
        throw new Error(error.message);
      }
      
    } catch (error) {
      console.error('Payment error:', error);
      toast.error(
        content?.language === 'de' 
          ? 'Fehler beim Erstellen der Zahlung. Bitte versuchen Sie es erneut.'
          : content?.language === 'en'
          ? 'Error creating payment. Please try again.'
          : 'خطأ في إنشاء الدفع. يرجى المحاولة مرة أخرى.'
      );
    } finally {
      setProcessingPayment(false);
    }
  };

  const isRTL = content.language === 'ar';
  const projectsRoute = content.language === 'de' ? '/projekte' : `/${content.language}/projects`;

  return (
    <div className="min-h-screen" dir={isRTL ? 'rtl' : 'ltr'}>
      <PageHeader 
        title={content.header.title}
        subtitle={content.header.subtitle}
      />

      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Main Donation Form */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Donation Type */}
              <Card className="shamsy-card border-shamsy-primary/20">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
                    <Heart className="w-6 h-6 text-shamsy-primary" />
                    {content.donationType.title}
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div
                      className={`p-6 rounded-lg border-2 cursor-pointer shamsy-transition ${
                        donationType === 'single'
                          ? 'border-shamsy-primary bg-shamsy-primary/5'
                          : 'border-gray-200 hover:border-shamsy-primary/50'
                      }`}
                      onClick={() => setDonationType('single')}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <input
                          type="radio"
                          name="donationType"
                          checked={donationType === 'single'}
                          onChange={() => setDonationType('single')}
                          className="text-shamsy-primary"
                        />
                        <Gift className="w-6 h-6 text-shamsy-primary" />
                        <h3 className="font-semibold text-foreground">{content.donationType.single.title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {content.donationType.single.description}
                      </p>
                    </div>

                    <div
                      className={`p-6 rounded-lg border-2 cursor-pointer shamsy-transition ${
                        donationType === 'monthly'
                          ? 'border-shamsy-primary bg-shamsy-primary/5'
                          : 'border-gray-200 hover:border-shamsy-primary/50'
                      }`}
                      onClick={() => setDonationType('monthly')}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <input
                          type="radio"
                          name="donationType"
                          checked={donationType === 'monthly'}
                          onChange={() => setDonationType('monthly')}
                          className="text-shamsy-primary"
                        />
                        <Star className="w-6 h-6 text-shamsy-primary" />
                        <h3 className="font-semibold text-foreground">{content.donationType.monthly.title}</h3>
                        <Badge className="bg-shamsy-primary/20 text-shamsy-primary border-shamsy-primary/30">
                          {content.donationType.monthly.recommended}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {content.donationType.monthly.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Project Selection with Dropdowns */}
              <Card className="shamsy-card border-shamsy-primary/20">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
                    <Target className="w-6 h-6 text-shamsy-primary" />
                    {content.projectSelection.title}
                  </h2>
                  
                  <div className="space-y-4">
                    {/* Where most needed - Always visible */}
                    <div
                      className={`p-4 rounded-lg border-2 cursor-pointer shamsy-transition ${
                        selectedProject === "general"
                          ? 'border-shamsy-primary bg-shamsy-primary/5'
                          : 'border-gray-200 hover:border-shamsy-primary/50 hover:bg-shamsy-primary/2'
                      }`}
                      onClick={() => setSelectedProject("general")}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <input
                          type="radio"
                          name="project"
                          checked={selectedProject === "general"}
                          onChange={() => setSelectedProject("general")}
                          className="text-shamsy-primary"
                        />
                        <h3 className="font-semibold text-foreground">{content.projectSelection.general.title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {content.projectSelection.general.description}
                      </p>
                    </div>

                    {/* Humanitarian Projects - Dropdown */}
                    <details className="group">
                      <summary className="p-4 rounded-lg border-2 border-gray-200 hover:border-shamsy-primary/50 cursor-pointer shamsy-transition list-none">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-foreground break-words">{content.projectSelection.humanitarian}</h3>
                          <span className="group-open:rotate-180 shamsy-transition text-shamsy-primary">⌄</span>
                        </div>
                      </summary>
                      <div className={`mt-2 space-y-2 ${isRTL ? 'pr-4' : 'pl-4'}`}>
                        {donationProjects.filter(p => p.id !== "general" && projects.find(proj => proj.id === p.id && proj.type === 'humanitarian')).map((project) => (
                          <div
                            key={project.id}
                            className={`p-3 rounded-lg border cursor-pointer shamsy-transition ${
                              selectedProject === project.id
                                ? 'border-shamsy-primary bg-shamsy-primary/5'
                                : 'border-gray-200 hover:border-shamsy-primary/50'
                            }`}
                            onClick={() => setSelectedProject(project.id)}
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <input
                                type="radio"
                                name="project"
                                checked={selectedProject === project.id}
                                onChange={() => setSelectedProject(project.id)}
                                className="text-shamsy-primary"
                              />
                              <h4 className="font-medium text-sm text-foreground break-words">{project.name}</h4>
                            </div>
                            <p className="text-xs text-muted-foreground break-words">
                              {project.description.length > 80 ? `${project.description.substring(0, 80)}...` : project.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </details>

                    {/* Major Projects - Dropdown */}
                    <details className="group">
                      <summary className="p-4 rounded-lg border-2 border-gray-200 hover:border-shamsy-primary/50 cursor-pointer shamsy-transition list-none">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-foreground break-words">{content.projectSelection.major}</h3>
                          <span className="group-open:rotate-180 shamsy-transition text-shamsy-primary">⌄</span>
                        </div>
                      </summary>
                      <div className={`mt-2 space-y-2 ${isRTL ? 'pr-4' : 'pl-4'}`}>
                        {donationProjects.filter(p => projects.find(proj => proj.id === p.id && proj.type === 'major')).map((project) => (
                          <div
                            key={project.id}
                            className={`p-3 rounded-lg border cursor-pointer shamsy-transition ${
                              selectedProject === project.id
                                ? 'border-shamsy-primary bg-shamsy-primary/5'
                                : 'border-gray-200 hover:border-shamsy-primary/50'
                            }`}
                            onClick={() => setSelectedProject(project.id)}
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <input
                                type="radio"
                                name="project"
                                checked={selectedProject === project.id}
                                onChange={() => setSelectedProject(project.id)}
                                className="text-shamsy-primary"
                              />
                              <h4 className="font-medium text-sm text-foreground break-words">{project.name}</h4>
                            </div>
                            <p className="text-xs text-muted-foreground mb-2 break-words">
                              {project.description.length > 80 ? `${project.description.substring(0, 80)}...` : project.description}
                            </p>
                            {project.goal > 0 && (
                              <>
                                <div className="flex justify-between text-xs">
                                  <span className="text-shamsy-primary font-medium">{project.progress}%</span>
                                  <span className="text-muted-foreground">€{project.raised.toLocaleString()} / €{project.goal.toLocaleString()}</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                                  <div 
                                    className="bg-gradient-to-r from-shamsy-primary to-shamsy-light h-1 rounded-full shamsy-transition"
                                    style={{ width: `${project.progress}%` }}
                                  />
                                </div>
                              </>
                            )}
                          </div>
                        ))}
                      </div>
                    </details>
                    
                    {/* Link to Projects Page */}
                    <div className="mt-4 p-4 bg-shamsy-primary/5 rounded-lg border border-shamsy-primary/20">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-shamsy-primary mb-1 break-words">{content.projectSelection.learnMore}</h4>
                          <p className="text-sm text-muted-foreground break-words">Detailed information about all current projects</p>
                        </div>
                        <Button asChild variant="outline" size="sm" className="border-shamsy-primary text-shamsy-primary hover:bg-shamsy-primary hover:text-white">
                          <Link to={projectsRoute} className="flex items-center gap-1">
                            <ExternalLink className="w-3 h-3" />
                            Projects
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Amount Selection */}
              <Card className="shamsy-card border-shamsy-primary/20">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
                    <Euro className="w-6 h-6 text-shamsy-primary" />
                    {content.amount.title}
                  </h2>
                  
                  {/* Quick Amount Buttons */}
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-6">
                    {quickAmounts.map((amount) => (
                      <Button
                        key={amount}
                        variant={selectedAmount === amount ? "default" : "outline"}
                        className={`h-12 ${
                          selectedAmount === amount
                            ? 'bg-shamsy-primary hover:bg-shamsy-dark'
                            : 'border-shamsy-primary/30 text-shamsy-primary hover:bg-shamsy-primary/10'
                        }`}
                        onClick={() => {
                          setSelectedAmount(amount);
                          setCustomAmount("");
                        }}
                      >
                        €{amount}
                      </Button>
                    ))}
                  </div>

                  {/* Custom Amount */}
                  <div className="space-y-2">
                    <Label htmlFor="custom-amount" className="text-foreground font-medium">
                      {content.amount.customLabel}
                    </Label>
                    <div className="relative">
                      <span className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 text-muted-foreground`}>
                        €
                      </span>
                      <Input
                        id="custom-amount"
                        type="number"
                        placeholder="0"
                        value={customAmount}
                        onChange={(e) => {
                          setCustomAmount(e.target.value);
                          setSelectedAmount(null);
                        }}
                        className={`${isRTL ? 'pr-8' : 'pl-8'} h-12 border-shamsy-primary/30 focus:border-shamsy-primary`}
                      />
                    </div>
                  </div>

                  {/* Impact Preview */}
                  {getCurrentAmount() > 0 && (
                    <div className="mt-6 p-4 bg-shamsy-primary/5 rounded-lg border border-shamsy-primary/20">
                      <h4 className="font-semibold text-shamsy-primary mb-2 flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        {content.amount.impactTitle}
                      </h4>
                      <p className="text-foreground">
                        {content.amount.impactPrefix.replace('{amount}', getCurrentAmount().toString())} <strong>{getImpactText(getCurrentAmount())}</strong>
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Payment Methods */}
              <Card className="shamsy-card border-shamsy-primary/20">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-2">
                    <CreditCard className="w-6 h-6 text-shamsy-primary" />
                    {content.payment.title}
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    {[
                      { id: "card", name: content.payment.methods.card, icon: CreditCard, available: true },
                      { id: "paypal", name: content.payment.methods.paypal, icon: Smartphone, available: true },
                      { id: "transfer", name: content.payment.methods.transfer, icon: Building, available: true }
                    ].map((method) => (
                      <div
                        key={method.id}
                        className={`p-4 rounded-lg border-2 text-center ${
                          method.available 
                            ? 'border-shamsy-primary/30 hover:border-shamsy-primary cursor-pointer shamsy-transition' 
                            : 'border-gray-200 opacity-50 cursor-not-allowed'
                        }`}
                      >
                        <method.icon className="w-8 h-8 mx-auto mb-2 text-shamsy-primary" />
                        <h3 className="font-semibold text-foreground mb-1">{method.name}</h3>
                        {method.available && <CheckCircle className="w-4 h-4 text-green-500 mx-auto" />}
                      </div>
                    ))}
                  </div>

                  <Button 
                    size="lg" 
                    onClick={handleDonateClick}
                    disabled={getCurrentAmount() === 0 || processingPayment}
                    className="w-full bg-shamsy-primary hover:bg-shamsy-dark shamsy-transition shamsy-shadow-green text-lg font-semibold py-6"
                  >
                    {processingPayment ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin mr-2" />
                        {content?.language === 'de' 
                          ? 'Weiterleitung...' 
                          : content?.language === 'en'
                          ? 'Redirecting...'
                          : 'إعادة توجيه...'}
                      </>
                    ) : (
                      `${content.payment.button} €${getCurrentAmount()}`
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Trust & Security */}
              <Card className="shamsy-card border-shamsy-primary/20">
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                    <Shield className="w-6 h-6 text-shamsy-primary" />
                    {content.trust.title}
                  </h3>
                  
                  <div className="space-y-6">
                    {content.trust.items.map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-shamsy-primary rounded-full mt-2 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-foreground mb-1">{item.title}</h4>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Impact */}
              <Card className="shamsy-card border-shamsy-primary/20">
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                    <Star className="w-6 h-6 text-shamsy-primary" />
                    {content.impact.title}
                  </h3>
                  
                  <div className="space-y-4">
                    {content.impact.items.map((item, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-shamsy-primary/5 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-shamsy-primary flex-shrink-0" />
                        <span className="text-sm text-foreground">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Contact */}
              <Card className="shamsy-card border-shamsy-primary/20">
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                    <FileText className="w-6 h-6 text-shamsy-primary" />
                    {content.contact.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-6 text-sm">
                    {content.contact.description}
                  </p>
                  
                  <Button 
                    asChild 
                    variant="outline" 
                    className="w-full border-shamsy-primary text-shamsy-primary hover:bg-shamsy-primary hover:text-white"
                  >
                    <Link to="mailto:info@shamsy.org">{content.contact.button}</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SharedDonations;