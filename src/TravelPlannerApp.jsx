import React, { useState } from 'react';
import { Calendar, MapPin, Plane, Plus, Clock, Users } from 'lucide-react';

const TravelPlannerApp = () => {
  const [trips, setTrips] = useState([]);
  const [showNewTripForm, setShowNewTripForm] = useState(false);
  const [newTrip, setNewTrip] = useState({
    title: '',
    destination: '',
    startDate: '',
    endDate: '',
    travelers: 1
  });

  const [calendarEvents] = useState([
    { id: 1, title: 'Business Meeting', date: '2025-06-15', time: '10:00 AM' },
    { id: 2, title: 'Family Dinner', date: '2025-06-20', time: '7:00 PM' },
    { id: 3, title: 'Conference Call', date: '2025-07-01', time: '2:00 PM' }
  ]);

  const [flightSuggestions] = useState([
    { id: 1, from: 'New York', to: 'Paris', price: '$456', duration: '7h 30m', airline: 'Air France' },
    { id: 2, from: 'New York', to: 'London', price: '$398', duration: '6h 45m', airline: 'British Airways' },
    { id: 3, from: 'Los Angeles', to: 'Tokyo', price: '$789', duration: '11h 20m', airline: 'JAL' },
    { id: 4, from: 'Chicago', to: 'Rome', price: '$523', duration: '9h 15m', airline: 'Lufthansa' }
  ]);

  const handleCreateTrip = () => {
    if (!newTrip.title || !newTrip.destination || !newTrip.startDate || !newTrip.endDate) {
      alert('Please fill in all required fields');
      return;
    }

    const trip = {
      id: Date.now(),
      ...newTrip,
      createdAt: new Date().toISOString(),
      flights: [],
      calendarSynced: false
    };

    setTrips([...trips, trip]);
    setNewTrip({ title: '', destination: '', startDate: '', endDate: '', travelers: 1 });
    setShowNewTripForm(false);
  };

  const syncWithCalendar = (tripId) => {
    setTrips(trips.map(trip => 
      trip.id === tripId ? { ...trip, calendarSynced: true } : trip
    ));
    alert('Trip synced with Google Calendar!');
  };

  const addFlightToTrip = (tripId, flight) => {
    setTrips(trips.map(trip => 
      trip.id === tripId 
        ? { ...trip, flights: [...trip.flights, { ...flight, addedAt: new Date().toISOString() }] }
        : trip
    ));
    alert('Flight added to trip!');
  };

  const checkCalendarConflicts = (startDate, endDate) => {
    return calendarEvents.filter(event => {
      const eventDate = new Date(event.date);
      const tripStart = new Date(startDate);
      const tripEnd = new Date(endDate);
      return eventDate >= tripStart && eventDate <= tripEnd;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <h1 className="text-3xl font-bold text-center">Travel Planner App</h1>
    </div>
  );
};

export default TravelPlannerApp;