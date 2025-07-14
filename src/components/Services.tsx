import { Card, CardContent } from "@/components/ui/card";
import { Home, Building2, Sparkles, Droplets, Wrench, Leaf } from "lucide-react";

const services = [
  {
    icon: Home,
    title: "Residential Cleaning",
    description: "Complete home cleaning with eco-friendly products. Regular, deep cleaning, and move-in/out services.",
    features: ["Kitchen & Bathrooms", "Dusting & Vacuuming", "Window Cleaning", "Floor Care"]
  },
  {
    icon: Building2,
    title: "Commercial Cleaning",
    description: "Professional office and business cleaning services to maintain a healthy work environment.",
    features: ["Office Spaces", "Retail Stores", "Medical Facilities", "Post-Construction"]
  },
  {
    icon: Sparkles,
    title: "Deep Cleaning",
    description: "Intensive cleaning service for homes that need extra attention or seasonal maintenance.",
    features: ["Detailed Sanitization", "Appliance Cleaning", "Baseboard & Trim", "Light Fixtures"]
  },
  {
    icon: Droplets,
    title: "Carpet & Upholstery",
    description: "Professional cleaning and stain removal for carpets, rugs, and furniture using safe methods.",
    features: ["Steam Cleaning", "Stain Removal", "Odor Elimination", "Fabric Protection"]
  },
  {
    icon: Wrench,
    title: "Post-Construction",
    description: "Specialized cleaning after renovations or construction work to remove dust and debris.",
    features: ["Dust Removal", "Paint Cleanup", "Window Washing", "Final Touch-ups"]
  },
  {
    icon: Leaf,
    title: "Green Cleaning",
    description: "Environmentally conscious cleaning using only natural, non-toxic, biodegradable products.",
    features: ["Non-Toxic Products", "Child & Pet Safe", "Allergen-Free", "Sustainable Methods"]
  }
];

const Services = () => {
  return (
    <section id="services" className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Cleaning Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Professional, reliable, and eco-friendly cleaning solutions tailored to your needs
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <Card 
              key={service.title} 
              className="group hover:shadow-card transition-all duration-300 hover:-translate-y-2 border-0 shadow-elegant"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-primary-glow rounded-lg mr-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <service.icon className="h-6 w-6 text-primary group-hover:text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">{service.title}</h3>
                </div>
                
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {service.description}
                </p>
                
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 bg-success rounded-full mr-3"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;