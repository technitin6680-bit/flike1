import { Check, ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function Pricing() {
  const packages = [
    {
      name: "Starter",
      description: "Perfect for small businesses needing a professional online presence.",
      price: "$999",
      features: [
        "Up to 5 Pages",
        "Responsive Mobile Design",
        "Basic SEO Optimization",
        "Contact Form Integration",
        "1 Month Support",
        "Standard Delivery (2 weeks)"
      ],
      popular: false
    },
    {
      name: "Business",
      description: "Comprehensive solution for growing companies ready to scale.",
      price: "$2,499",
      features: [
        "Up to 15 Pages",
        "Custom UI/UX Design",
        "CMS Integration",
        "Advanced SEO & Analytics",
        "Performance Optimization",
        "3 Months Support",
        "Standard Delivery (3-4 weeks)"
      ],
      popular: true
    },
    {
      name: "Premium",
      description: "Full-featured platform for e-commerce and complex workflows.",
      price: "$4,999",
      features: [
        "Unlimited Pages",
        "E-Commerce Integration",
        "User Authentication",
        "Custom Dashboard",
        "Payment Gateway Setup",
        "6 Months Support",
        "Priority Delivery (4-6 weeks)"
      ],
      popular: false
    },
    {
      name: "Custom Enterprise",
      description: "Bespoke engineering for SaaS and large-scale applications.",
      price: "Let's Talk",
      features: [
        "Microservices Architecture",
        "Complex API Integrations",
        "Scalable Infrastructure",
        "Dedicated Engineering Team",
        "SLA & 24/7 Support",
        "Custom Timeline"
      ],
      popular: false
    }
  ];

  return (
    <div className="py-24 px-4 bg-background">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-6">
            Transparent Pricing
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Invest in Excellence</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose a package that fits your goals, or build a custom order tailored precisely to your needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {packages.map((pkg, i) => (
            <div key={i} className={`relative flex flex-col rounded-2xl border ${pkg.popular ? 'border-primary shadow-[0_0_30px_rgba(124,58,237,0.15)] bg-card/80' : 'border-border/50 bg-card'} p-8`}>
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full">
                  Most Popular
                </div>
              )}
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                <p className="text-sm text-muted-foreground min-h-[40px]">{pkg.description}</p>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-bold tracking-tight">{pkg.price}</span>
                {pkg.price !== "Let's Talk" && <span className="text-muted-foreground ml-1">/project</span>}
              </div>
              <ul className="flex-1 space-y-4 mb-8">
                {pkg.features.map((feature, j) => (
                  <li key={j} className="flex items-start">
                    <Check className="h-5 w-5 text-primary shrink-0 mr-3" />
                    <span className="text-sm text-foreground/80">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link href={pkg.name === "Custom Enterprise" ? "/contact" : "/order"} className={`w-full inline-flex h-12 items-center justify-center rounded-md px-6 text-sm font-medium transition-colors ${pkg.popular ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'}`}>
                {pkg.name === "Custom Enterprise" ? "Contact Us" : "Start Project"}
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-20 rounded-2xl border border-primary/20 bg-primary/5 p-8 md:p-12 text-center max-w-4xl mx-auto flex flex-col items-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Need Something Specific?</h2>
          <p className="text-muted-foreground mb-8 max-w-xl">
            Use our interactive order builder to select exactly the features you need and get an instant estimate.
          </p>
          <Link href="/order" className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 gap-2">
            Open Order Builder <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}