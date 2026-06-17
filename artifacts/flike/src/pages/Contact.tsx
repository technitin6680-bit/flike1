import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  company: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export default function Contact() {
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    toast({
      title: "Message sent!",
      description: "We'll get back to you within 24 hours.",
    });
    form.reset();
  }

  return (
    <div className="py-24 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-6">
              Get in Touch
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Let's Build Something Great.</h1>
            <p className="text-xl text-muted-foreground mb-12">
              Ready to elevate your digital presence? Fill out the form and our team will be in touch shortly to discuss your project.
            </p>

            <div className="space-y-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20 text-primary">
                  <User className="h-6 w-6" />
                </div>
                <div className="ml-6">
                  <h3 className="text-lg font-medium mb-1">Founder</h3>
                  <p className="text-foreground font-semibold">Nitin Panchal</p>
                  <p className="text-muted-foreground text-sm">Founder &amp; CEO, Flike</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-foreground">
                  <Mail className="h-6 w-6" />
                </div>
                <div className="ml-6">
                  <h3 className="text-lg font-medium mb-1">Email Us</h3>
                  <p className="text-muted-foreground">technitin6680@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-foreground">
                  <Phone className="h-6 w-6" />
                </div>
                <div className="ml-6">
                  <h3 className="text-lg font-medium mb-1">Call Us</h3>
                  <p className="text-muted-foreground">+91 8053997794</p>
                  <p className="text-muted-foreground">Mon-Sat, 10am to 7pm IST</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-foreground">
                  <MapPin className="h-6 w-6" />
                </div>
                <div className="ml-6">
                  <h3 className="text-lg font-medium mb-1">Visit Us</h3>
                  <p className="text-muted-foreground">Jind, Haryana</p>
                  <p className="text-muted-foreground">India</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border/50 bg-card p-8 shadow-sm">
            <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} className="bg-background" />
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
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input placeholder="john@company.com" {...field} className="bg-background" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Acme Inc" {...field} className="bg-background" />
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
                      <FormLabel>Project Details</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell us about your project goals, timeline, and budget..." 
                          className="min-h-[150px] bg-background resize-none" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full h-12 text-base font-medium">Send Message</Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}