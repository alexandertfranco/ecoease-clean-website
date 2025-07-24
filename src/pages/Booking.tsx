import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ArrowLeft, ArrowRight, Home, Sparkles, Plus, Calendar as CalendarIcon, MapPin, CreditCard, Clock } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface BookingState {
  serviceCategory: string;
  bedrooms: number;
  bathrooms: number;
  squareFootage: string;
  serviceType: string;
  frequency: string;
  date: Date | undefined;
  time: string;
  address: string;
  contact: {
    name: string;
    email: string;
    phone: string;
  };
  zipCode: string;
  addOns: string[];
}

const serviceTypes = [
  {
    id: "standard",
    name: "Standard",
    description: "60 Point Checklist",
    features: ["Recurring options available", "Add-ons available"],
    price: 80,
    duration: "2-3 hours"
  },
  {
    id: "standard-plus",
    name: "Standard Plus", 
    description: "75 Point Checklist",
    features: ["Recurring options available", "Add-ons available", "50% Additional time"],
    price: 120,
    duration: "3-4 hours",
    popular: true
  },
  {
    id: "deep",
    name: "Deep Cleaning",
    description: "75 Point Checklist", 
    features: ["Recurring options available", "Add-ons included (Fridge, oven, cabinets)", "150% Additional time"],
    price: 180,
    duration: "4-6 hours"
  },
  {
    id: "move-in-out",
    name: "Move In/Move Out",
    description: "Complete Property Checklist",
    features: ["One-time service only", "All add-ons included", "200% Additional time", "Empty property cleaning"],
    price: 250,
    duration: "6-8 hours"
  }
];

const addOnOptions = [
  {
    id: "inside-fridge",
    name: "Inside Fridge (empty)",
    price: 30,
    description: "Deep clean inside of refrigerator"
  },
  {
    id: "inside-oven", 
    name: "Inside Oven",
    price: 30,
    description: "Clean inside of oven and racks"
  },
  {
    id: "inside-microwave",
    name: "Inside Microwave", 
    price: 20,
    description: "Clean inside of microwave"
  },
  {
    id: "kitchen-cabinets",
    name: "Inside Kitchen Cabinets (empty)",
    price: 30,
    description: "Wipe down inside of empty cabinets"
  },
  {
    id: "pets-hair",
    name: "Pets/Pet Hair",
    price: 30,
    description: "Extra attention for pet hair removal"
  },
  {
    id: "wash-dishes",
    name: "Wash Dishes",
    price: 25,
    description: "Hand wash dishes and cookware"
  },
  {
    id: "laundry",
    name: "Wash Load of Laundry",
    price: 30,
    description: "Wash, dry, and fold one load"
  },
  {
    id: "interior-windows",
    name: "Clean Interior Windows",
    price: 60,
    description: "Clean all interior windows"
  },
  {
    id: "window-blinds",
    name: "Clean Window Blinds",
    price: 30,
    description: "Dust and wipe window blinds"
  },
  {
    id: "baseboards",
    name: "Wipe Down Baseboards",
    price: 45,
    description: "Clean all baseboards throughout home"
  },
  {
    id: "basement",
    name: "Clean Finished Basement",
    price: 40,
    description: "Clean finished basement area"
  },
  {
    id: "organizing",
    name: "Hour of Organizing",
    price: 40,
    description: "Professional organizing service per hour"
  }
];

