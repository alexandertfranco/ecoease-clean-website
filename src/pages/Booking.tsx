import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ArrowRight, Home, Sparkles, Plus, Calendar, MapPin, CreditCard } from "lucide-react";

interface BookingState {
  bedrooms: number;
  bathrooms: number;
  serviceType: string;
  frequency: string;
  date: string;
  address: string;
  contact: {
    name: string;
    email: string;
    phone: string;
  };
  zipCode: string;
}

const serviceTypes = [
  {
    id: "standard",
    name: "Standard",
    description: "60pt Checklist",
    features: ["Recurring options available", "Add-ons available"],
    price: 80,
    duration: "2-3 hours"
  },
  {
    id: "standard-plus",
    name: "Standard Plus", 
    description: "75pt Checklist",
    features: ["Recurring options available", "Add-ons available", "50% Additional time"],
    price: 120,
    duration: "3-4 hours",
    popular: true
  },
  {
    id: "deep",
    name: "Deep Cleaning",
    description: "75pt Checklist", 
    features: ["Recurring options available", "Add-ons included (Fridge, oven, cabinets)", "150% Additional time"],
    price: 180,
    duration: "4-6 hours"
  }
];

const Booking = () => {
  const [step, setStep] = useState(1);
  const [booking, setBooking] = useState<BookingState>({
    bedrooms: 1,
    bathrooms: 1,
    serviceType: "standard-plus",
    frequency: "one-time",
    date: "",
    address: "",
    contact: { name: "", email: "", phone: "" },
    zipCode: ""
  });

  const totalSteps = 5;
  const selectedService = serviceTypes.find(s => s.id === booking.serviceType);
  const basePrice = selectedService?.price || 0;
  const roomMultiplier = (booking.bedrooms * 20) + (booking.bathrooms * 15);
  const totalPrice = basePrice + roomMultiplier;

  const nextStep = () => {
    if (step < totalSteps) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground mb-6">Tell us about your space</h2>
            
            {/* Bedrooms */}
            <div>
              <Label className="text-base font-semibold mb-3 block">Bedrooms</Label>
              <div className="flex gap-2">
                <Badge 
                  variant={booking.bedrooms === 0 ? "default" : "outline"}
                  className="px-4 py-2 cursor-pointer"
                  onClick={() => setBooking({...booking, bedrooms: 0})}
                >
                  Studio
                </Badge>
                {[1,2,3,4,5].map(num => (
                  <Badge
                    key={num}
                    variant={booking.bedrooms === num ? "default" : "outline"}
                    className="px-4 py-2 cursor-pointer"
                    onClick={() => setBooking({...booking, bedrooms: num})}
                  >
                    {num}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Bathrooms */}
            <div>
              <Label className="text-base font-semibold mb-3 block">Bathrooms</Label>
              <div className="flex gap-2">
                {[1,2,3,4,5].map(num => (
                  <Badge
                    key={num}
                    variant={booking.bathrooms === num ? "default" : "outline"}
                    className="px-4 py-2 cursor-pointer"
                    onClick={() => setBooking({...booking, bathrooms: num})}
                  >
                    {num}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Service Types */}
            <div>
              <Label className="text-base font-semibold mb-3 block">Choose your cleaning service</Label>
              <div className="grid gap-4">
                {serviceTypes.map(service => (
                  <Card 
                    key={service.id}
                    className={`cursor-pointer transition-all ${booking.serviceType === service.id ? 'ring-2 ring-primary' : ''}`}
                    onClick={() => setBooking({...booking, serviceType: service.id})}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{service.name}</CardTitle>
                        {service.popular && <Badge>Most Popular</Badge>}
                      </div>
                      <p className="text-sm text-muted-foreground">{service.description}</p>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-1">
                        {service.features.map((feature, idx) => (
                          <p key={idx} className="text-xs text-muted-foreground">• {feature}</p>
                        ))}
                      </div>
                      <div className="flex justify-between items-center mt-3">
                        <span className="font-semibold">Starting at ${service.price}</span>
                        <span className="text-sm text-muted-foreground">{service.duration}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground mb-6">How often do you need cleaning?</h2>
            <div className="grid gap-4">
              {[
                { id: "one-time", name: "One-time", price: 0, desc: "Single cleaning session" },
                { id: "weekly", name: "Weekly", price: -20, desc: "Every week (20% discount)" },
                { id: "bi-weekly", name: "Every 2 weeks", price: -15, desc: "Every other week (15% discount)" },
                { id: "monthly", name: "Monthly", price: -10, desc: "Once a month (10% discount)" }
              ].map(freq => (
                <Card 
                  key={freq.id}
                  className={`cursor-pointer transition-all ${booking.frequency === freq.id ? 'ring-2 ring-primary' : ''}`}
                  onClick={() => setBooking({...booking, frequency: freq.id})}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold">{freq.name}</h3>
                        <p className="text-sm text-muted-foreground">{freq.desc}</p>
                      </div>
                      {freq.price < 0 && (
                        <Badge variant="secondary">{freq.price}%</Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground mb-6">When should we come?</h2>
            <div className="space-y-4">
              <Label>Select your preferred date</Label>
              <Input
                type="date"
                value={booking.date}
                onChange={(e) => setBooking({...booking, date: e.target.value})}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground mb-6">Where should we clean?</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="zipCode">Zip Code</Label>
                <Input
                  id="zipCode"
                  placeholder="12345"
                  value={booking.zipCode}
                  onChange={(e) => setBooking({...booking, zipCode: e.target.value})}
                  maxLength={5}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  We'll verify this is within our service area
                </p>
              </div>
              <div>
                <Label htmlFor="address">Full Address</Label>
                <Input
                  id="address"
                  placeholder="123 Main St, City, State"
                  value={booking.address}
                  onChange={(e) => setBooking({...booking, address: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="name">Your Name</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={booking.contact.name}
                  onChange={(e) => setBooking({...booking, contact: {...booking.contact, name: e.target.value}})}
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={booking.contact.email}
                  onChange={(e) => setBooking({...booking, contact: {...booking.contact, email: e.target.value}})}
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  placeholder="(555) 123-4567"
                  value={booking.contact.phone}
                  onChange={(e) => setBooking({...booking, contact: {...booking.contact, phone: e.target.value}})}
                />
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground mb-6">Review & Confirm</h2>
            <Card>
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Space:</span>
                  <span>{booking.bedrooms === 0 ? 'Studio' : `${booking.bedrooms} Bedroom${booking.bedrooms > 1 ? 's' : ''}`}, {booking.bathrooms} Bathroom{booking.bathrooms > 1 ? 's' : ''}</span>
                </div>
                <div className="flex justify-between">
                  <span>Service:</span>
                  <span>{selectedService?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Frequency:</span>
                  <span>{booking.frequency.replace('-', ' ')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Date:</span>
                  <span>{new Date(booking.date).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between border-t pt-4 font-semibold">
                  <span>Total:</span>
                  <span>${totalPrice}</span>
                </div>
              </CardContent>
            </Card>
            <Button className="w-full" size="lg">
              <CreditCard className="w-4 h-4 mr-2" />
              Confirm Booking
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center mr-3">
                <span className="text-primary-foreground font-bold text-sm">E</span>
              </div>
              <span className="text-xl font-bold text-foreground">EcoEase Cleaning</span>
            </div>
            <Button variant="ghost" onClick={() => window.location.href = '/'}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Progress Steps */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  {Array.from({length: totalSteps}, (_, i) => (
                    <div key={i} className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        step > i + 1 ? 'bg-primary text-primary-foreground' : 
                        step === i + 1 ? 'bg-primary text-primary-foreground' : 
                        'bg-muted text-muted-foreground'
                      }`}>
                        {i + 1}
                      </div>
                      {i < totalSteps - 1 && (
                        <div className={`w-full h-1 mx-2 ${step > i + 1 ? 'bg-primary' : 'bg-muted'}`} />
                      )}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  Step {step} of {totalSteps}
                </p>
              </div>

              {/* Step Content */}
              <div className="mb-8">
                {renderStep()}
              </div>

              {/* Navigation */}
              <div className="flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={prevStep}
                  disabled={step === 1}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <Button 
                  onClick={nextStep}
                  disabled={step === totalSteps}
                >
                  Next Step
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>

            {/* Booking Summary Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Home className="w-5 h-5 mr-2" />
                    Your Booking
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Space:</span>
                      <span>{booking.bedrooms === 0 ? 'Studio' : `${booking.bedrooms}BR`}, {booking.bathrooms}BA</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Service:</span>
                      <span>{selectedService?.name}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Frequency:</span>
                      <span>{booking.frequency.replace('-', ' ')}</span>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Estimated Total:</span>
                      <span className="text-lg font-bold text-primary">${totalPrice}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Final price confirmed after consultation
                    </p>
                  </div>

                  {step < totalSteps && (
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <p className="text-sm font-medium text-primary">🎉 Discounts Ahead!</p>
                      <p className="text-xs text-muted-foreground">Complete booking to unlock your offer</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;