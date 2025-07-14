import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Get Your Free Quote Today
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Ready for a cleaner, healthier space? Contact us for a free estimate and experience the EcoEase difference.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="border-0 shadow-card">
              <CardHeader>
                <CardTitle className="text-2xl text-foreground">Request Your Quote</CardTitle>
                <p className="text-muted-foreground">Fill out the form and we'll get back to you within 24 hours.</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">First Name</label>
                    <Input placeholder="John" className="bg-background" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-2">Last Name</label>
                    <Input placeholder="Doe" className="bg-background" />
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Email</label>
                  <Input type="email" placeholder="john@example.com" className="bg-background" />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Phone</label>
                  <Input type="tel" placeholder="(555) 123-4567" className="bg-background" />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Service Type</label>
                  <select className="w-full p-2 border border-input rounded-md bg-background text-foreground">
                    <option>Select a service</option>
                    <option>Residential Cleaning</option>
                    <option>Commercial Cleaning</option>
                    <option>Deep Cleaning</option>
                    <option>Carpet & Upholstery</option>
                    <option>Post-Construction</option>
                  </select>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Message</label>
                  <Textarea 
                    placeholder="Tell us about your cleaning needs, property size, and preferred schedule..."
                    className="bg-background min-h-[100px]"
                  />
                </div>
                
                <Button variant="hero" className="w-full">
                  <Send className="h-4 w-4 mr-2" />
                  Send Request
                </Button>
              </CardContent>
            </Card>
            
            {/* Contact Information */}
            <div className="space-y-8">
              <Card className="border-0 shadow-card">
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <div className="p-3 bg-primary-glow rounded-lg mr-4">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Call Us</h3>
                      <p className="text-muted-foreground mb-1">(555) 123-CLEAN</p>
                      <p className="text-sm text-muted-foreground">Available 7 days a week</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-card">
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <div className="p-3 bg-primary-glow rounded-lg mr-4">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Email Us</h3>
                      <p className="text-muted-foreground mb-1">hello@ecoeasecleaning.com</p>
                      <p className="text-sm text-muted-foreground">We respond within 24 hours</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-card">
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <div className="p-3 bg-primary-glow rounded-lg mr-4">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Service Area</h3>
                      <p className="text-muted-foreground mb-1">Greater Metro Area</p>
                      <p className="text-sm text-muted-foreground">Free quotes within 25 miles</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-0 shadow-card">
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <div className="p-3 bg-primary-glow rounded-lg mr-4">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Business Hours</h3>
                      <p className="text-muted-foreground mb-1">Monday - Friday: 8AM - 6PM</p>
                      <p className="text-muted-foreground mb-1">Saturday: 9AM - 4PM</p>
                      <p className="text-sm text-muted-foreground">Emergency services available</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;