const Booking = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [booking, setBooking] = useState<BookingState>({
    serviceCategory: "",
    bedrooms: 1,
    bathrooms: 1,
    squareFootage: "0-999",
    serviceType: "standard-plus",
    frequency: "one-time",
    date: undefined,
    time: "",
    address: "",
    contact: { name: "", email: "", phone: "" },
    zipCode: "",
    addOns: []
  });

  // Optional: Auto-fill contact info from user data if logged in

  // Auto-fill contact info from user data
  useEffect(() => {
    if (user && !booking.contact.email) {
      setBooking(prev => ({
        ...prev,
        contact: {
          ...prev.contact,
          email: user.email || '',
          name: user.user_metadata?.full_name || ''
        }
      }));
    }
  }, [user, booking.contact.email]);

  const totalSteps = 7;
  const selectedService = serviceTypes.find(s => s.id === booking.serviceType);
  const basePrice = selectedService?.price || 0;
  const roomMultiplier = (booking.bedrooms * 20) + (booking.bathrooms * 15);
  const addOnPrice = booking.addOns.reduce((total, addOnId) => {
    const addOn = addOnOptions.find(a => a.id === addOnId);
    return total + (addOn?.price || 0);
  }, 0);
  const totalPrice = basePrice + roomMultiplier + addOnPrice;

  const nextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const toggleAddOn = (addOnId: string) => {
    setBooking(prev => ({
      ...prev,
      addOns: prev.addOns.includes(addOnId)
        ? prev.addOns.filter(id => id !== addOnId)
        : [...prev.addOns, addOnId]
    }));
  };

  // Available time slots
  const availableTimeSlots = [
    "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
  ];

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground mb-6">What type of service do you need?</h2>
            <p className="text-muted-foreground mb-6">
              Choose the category that best describes your cleaning needs.
            </p>
            
            <div className="grid gap-6">
              {[
                {
                  id: "residential",
                  name: "Residential Cleaning",
                  description: "Homes, apartments, condos, and townhouses",
                  icon: "🏠"
                },
                {
                  id: "commercial",
                  name: "Commercial Cleaning", 
                  description: "Offices, retail spaces, and business facilities",
                  icon: "🏢"
                },
                {
                  id: "carpet-upholstery",
                  name: "Carpet & Upholstery",
                  description: "Deep cleaning for carpets, rugs, and furniture",
                  icon: "🛋️"
                },
                {
                  id: "post-construction",
                  name: "Post-Construction",
                  description: "Construction cleanup and debris removal",
                  icon: "🔨"
                }
              ].map(category => (
                <Card 
                  key={category.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    booking.serviceCategory === category.id ? 'ring-2 ring-primary bg-primary/5' : ''
                  }`}
                  onClick={() => setBooking({...booking, serviceCategory: category.id})}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="text-3xl">{category.icon}</div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold">{category.name}</h3>
                        <p className="text-sm text-muted-foreground">{category.description}</p>
                      </div>
                      {booking.serviceCategory === category.id && (
                        <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                          <span className="text-primary-foreground text-sm">✓</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 2:
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

            {/* Square Footage */}
            <div>
              <Label className="text-base font-semibold mb-3 block">Square Footage of Your Home</Label>
              <div className="flex flex-wrap gap-2">
                {[
                  "0-999",
                  "1000-1499", 
                  "1500-1999",
                  "2000-2499",
                  "2500-2999",
                  "3000-3499",
                  "3500-3999",
                  "4000-4499",
                  "4500-4999",
                  "5000-5499",
                  "5500-5999",
                  "6000-6499",
                  "6500-6999",
                  "7000-7499",
                  "7500-7999",
                  "8000-8499",
                  "8500-8999",
                  "9000-9499",
                  "9500-9999",
                  "10000+"
                ].map(range => (
                  <Badge
                    key={range}
                    variant={booking.squareFootage === range ? "default" : "outline"}
                    className="px-3 py-2 cursor-pointer"
                    onClick={() => setBooking({...booking, squareFootage: range})}
                  >
                    {range} sq.ft
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

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground mb-6">Add-on Services</h2>
            <p className="text-muted-foreground mb-6">
              Select any additional services you'd like to include with your cleaning.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {addOnOptions.map(addOn => (
                <Card 
                  key={addOn.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    booking.addOns.includes(addOn.id) ? 'ring-2 ring-primary bg-primary/5' : ''
                  }`}
                  onClick={() => toggleAddOn(addOn.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm">{addOn.name}</h3>
                        <p className="text-xs text-muted-foreground mt-1">{addOn.description}</p>
                      </div>
                      <div className="text-right ml-3">
                        <span className="font-semibold text-primary">+${addOn.price}</span>
                        {booking.addOns.includes(addOn.id) && (
                          <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center mt-1 ml-auto">
                            <span className="text-primary-foreground text-xs">✓</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {booking.addOns.length > 0 && (
              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Selected Add-ons:</h4>
                <div className="space-y-1">
                  {booking.addOns.map(addOnId => {
                    const addOn = addOnOptions.find(a => a.id === addOnId);
                    return addOn ? (
                      <div key={addOnId} className="flex justify-between text-sm">
                        <span>{addOn.name}</span>
                        <span>+${addOn.price}</span>
                      </div>
                    ) : null;
                  })}
                </div>
                <div className="border-t mt-2 pt-2 font-semibold text-sm">
                  Add-ons Total: +${addOnPrice}
                </div>
              </div>
            )}
          </div>
        );

      case 4:
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

      case 5:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground mb-6">When should we come?</h2>
            
            {/* Date Selection */}
            <div className="space-y-4">
              <Label>Select your preferred date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !booking.date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {booking.date ? format(booking.date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={booking.date}
                    onSelect={(date) => setBooking(prev => ({ ...prev, date, time: "" }))}
                    disabled={(date) => date < new Date()}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Time Selection */}
            {booking.date && (
              <div className="space-y-4">
                <Label>Select your preferred time</Label>
                <div className="grid grid-cols-3 gap-3">
                  {availableTimeSlots.map((timeSlot) => (
                    <Button
                      key={timeSlot}
                      variant={booking.time === timeSlot ? "default" : "outline"}
                      className="text-sm"
                      onClick={() => setBooking(prev => ({ ...prev, time: timeSlot }))}
                    >
                      <Clock className="h-4 w-4 mr-2" />
                      {timeSlot}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case 6:
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

      case 7:
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
                  <span>Date & Time:</span>
                  <span>{booking.date ? format(booking.date, "PPP") : "Not selected"} {booking.time && `at ${booking.time}`}</span>
                </div>
                {booking.addOns.length > 0 && (
                  <div className="space-y-1">
                    <span className="font-medium">Add-ons:</span>
                    {booking.addOns.map(addOnId => {
                      const addOn = addOnOptions.find(a => a.id === addOnId);
                      return addOn ? (
                        <div key={addOnId} className="flex justify-between text-sm text-muted-foreground pl-2">
                          <span>• {addOn.name}</span>
                          <span>+${addOn.price}</span>
                        </div>
                      ) : null;
                    })}
                  </div>
                )}
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

  // Show loading while checking authentication (but still allow access)
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center mr-3">
                <span className="text-primary-foreground font-bold text-sm">C</span>
              </div>
              <span className="text-xl font-bold text-foreground">Clean Club</span>
            </div>
            <Button variant="ghost" onClick={() => navigate('/')}>
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
                <div className="flex items-center justify-between mb-4 max-w-md mx-auto">
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
                        <div className={`w-8 h-1 mx-1 ${step > i + 1 ? 'bg-primary' : 'bg-muted'}`} />
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
                  disabled={step === totalSteps || (step === 1 && !booking.serviceCategory) || (step === 5 && (!booking.date || !booking.time))}
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
                    {booking.addOns.length > 0 && (
                      <div className="text-sm">
                        <span>Add-ons: {booking.addOns.length}</span>
                      </div>
                    )}
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