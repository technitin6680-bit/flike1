import { useState, useEffect } from "react";
import { useCreateOrder } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowRight, ArrowLeft, CheckCircle2, Loader2, Monitor, ShoppingCart, Briefcase, FileCode2, LayoutTemplate, Layers } from "lucide-react";
import { Link } from "wouter";

const WEBSITE_TYPES = [
  { id: "landing_page", label: "Landing Page", price: 499, icon: LayoutTemplate, desc: "High-converting single page" },
  { id: "business_website", label: "Business Website", price: 999, icon: Briefcase, desc: "Corporate multi-page site" },
  { id: "ecommerce", label: "E-Commerce Store", price: 2499, icon: ShoppingCart, desc: "Full online store" },
  { id: "portfolio", label: "Portfolio Website", price: 699, icon: Layers, desc: "Creative showcase" },
  { id: "saas", label: "SaaS Application", price: 4999, icon: Monitor, desc: "Subscription platform" },
  { id: "custom_web_app", label: "Custom Web Application", price: 3499, icon: FileCode2, desc: "Bespoke engineering" },
];

const FEATURES = [
  { id: "custom_ui_ux", label: "Custom UI/UX", price: 299 },
  { id: "blog_cms", label: "Blog/CMS", price: 199 },
  { id: "seo_optimization", label: "SEO Optimization", price: 149 },
  { id: "payment_gateway", label: "Payment Gateway", price: 399 },
  { id: "user_auth", label: "User Authentication", price: 249 },
  { id: "admin_dashboard", label: "Admin Dashboard", price: 349 },
  { id: "multi_language", label: "Multi-language", price: 199 },
  { id: "analytics", label: "Analytics", price: 149 },
  { id: "live_chat", label: "Live Chat", price: 99 },
  { id: "ai_chatbot", label: "AI Chatbot", price: 499 },
  { id: "api_integration", label: "API Integration", price: 299 },
];

