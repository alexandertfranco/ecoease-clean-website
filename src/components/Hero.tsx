import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Phone, ArrowRight, Sparkles } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
const Hero = () => {
  return <section className="relative min-h-screen flex items-center justify-center bg-background overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-muted to-background" />
      <div className="absolute top-20 right-20 w-64 h-64 bg-primary-glow rounded-full blur-3xl opacity-30 animate-pulse" />
      <div className="absolute bottom-20 left-20 w-48 h-48 bg-success-light rounded-full blur-2xl opacity-20" />
      
      {/* Logo in top left */}
      <div className="absolute top-8 left-8 flex items-center z-20">
        <Sparkles className="h-16 w-16 text-primary mr-4" />
        <h1 className="text-4xl md:text-5xl font-bold text-foreground">
          EcoEase <span className="text-primary">Cleaning</span>
        </h1>
      </div>
      
      <div className="container mx-auto px-6 relative z-10 pt-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[600px]">
          {/* Left side - Content */}
          <div className="text-left animate-fade-in">
            {/* Main headline */}
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Hassle-Free Home Cleaning<br />
              In <span className="text-primary">Bucks County</span>.
            </h2>
            
            {/* Tagline */}
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-lg">
              Saving You Time and Eliminating Stress Through Quality Home Cleaning.
            </p>
            
            {/* Value proposition - Clean bullet points */}
            <div className="space-y-3 mb-10">
              <div className="flex items-center text-foreground">
                <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                All cleaners are highly vetted and insured
              </div>
              <div className="flex items-center text-foreground">
                <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                Trained with our checklists
              </div>
              <div className="flex items-center text-foreground">
                <span className="w-2 h-2 bg-primary rounded-full mr-3"></span>
                Reliable & friendly
              </div>
            </div>
            
            {/* CTA Button */}
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-lg font-semibold text-lg border-2 border-primary"
              onClick={() => window.location.href = '/booking'}
            >
              BOOK A CLEANING
            </Button>
          </div>

          {/* Right side - Hero Image Carousel */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-lg">
              <Carousel 
                className="w-full"
                plugins={[
                  Autoplay({
                    delay: 3000,
                  }),
                ]}
              >
                <CarouselContent>
                  <CarouselItem>
                    <div className="relative rounded-[3rem] overflow-hidden shadow-2xl bg-gradient-to-br from-primary/10 to-primary/5 p-4">
                      <img 
                        src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                        alt="Luxury clean living room with modern furniture" 
                        className="w-full h-[450px] lg:h-[500px] object-cover rounded-[2.5rem]"
                      />
                    </div>
                  </CarouselItem>
                  <CarouselItem>
                    <div className="relative rounded-[3rem] overflow-hidden shadow-2xl bg-gradient-to-br from-primary/10 to-primary/5 p-4">
                      <img 
                        src="https://images.unsplash.com/photo-1616594039964-ae9021a400a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                        alt="Recently cleaned luxury bedroom with pristine white bedding" 
                        className="w-full h-[450px] lg:h-[500px] object-cover rounded-[2.5rem]"
                      />
                    </div>
                  </CarouselItem>
                  <CarouselItem>
                    <div className="relative rounded-[3rem] overflow-hidden shadow-2xl bg-gradient-to-br from-primary/10 to-primary/5 p-4">
                      <img 
                        src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                        alt="Elegant bathroom with clean white tiles" 
                        className="w-full h-[450px] lg:h-[500px] object-cover rounded-[2.5rem]"
                      />
                    </div>
                  </CarouselItem>
                </CarouselContent>
                <CarouselPrevious className="left-4" />
                <CarouselNext className="right-4" />
              </Carousel>
            </div>
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