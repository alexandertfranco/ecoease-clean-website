import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Home, Building2, Sparkles, Droplets, Wrench, Leaf, Clock, DollarSign, Phone, CheckCircle } from "lucide-react";

const services = [
  {
    icon: Home,
    title: "Residential Cleaning",
    description: "Complete home cleaning with eco-friendly products. Perfect for busy families and professionals who want a spotless home.",
    features: ["Kitchen & Bathrooms", "Dusting & Vacuuming", "Window Cleaning", "Floor Care", "Laundry Folding", "Dishwashing"],
    pricing: "Starting at $80",
    duration: "2-4 hours",
    popular: false,
    category: "Home"
  },
  {
    icon: Building2,
    title: "Commercial Cleaning",
    description: "Professional office and business cleaning services to maintain a healthy, productive work environment for your team.",
    features: ["Office Spaces", "Retail Stores", "Medical Facilities", "Post-Construction", "Sanitization", "Trash Removal"],
    pricing: "Starting at $120",
    duration: "3-6 hours",
    popular: true,
    category: "Business"
  },
  {
    icon: Sparkles,
    title: "Deep Cleaning",
    description: "Intensive, thorough cleaning service for homes that need extra attention, seasonal maintenance, or special occasions.",
    features: ["Detailed Sanitization", "Appliance Cleaning", "Baseboard & Trim", "Light Fixtures", "Cabinet Interiors", "Oven & Fridge"],
    pricing: "Starting at $150",
    duration: "4-8 hours",
    popular: true,
    category: "Premium"
  },
  {
    icon: Droplets,
    title: "Carpet & Upholstery",
    description: "Professional cleaning and stain removal for carpets, rugs, and furniture using safe, effective methods.",
    features: ["Steam Cleaning", "Stain Removal", "Odor Elimination", "Fabric Protection", "Pet-Safe Treatment", "Quick Drying"],
    pricing: "Starting at $60",
    duration: "1-3 hours",
    popular: false,
    category: "Specialty"
  },
  {
    icon: Wrench,
    title: "Post-Construction",
    description: "Specialized cleaning after renovations or construction work to remove dust, debris, and get your space move-in ready.",
    features: ["Dust Removal", "Paint Cleanup", "Window Washing", "Final Touch-ups", "Debris Disposal", "Safety Cleanup"],
    pricing: "Starting at $200",
    duration: "4-12 hours",
    popular: false,
    category: "Specialty"
  },
  {
    icon: Leaf,
    title: "Green Cleaning",
    description: "100% environmentally conscious cleaning using only natural, non-toxic, biodegradable products safe for families and pets.",
    features: ["Non-Toxic Products", "Child & Pet Safe", "Allergen-Free", "Sustainable Methods", "Organic Solutions", "Zero Chemicals"],
    pricing: "Starting at $90",
    duration: "2-5 hours",
    popular: true,
    category: "Eco"
  }
];

const Services = () => {
  return (
    <section id="services" className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Professional Cleaning Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            From regular maintenance to deep cleaning, we offer comprehensive eco-friendly solutions 
            for homes and businesses. All services include a satisfaction guarantee.
          </p>
        </div>
        
        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
          {services.map((service, index) => (
            <Card 
              key={service.title} 
              className="group hover:shadow-glow transition-all duration-300 hover:-translate-y-2 border-0 shadow-elegant relative overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {service.popular && (
                <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground z-10">
                  Most Popular
                </Badge>
              )}
              
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="p-3 bg-primary-glow rounded-lg group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <service.icon className="h-6 w-6 text-primary group-hover:text-primary-foreground" />
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {service.category}
                  </Badge>
                </div>
                <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
              </CardHeader>
              
              <CardContent className="pt-0">
                <p className="text-muted-foreground mb-4 leading-relaxed text-sm">
                  {service.description}
                </p>
                
                {/* Pricing and Duration */}
                <div className="flex items-center justify-between mb-4 p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center text-sm">
                    <DollarSign className="h-4 w-4 text-primary mr-1" />
                    <span className="font-semibold text-foreground">{service.pricing}</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{service.duration}</span>
                  </div>
                </div>
                
                {/* Features List */}
                <div className="space-y-2 mb-6">
                  {service.features.slice(0, 4).map((feature, idx) => (
                    <div key={idx} className="flex items-center text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-success mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                  {service.features.length > 4 && (
                    <div className="text-xs text-primary font-medium">
                      +{service.features.length - 4} more included
                    </div>
                  )}
                </div>
                
                {/* Action Button */}
                <Button 
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors" 
                  variant="outline"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Get Quote
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Call to Action Section */}
        <div className="bg-card rounded-lg shadow-card p-8 text-center max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Need a Custom Cleaning Plan?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Every space is unique. Contact us for a personalized cleaning plan that fits your specific needs, 
            schedule, and budget. Free consultations available.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="group">
              <Phone className="w-5 h-5 mr-2" />
              Call (555) 123-4567
            </Button>
            <Button variant="outline" size="lg">
              Schedule Free Consultation
            </Button>
          </div>
        </div>
        
        {/* Features Banner */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="flex flex-col items-center">
            <div className="p-3 bg-success-light rounded-full mb-3">
              <CheckCircle className="h-6 w-6 text-success" />
            </div>
            <h4 className="font-semibold text-foreground mb-2">Satisfaction Guaranteed</h4>
            <p className="text-sm text-muted-foreground">Not happy? We'll re-clean for free</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="p-3 bg-success-light rounded-full mb-3">
              <Leaf className="h-6 w-6 text-success" />
            </div>
            <h4 className="font-semibold text-foreground mb-2">100% Eco-Friendly</h4>
            <p className="text-sm text-muted-foreground">Safe for families, pets & environment</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="p-3 bg-success-light rounded-full mb-3">
              <Sparkles className="h-6 w-6 text-success" />
            </div>
            <h4 className="font-semibold text-foreground mb-2">Fully Insured</h4>
            <p className="text-sm text-muted-foreground">Bonded & insured for your peace of mind</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;