import { useListPortfolio } from "@workspace/api-client-react";
import { ArrowUpRight, Loader2, ExternalLink } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Portfolio() {
  const { data: portfolioResponse, isLoading } = useListPortfolio({ query: { queryKey: ["portfolio"] } });

  const dummyPortfolio = [
    { id: 1, title: "Nexus SaaS Dashboard", description: "A high-performance analytics dashboard for marketing teams with real-time data sync.", category: "SaaS Platform", image: "/portfolio/saas.png", technologies: ["React", "TypeScript", "Tailwind CSS", "Recharts"] },
    { id: 2, title: "Lumina Luxury E-Commerce", description: "Bespoke online shopping experience with immersive 3D product previews and ultra-fast checkout.", category: "E-Commerce", image: "/portfolio/ecommerce.png", technologies: ["Next.js", "Stripe", "Framer Motion", "Prisma"] },
    { id: 3, title: "Studio V Creative Agency", description: "Award-winning portfolio site featuring webGL animations and custom scroll interactions.", category: "Web App", image: "/portfolio/agency.png", technologies: ["Three.js", "GSAP", "React", "Node.js"] },
    { id: 4, title: "FinFlow Mobile Dashboard", description: "Secure, real-time financial tracking application with complex data visualization.", category: "Admin Dashboard", image: "/portfolio/fintech.png", technologies: ["React Native", "GraphQL", "PostgreSQL", "Tailwind"] },
    { id: 5, title: "Aura Real Estate", description: "Premium property listing platform with advanced map integration and virtual tours.", category: "Business Website", image: "/portfolio/realestate.png", technologies: ["Next.js", "Mapbox", "Supabase", "Radix UI"] },
    { id: 6, title: "Vitality Health Tracker", description: "Personalized fitness dashboard that aggregates data from multiple wearables.", category: "SaaS Platform", image: "/portfolio/health.png", technologies: ["React", "Express", "MongoDB", "Chart.js"] }
  ];

  const items = portfolioResponse?.items || dummyPortfolio;

  return (
    <div className="py-24 px-4 bg-background">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-6">
            Selected Works
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Digital Masterpieces</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A curated selection of our recent projects. We take pride in building scalable, high-performing applications with exceptional design.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="flex flex-col gap-4">
                <Skeleton className="h-[400px] w-full rounded-2xl" />
                <Skeleton className="h-8 w-2/3" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {items.map((item) => (
              <div key={item.id} className="group flex flex-col gap-6">
                <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-card aspect-[4/3]">
                  <img src={item.image} alt={item.title} className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
                    <a href={item.demoUrl || "#"} className="inline-flex h-10 items-center justify-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 gap-2">
                      View Live Demo <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-2xl font-bold">{item.title}</h3>
                    <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-md">{item.category}</span>
                  </div>
                  <p className="text-muted-foreground mb-4 line-clamp-2">{item.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {item.technologies.map((tech: string, i: number) => (
                      <span key={i} className="text-xs font-medium text-foreground/70 bg-secondary px-2 py-1 rounded-md">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}