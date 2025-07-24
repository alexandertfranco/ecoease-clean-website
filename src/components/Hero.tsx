import { Button } from "@/components/ui/button";
import { Phone, ArrowRight, Sparkles } from "lucide-react";
const Hero = () => {
  return <section className="relative min-h-screen flex items-center justify-center bg-background overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-muted to-background" />
      <div className="absolute top-20 right-20 w-64 h-64 bg-primary-glow rounded-full blur-3xl opacity-30 animate-pulse" />
      <div className="absolute bottom-20 left-20 w-48 h-48 bg-success-light rounded-full blur-2xl opacity-20" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          {/* Logo/Brand */}
          <div className="flex items-center justify-center mb-8">
            <Sparkles className="h-12 w-12 text-primary mr-3" />
            <h1 className="text-5xl md:text-6xl font-bold text-foreground">
              EcoEase <span className="text-primary">Cleaning</span>
            </h1>
          </div>
          
          {/* Tagline */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-6 max-w-2xl mx-auto leading-relaxed">Professional eco-friendly cleaning service that cares for your home and your family</p>
          
          {/* Value proposition */}
          <div className="flex flex-wrap justify-center gap-6 mb-10 text-sm md:text-base">
            <div className="flex items-center text-foreground">
              <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
              100% Eco-Friendly Products
            </div>
            <div className="flex items-center text-foreground">
              <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
              Trusted & Insured
            </div>
            <div className="flex items-center text-foreground">
              <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
              Satisfaction Guaranteed
            </div>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="hero" size="lg" className="group" onClick={() => window.location.href = '/booking'}>
              <Phone className="h-5 w-5 mr-2" />
              Get Free Quote
              <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              Our Services
            </Button>
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
      </div>
    </section>;
};
export default Hero;