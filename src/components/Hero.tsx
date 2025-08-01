import { Button } from "@/components/ui/button";
import { Phone, ArrowRight, Sparkles } from "lucide-react";
const Hero = () => {
  return <section className="relative min-h-screen flex items-center justify-center bg-background overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-muted to-background" />
      <div className="absolute top-20 right-20 w-64 h-64 bg-primary-glow rounded-full blur-3xl opacity-30 animate-pulse" />
      <div className="absolute bottom-20 left-20 w-48 h-48 bg-success-light rounded-full blur-2xl opacity-20" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-3 gap-12 items-center">
          {/* Left side - Content */}
          <div className="lg:col-span-2 text-center lg:text-left animate-fade-in">
            {/* Logo/Brand */}
            <div className="flex items-center justify-center lg:justify-start mb-8">
              <Sparkles className="h-12 w-12 text-primary mr-3" />
              <h1 className="text-5xl md:text-6xl font-bold text-foreground">
                EcoEase <span className="text-primary">Cleaning</span>
              </h1>
            </div>
            
            {/* Tagline - More compelling like Peachy Clean */}
            <p className="text-xl md:text-2xl text-muted-foreground mb-6 max-w-2xl mx-auto lg:mx-0 leading-relaxed">Saving You Time and Eliminating Stress Through Quality <span className="text-primary font-semibold">Eco-Friendly</span> Home Cleaning</p>
            
            {/* Value proposition - Updated with better messaging */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 mb-10 text-sm md:text-base">
              <div className="flex items-center text-foreground">
                <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                All cleaners are highly vetted and insured
              </div>
              <div className="flex items-center text-foreground">
                <span className="w-2 h-2 bg-secondary rounded-full mr-2"></span>
                Trained with our checklists
              </div>
              <div className="flex items-center text-foreground">
                <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                Reliable & friendly
              </div>
            </div>
            
            {/* CTA Buttons - Modern styling */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
              <Button 
                size="lg" 
                className="group bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-lg font-semibold text-lg"
                onClick={() => window.location.href = '/booking'}
              >
                Book a Cleaning
                <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-4 rounded-lg font-semibold text-lg"
              >
                Our Services
              </Button>
            </div>
          </div>

          {/* Right side - Hero Image (smaller) */}
          <div className="relative">
            <div className="relative rounded-xl overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                alt="Luxury clean living room with modern furniture" 
                className="w-full h-[300px] lg:h-[350px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full animate-pulse"></div>
            <div className="absolute -bottom-3 -left-3 w-8 h-8 bg-primary/20 rounded-full blur-sm"></div>
          </div>
        </div>
        
        {/* Quick stats */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-md mx-auto">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">500+</div>
            <div className="text-sm text-muted-foreground">Happy Homes</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">5★</div>
            <div className="text-sm text-muted-foreground">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">3+</div>
            <div className="text-sm text-muted-foreground">Years Experience</div>
          </div>
        </div>
      </div>
    </section>;
};
export default Hero;