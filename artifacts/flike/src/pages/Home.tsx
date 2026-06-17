import { Link } from "wouter";
import { ArrowRight, Code2, Layers, Zap, CheckCircle2, ChevronRight, Star, MessageSquare } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative w-full pt-32 pb-24 md:pt-48 md:pb-32 overflow-hidden flex flex-col items-center justify-center text-center px-4">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background"></div>
        <div className="z-10 max-w-4xl mx-auto flex flex-col items-center">
          <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            Premium Web Development Studio
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
            Digital Experiences That <br className="hidden md:block"/>
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Command Attention</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            We build fast, scalable, and visually stunning web applications for ambitious brands who refuse to settle for templates.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
            <Link href="/order" className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow-[0_0_20px_rgba(124,58,237,0.4)] transition-colors hover:bg-primary/90 hover:shadow-[0_0_30px_rgba(124,58,237,0.6)]">
              Start Your Project <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
            <Link href="/portfolio" className="inline-flex h-12 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground">
              View Our Work
            </Link>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-24 bg-background px-4 relative">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Crafted With Precision</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Specialized services designed to elevate your brand and drive results.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "SaaS Platforms", icon: Layers, desc: "Complex web applications with scalable architectures and premium UI/UX." },
              { title: "E-Commerce", icon: Zap, desc: "High-converting online stores built for speed and seamless checkout experiences." },
              { title: "Custom Development", icon: Code2, desc: "Bespoke digital solutions tailored exactly to your unique business requirements." }
            ].map((service, i) => (
              <div key={i} className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card p-8 transition-all hover:border-primary/50 hover:shadow-[0_0_30px_rgba(124,58,237,0.1)]">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <service.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-3 text-xl font-bold">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/services" className="text-primary hover:text-primary/80 font-medium inline-flex items-center transition-colors">
              View all services <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-card/30 px-4 border-y border-border/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Our Process</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">From concept to deployment, we follow a rigorous methodology to ensure excellence.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {[
              { num: "01", title: "Discovery", desc: "Understanding your goals and requirements." },
              { num: "02", title: "Design", desc: "Crafting the perfect UI/UX for your audience." },
              { num: "03", title: "Development", desc: "Building with scalable, modern technologies." },
              { num: "04", title: "Testing", desc: "Rigorous QA to ensure flawless performance." },
              { num: "05", title: "Launch", desc: "Deploying your product to the world." }
            ].map((step, i) => (
              <div key={i} className="relative flex flex-col items-center text-center p-6">
                <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xl font-bold mb-6 border border-primary/20 shadow-[0_0_15px_rgba(124,58,237,0.15)]">
                  {step.num}
                </div>
                {i < 4 && <div className="hidden md:block absolute top-14 left-[60%] w-full h-[1px] bg-gradient-to-r from-primary/30 to-transparent"></div>}
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-background px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Client Success</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Don't just take our word for it. See what our partners have to say.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Sarah Jenkins", role: "CEO, TechFlow", content: "Flike didn't just build a website; they transformed our entire digital presence. The new SaaS dashboard is lightning fast." },
              { name: "Marcus Chen", role: "Founder, Lumina", content: "Their attention to detail is unmatched. Our e-commerce conversion rates doubled within the first month of launching." },
              { name: "Elena Rodriguez", role: "Director, Studio V", content: "Working with Flike feels like having a world-class engineering team in-house. Transparent, fast, and incredibly talented." },
              { name: "David Kim", role: "CTO, FinFlow", content: "The complex data visualizations they built for our fintech app are flawless. They handled our API integrations perfectly." }
            ].map((testimonial, i) => (
              <div key={i} className={`p-8 rounded-2xl border border-border/50 bg-card flex flex-col ${i === 3 ? 'md:hidden lg:flex' : ''}`}>
                <div className="flex gap-1 text-primary mb-4">
                  {[1, 2, 3, 4, 5].map(star => <Star key={star} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-muted-foreground italic mb-6 flex-1">"{testimonial.content}"</p>
                <div>
                  <p className="font-bold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-card/50 px-4 border-t border-border/50">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Frequently Asked Questions</h2>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {[
              { q: "How long does a typical project take?", a: "Most business websites take 2-4 weeks. Complex SaaS applications or custom web apps can take 6-12 weeks depending on features." },
              { q: "Do you offer post-launch support?", a: "Yes, we offer maintenance packages to ensure your website stays fast, secure, and up-to-date. Every project comes with a standard 30-day warranty." },
              { q: "What technologies do you use?", a: "We specialize in modern stacks: React, Next.js, Node.js, and TypeScript, deployed on premium infrastructure like Vercel or AWS for maximum performance." },
              { q: "Can I upgrade my features later?", a: "Absolutely. We build with scalability in mind, meaning we can easily add new features, pages, or integrations as your business grows." },
              { q: "Do you help with SEO?", a: "Yes, all our builds include technical SEO best practices out of the box, ensuring fast load times, proper meta tags, and optimized structure." }
            ].map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-b border-border/50">
                <AccordionTrigger className="text-lg font-medium hover:text-primary transition-colors">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/10"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="container mx-auto max-w-4xl relative z-10 text-center">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Ready to scale your business?</h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Stop losing customers to slow, outdated websites. Let's build an experience that converts.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/order" className="inline-flex h-14 items-center justify-center rounded-md bg-primary px-10 text-base font-medium text-primary-foreground shadow-[0_0_30px_rgba(124,58,237,0.4)] transition-transform hover:scale-105">
              Start Your Project Now
            </Link>
            <Link href="/contact" className="inline-flex h-14 items-center justify-center rounded-md border-2 border-primary/50 bg-background/50 backdrop-blur-sm px-10 text-base font-medium shadow-sm transition-colors hover:bg-primary/20 hover:text-foreground">
              Contact Sales
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}