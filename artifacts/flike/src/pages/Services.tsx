import { Layers, Zap, Code2, Smartphone, LayoutDashboard, Database, Globe, Lightbulb } from "lucide-react";

export default function Services() {
  const services = [
    {
      title: "Landing Pages",
      icon: Lightbulb,
      description: "High-converting single page websites designed to capture leads and drive sales. Perfect for product launches, marketing campaigns, and events.",
      features: ["A/B Testing Ready", "Fast Load Times", "Lead Generation Forms", "Analytics Integration"]
    },
    {
      title: "Business Websites",
      icon: Globe,
      description: "Professional corporate websites that establish trust and authority in your industry. Fully responsive, SEO-optimized, and built to scale.",
      features: ["Custom Design", "CMS Integration", "SEO Optimization", "Responsive Layout"]
    },
    {
      title: "E-Commerce",
      icon: Zap,
      description: "Robust online stores with secure payment gateways, inventory management, and intuitive shopping experiences.",
      features: ["Secure Checkout", "Inventory Management", "Product Filtering", "Order Tracking"]
    },
    {
      title: "Portfolio",
      icon: Layers,
      description: "Creative showcases for agencies, freelancers, and artists. Highlight your best work with stunning galleries and case studies.",
      features: ["Dynamic Galleries", "Case Study Layouts", "Smooth Animations", "Fast Media Loading"]
    },
    {
      title: "Web Apps",
      icon: Code2,
      description: "Interactive web applications that solve complex business problems. Built with modern frameworks for native-like performance.",
      features: ["Progressive Web App (PWA)", "Offline Support", "Real-time Updates", "API Integration"]
    },
    {
      title: "SaaS Platforms",
      icon: Database,
      description: "Scalable Software as a Service products with multi-tenant architectures, subscription billing, and user management.",
      features: ["Multi-tenancy", "Subscription Billing", "User Roles & Permissions", "Analytics Dashboard"]
    },
    {
      title: "Admin Dashboards",
      icon: LayoutDashboard,
      description: "Internal tools and administrative interfaces to manage your business data efficiently with visual insights.",
      features: ["Data Visualization", "Data Export/Import", "Access Control", "Activity Logs"]
    },
    {
      title: "Custom Development",
      icon: Smartphone,
      description: "Bespoke digital solutions tailored exactly to your unique business requirements. If you can dream it, we can build it.",
      features: ["Architecture Design", "Legacy System Migration", "3rd Party Integrations", "Performance Optimization"]
    }
  ];

  return (
    <div className="py-24 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-6">
            Our Expertise
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Services That Scale</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We deliver end-to-end digital solutions that combine striking design with robust engineering.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, i) => (
            <div key={i} className="group rounded-2xl border border-border/50 bg-card p-8 transition-all hover:border-primary/50 hover:shadow-[0_0_30px_rgba(124,58,237,0.1)]">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <service.icon className="h-7 w-7" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {service.description}
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {service.features.map((feature, j) => (
                      <li key={j} className="flex items-center text-sm font-medium text-foreground/80">
                        <div className="mr-2 h-1.5 w-1.5 rounded-full bg-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}