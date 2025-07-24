import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Calendar, MapPin, Clock, Phone, Mail, Edit, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Booking {
  id: string;
  service_type: string;
  scheduled_date: string;
  scheduled_time: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  rooms: number;
  bathrooms: number;
  frequency: string;
  add_ons: string[];
  total_price: number;
  status: string;
  created_at: string;
  user_id: string;
}

const Booking = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loadingBookings, setLoadingBookings] = useState(true);

  // Redirect to auth if not logged in
  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  // Fetch user's bookings
  useEffect(() => {
    const fetchBookings = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from('bookings')
          .select('*')
          .eq('user_id', user.id)
          .order('scheduled_date', { ascending: true });

        if (error) throw error;
        setBookings(data || []);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        toast({
          title: "Error",
          description: "Failed to load your bookings",
          variant: "destructive",
        });
      } finally {
        setLoadingBookings(false);
      }
    };

    fetchBookings();
  }, [user, toast]);

  // Cancel booking
  const cancelBooking = async (bookingId: string) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status: 'cancelled' })
        .eq('id', bookingId);

      if (error) throw error;

      setBookings(prev => 
        prev.map(booking => 
          booking.id === bookingId 
            ? { ...booking, status: 'cancelled' }
            : booking
        )
      );

      toast({
        title: "Booking Cancelled",
        description: "Your booking has been cancelled successfully",
      });
    } catch (error) {
      console.error('Error cancelling booking:', error);
      toast({
        title: "Error",
        description: "Failed to cancel booking",
        variant: "destructive",
      });
    }
  };

  // Filter bookings
  const currentDate = new Date().toISOString().split('T')[0];
  const scheduledBookings = bookings.filter(booking => 
    booking.scheduled_date >= currentDate && booking.status !== 'cancelled' && booking.status !== 'completed'
  );
  const pastBookings = bookings.filter(booking => 
    booking.scheduled_date < currentDate || booking.status === 'cancelled' || booking.status === 'completed'
  );

  // Format service type
  const formatServiceType = (serviceType: string) => {
    return serviceType.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  // Format date
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Render booking card
  const renderBookingCard = (booking: Booking, isScheduled: boolean) => (
    <Card key={booking.id} className="mb-4">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{formatServiceType(booking.service_type)}</CardTitle>
            <div className="flex items-center text-sm text-muted-foreground mt-1">
              <Calendar className="h-4 w-4 mr-1" />
              {formatDate(booking.scheduled_date)}
              <Clock className="h-4 w-4 ml-3 mr-1" />
              {booking.scheduled_time}
            </div>
          </div>
          <div className="text-right">
            <Badge variant={
              booking.status === 'pending' ? 'secondary' :
              booking.status === 'confirmed' ? 'default' :
              booking.status === 'completed' ? 'outline' :
              'destructive'
            }>
              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
            </Badge>
            <div className="text-lg font-bold text-primary mt-1">
              ${booking.total_price}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          <div className="flex items-start">
            <MapPin className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
            <div className="text-sm">
              <div>{booking.address}</div>
              <div className="text-muted-foreground">
                {booking.city}, {booking.state} {booking.zip_code}
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Space:</span>{' '}
              {booking.rooms === 0 ? 'Studio' : `${booking.rooms} Bedroom${booking.rooms > 1 ? 's' : ''}`}, {booking.bathrooms} Bath{booking.bathrooms > 1 ? 's' : ''}
            </div>
            <div>
              <span className="text-muted-foreground">Frequency:</span>{' '}
              {booking.frequency.replace('-', ' ')}
            </div>
          </div>

          {booking.add_ons && booking.add_ons.length > 0 && (
            <div className="text-sm">
              <span className="text-muted-foreground">Add-ons:</span>{' '}
              {booking.add_ons.join(', ')}
            </div>
          )}

          {isScheduled && booking.status !== 'cancelled' && (
            <div className="flex gap-2 pt-3 border-t">
              <Button variant="outline" size="sm" className="flex-1">
                <Edit className="h-4 w-4 mr-2" />
                Reschedule
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1"
                onClick={() => cancelBooking(booking.id)}
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  // Show loading while checking authentication
  if (loading || loadingBookings) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render anything while redirecting
  if (!user) {
    return null;
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
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">My Bookings</h1>
            <p className="text-muted-foreground">Manage your cleaning appointments</p>
          </div>

          <Tabs defaultValue="scheduled" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="scheduled">
                Scheduled ({scheduledBookings.length})
              </TabsTrigger>
              <TabsTrigger value="past">
                Past ({pastBookings.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="scheduled" className="space-y-6">
              {scheduledBookings.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No upcoming bookings</h3>
                    <p className="text-muted-foreground text-center mb-4">
                      You don't have any scheduled cleaning appointments yet.
                    </p>
                    <Button onClick={() => navigate('/')}>
                      Book Your First Cleaning
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                scheduledBookings.map(booking => renderBookingCard(booking, true))
              )}
            </TabsContent>

            <TabsContent value="past" className="space-y-6">
              {pastBookings.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <Clock className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No past bookings</h3>
                    <p className="text-muted-foreground text-center">
                      Your completed and cancelled bookings will appear here.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                pastBookings.map(booking => renderBookingCard(booking, false))
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Booking;