export default function OrderBuilder() {
  const [step, setStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);
  const createOrder = useCreateOrder();
  
  const [formData, setFormData] = useState({
    websiteType: "business_website",
    projectName: "",
    projectDescription: "",
    selectedFeatures: [] as string[],
    name: "",
    email: "",
    phone: "",
    company: "",
    country: "",
  });

  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const handleNext = () => {
    const errors: Record<string, string> = {};
    if (step === 1) {
      if (!formData.projectName.trim()) errors.projectName = "Project name is required";
      if (!formData.projectDescription.trim()) errors.projectDescription = "Project description is required";
    } else if (step === 3) {
      if (!formData.name.trim()) errors.name = "Name is required";
      if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) errors.email = "Valid email is required";
      if (!formData.phone.trim()) errors.phone = "Phone is required";
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setValidationErrors({});
    setStep(s => s + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setStep(s => s - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleFeature = (featureId: string) => {
    setFormData(prev => {
      const isSelected = prev.selectedFeatures.includes(featureId);
      if (isSelected) {
        return { ...prev, selectedFeatures: prev.selectedFeatures.filter(id => id !== featureId) };
      } else {
        return { ...prev, selectedFeatures: [...prev.selectedFeatures, featureId] };
      }
    });
  };

  const calculateEstimate = () => {
    const basePrice = WEBSITE_TYPES.find(t => t.id === formData.websiteType)?.price || 0;
    const featuresPrice = formData.selectedFeatures.reduce((total, featureId) => {
      const feature = FEATURES.find(f => f.id === featureId);
      return total + (feature?.price || 0);
    }, 0);
    
    const deliveryWeeks = Math.min(12, 2 + Math.floor(formData.selectedFeatures.length / 2));
    
    return {
      price: basePrice + featuresPrice,
      deliveryTime: `${deliveryWeeks} weeks`
    };
  };

  const handleSubmit = () => {
    const estimate = calculateEstimate();
    createOrder.mutate({
      data: {
        ...formData,
        estimatedPrice: estimate.price
      }
    }, {
      onSuccess: () => {
        setIsSuccess(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    });
  };

  if (isSuccess) {
    return (
      <div className="py-24 px-4 bg-background min-h-[80vh] flex items-center justify-center">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="mx-auto w-24 h-24 bg-primary/20 text-primary rounded-full flex items-center justify-center mb-8">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <h1 className="text-4xl font-bold">Order Received!</h1>
          <p className="text-xl text-muted-foreground">
            Thank you for choosing Flike. We've received your project details and will be in touch within 24 hours to discuss the next steps.
          </p>
          <div className="pt-8">
            <Link href="/" className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90">
              Return Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const estimate = calculateEstimate();

  return (
    <div className="py-12 md:py-24 px-4 bg-background min-h-screen">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-12">
          <div className="flex items-center justify-between relative mb-8">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-border/50 -z-10 rounded-full"></div>
            <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary -z-10 rounded-full transition-all duration-500" style={{ width: `${((step - 1) / 3) * 100}%` }}></div>
            
            {[1, 2, 3, 4].map(i => (
              <div key={i} className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors border-2 ${step >= i ? 'bg-primary border-primary text-primary-foreground' : 'bg-card border-border text-muted-foreground'}`}>
                {step > i ? <CheckCircle2 className="w-5 h-5" /> : i}
              </div>
            ))}
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight mb-2">Project Builder</h1>
            <p className="text-muted-foreground">
              {step === 1 && "Tell us about the project you want to build."}
              {step === 2 && "Select the features you need."}
              {step === 3 && "Tell us a bit about yourself."}
              {step === 4 && "Review your project details and estimate."}
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-border/50 bg-card p-6 md:p-10 shadow-sm min-h-[400px]">
          {step === 1 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div>
                <h3 className="text-xl font-semibold mb-4">Website Type</h3>
                <RadioGroup 
                  value={formData.websiteType} 
                  onValueChange={(val) => setFormData(p => ({ ...p, websiteType: val }))}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                >
                  {WEBSITE_TYPES.map((type) => (
                    <div key={type.id}>
                      <RadioGroupItem value={type.id} id={type.id} className="peer sr-only" />
                      <Label
                        htmlFor={type.id}
                        className="flex flex-col items-center justify-between rounded-xl border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer transition-all"
                      >
                        <type.icon className="mb-3 h-8 w-8 text-primary" />
                        <span className="font-semibold">{type.label}</span>
                        <span className="text-xs text-muted-foreground mt-1 text-center">{type.desc}</span>
                        <span className="text-sm font-bold text-primary mt-2">Starts at ${type.price}</span>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="projectName" className="text-base">Project Name</Label>
                  <Input 
                    id="projectName" 
                    value={formData.projectName} 
                    onChange={e => setFormData(p => ({ ...p, projectName: e.target.value }))}
                    placeholder="e.g. Acme Corp Redesign" 
                    className="mt-2"
                  />
                  {validationErrors.projectName && <p className="text-sm text-destructive mt-1">{validationErrors.projectName}</p>}
                </div>
                <div>
                  <Label htmlFor="projectDescription" className="text-base">Project Description</Label>
                  <Textarea 
                    id="projectDescription" 
                    value={formData.projectDescription} 
                    onChange={e => setFormData(p => ({ ...p, projectDescription: e.target.value }))}
                    placeholder="Briefly describe what you want to achieve..." 
                    className="mt-2 min-h-[120px] resize-none"
                  />
                  {validationErrors.projectDescription && <p className="text-sm text-destructive mt-1">{validationErrors.projectDescription}</p>}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {FEATURES.map((feature) => (
                  <div key={feature.id} className={`flex items-center space-x-3 p-4 rounded-xl border transition-colors cursor-pointer ${formData.selectedFeatures.includes(feature.id) ? 'border-primary bg-primary/5' : 'border-border/50 hover:bg-accent'}`} onClick={() => toggleFeature(feature.id)}>
                    <Checkbox 
                      id={feature.id} 
                      checked={formData.selectedFeatures.includes(feature.id)}
                      onCheckedChange={() => toggleFeature(feature.id)}
                      className="pointer-events-none"
                    />
                    <div className="flex-1 flex justify-between items-center">
                      <Label htmlFor={feature.id} className="font-medium cursor-pointer pointer-events-none">{feature.label}</Label>
                      <span className="text-sm font-semibold text-muted-foreground">+${feature.price}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 flex items-center justify-between">
                <span className="font-semibold text-primary">Running Estimate</span>
                <span className="text-xl font-bold">${estimate.price}</span>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    value={formData.name} 
                    onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                    placeholder="John Doe" 
                    className="mt-2"
                  />
                  {validationErrors.name && <p className="text-sm text-destructive mt-1">{validationErrors.name}</p>}
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email" 
                    type="email"
                    value={formData.email} 
                    onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                    placeholder="john@example.com" 
                    className="mt-2"
                  />
                  {validationErrors.email && <p className="text-sm text-destructive mt-1">{validationErrors.email}</p>}
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone" 
                    value={formData.phone} 
                    onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))}
                    placeholder="+1 (555) 000-0000" 
                    className="mt-2"
                  />
                  {validationErrors.phone && <p className="text-sm text-destructive mt-1">{validationErrors.phone}</p>}
                </div>
                <div>
                  <Label htmlFor="company">Company (Optional)</Label>
                  <Input 
                    id="company" 
                    value={formData.company} 
                    onChange={e => setFormData(p => ({ ...p, company: e.target.value }))}
                    placeholder="Acme Corp" 
                    className="mt-2"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="country">Country</Label>
                  <Input 
                    id="country" 
                    value={formData.country} 
                    onChange={e => setFormData(p => ({ ...p, country: e.target.value }))}
                    placeholder="United States" 
                    className="mt-2"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Project Details</h3>
                    <p className="font-medium text-lg">{formData.projectName}</p>
                    <p className="text-muted-foreground text-sm mt-1">{WEBSITE_TYPES.find(t => t.id === formData.websiteType)?.label}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Selected Features</h3>
                    <ul className="space-y-1">
                      {formData.selectedFeatures.length === 0 ? (
                        <li className="text-sm text-muted-foreground italic">No extra features selected</li>
                      ) : (
                        formData.selectedFeatures.map(fId => {
                          const feature = FEATURES.find(f => f.id === fId);
                          return (
                            <li key={fId} className="text-sm flex justify-between">
                              <span>{feature?.label}</span>
                              <span className="text-muted-foreground">+${feature?.price}</span>
                            </li>
                          );
                        })
                      )}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Client Details</h3>
                    <p className="text-sm">{formData.name}</p>
                    <p className="text-sm text-muted-foreground">{formData.email}</p>
                    {formData.company && <p className="text-sm text-muted-foreground">{formData.company}</p>}
                  </div>
                </div>

                <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold mb-6">Investment Summary</h3>
                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between items-center pb-4 border-b border-border/50">
                        <span className="text-muted-foreground">Base Price</span>
                        <span className="font-semibold">${WEBSITE_TYPES.find(t => t.id === formData.websiteType)?.price}</span>
                      </div>
                      <div className="flex justify-between items-center pb-4 border-b border-border/50">
                        <span className="text-muted-foreground">Features Add-ons</span>
                        <span className="font-semibold">${estimate.price - (WEBSITE_TYPES.find(t => t.id === formData.websiteType)?.price || 0)}</span>
                      </div>
                      <div className="flex justify-between items-center pt-2">
                        <span className="text-lg font-bold">Total Estimate</span>
                        <span className="text-3xl font-bold text-primary">${estimate.price}</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-background/50 rounded-xl p-4 flex items-center justify-between mt-auto">
                    <span className="text-sm font-medium">Estimated Delivery:</span>
                    <span className="font-bold">{estimate.deliveryTime}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between mt-12 pt-6 border-t border-border/50">
            {step > 1 ? (
              <Button variant="outline" onClick={handleBack} className="gap-2">
                <ArrowLeft className="w-4 h-4" /> Back
              </Button>
            ) : <div></div>}
            
            {step < 4 ? (
              <Button onClick={handleNext} className="gap-2 px-8">
                Next <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button onClick={handleSubmit} disabled={createOrder.isPending} className="gap-2 px-8 shadow-[0_0_20px_rgba(124,58,237,0.4)]">
                {createOrder.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                {createOrder.isPending ? "Submitting..." : "Book My Project"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}