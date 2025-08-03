import { Card, CardContent } from "@/components/ui/card";
import { Shield, Heart, Award, Users } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Fully Insured & Bonded",
    description: "Your peace of mind is our priority. We're fully licensed, insured, and bonded for your protection."
  },
  {
    icon: Heart,
    title: "Eco-Friendly Products",
    description: "We use only natural, non-toxic cleaning products that are safe for your family and pets."
  },
  {
    icon: Award,
    title: "Quality Guarantee",
    description: "We stand behind our work with a 100% satisfaction guarantee. Not happy? We'll make it right."
  },
  {
    icon: Users,
    title: "Trusted Team",
    description: "Our cleaning professionals are background-checked, trained, and committed to excellence."
  }
];

const About = () => {
  return (
    <section id="about" className="py-12 sm:py-16 lg:py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left side - Content */}
            <div className="animate-fade-in">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4 sm:mb-6">
                Why Choose EcoEase Cleaning?
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                We're more than just a cleaning service – we're your partners in creating a healthier, 
                cleaner environment for your home or business. With our commitment to eco-friendly 
                practices and exceptional service, we deliver results that exceed expectations.
              </p>
              
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-start">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-success rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                    <span className="text-xs text-white">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground text-sm sm:text-base">Local & Reliable</h4>
                    <p className="text-muted-foreground text-sm sm:text-base">Proudly serving our community with dependable service</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-success rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                    <span className="text-xs text-white">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground text-sm sm:text-base">Flexible Scheduling</h4>
                    <p className="text-muted-foreground text-sm sm:text-base">Weekly, bi-weekly, monthly, or one-time services available</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-success rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                    <span className="text-xs text-white">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground text-sm sm:text-base">Competitive Pricing</h4>
                    <p className="text-muted-foreground text-sm sm:text-base">Fair, transparent pricing with no hidden fees</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right side - Features grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-8 lg:mt-0">
              {features.map((feature, index) => (
                <Card 
                  key={feature.title} 
                  className="border-0 shadow-card hover:shadow-glow transition-all duration-300 group"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <CardContent className="p-4 sm:p-6 text-center">
                    <div className="p-2 sm:p-3 bg-primary-glow rounded-full w-fit mx-auto mb-3 sm:mb-4 group-hover:bg-primary transition-colors">
                      <feature.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary group-hover:text-primary-foreground" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2 text-sm sm:text-base">{feature.title}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;