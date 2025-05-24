import React, { useState } from 'react';
import { Calendar, MapPin, Plane, Plus, Clock, Users } from 'lucide-react';

function App() {
  const [trips, setTrips] = useState([]);
  const [showNewTripForm, setShowNewTripForm] = useState(false);
  const [newTrip, setNewTrip] = useState({
    title: '',
    destination: '',
    startDate: '',
    endDate: '',
    travelers: 1
  });

  // Mock Google Calendar events
  const [calendarEvents] = useState([
    { id: 1, title: 'Business Meeting', date: '2025-06-15', time: '10:00 AM' },
    { id: 2, title: 'Family Dinner', date: '2025-06-20', time: '7:00 PM' },
    { id: 3, title: 'Conference Call', date: '2025-07-01', time: '2:00 PM' }
  ]);

  // Mock Google Flights data
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
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-500 p-3 rounded-full">
                <Plane className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Travel Planner</h1>
                <p className="text-gray-600">Plan your perfect vacation with Google integration</p>
              </div>
            </div>
            <button
              onClick={() => setShowNewTripForm(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <Plus className="h-5 w-5" />
              <span>New Trip</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* New Trip Form */}
            {showNewTripForm && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Create New Trip</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Trip Title</label>
                      <input
                        type="text"
                        value={newTrip.title}
                        onChange={(e) => setNewTrip({...newTrip, title: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Summer Vacation 2025"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Destination</label>
                      <input
                        type="text"
                        value={newTrip.destination}
                        onChange={(e) => setNewTrip({...newTrip, destination: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Paris, France"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                      <input
                        type="date"
                        value={newTrip.startDate}
                        onChange={(e) => setNewTrip({...newTrip, startDate: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                      <input
                        type="date"
                        value={newTrip.endDate}
                        onChange={(e) => setNewTrip({...newTrip, endDate: e.target.value})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Travelers</label>
                      <input
                        type="number"
                        min="1"
                        value={newTrip.travelers}
                        onChange={(e) => setNewTrip({...newTrip, travelers: parseInt(e.target.value)})}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  {/* Calendar Conflict Check */}
                  {newTrip.startDate && newTrip.endDate && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <h4 className="font-medium text-yellow-800 mb-2">Calendar Check:</h4>
                      {checkCalendarConflicts(newTrip.startDate, newTrip.endDate).length > 0 ? (
                        <div className="text-yellow-700">
                          <p className="font-medium">⚠️ Conflicts found:</p>
                          {checkCalendarConflicts(newTrip.startDate, newTrip.endDate).map(event => (
                            <p key={event.id} className="text-sm">• {event.title} on {event.date}</p>
                          ))}
                        </div>
                      ) : (
                        <p className="text-green-700">✓ No calendar conflicts found</p>
                      )}
                    </div>
                  )}

                  <div className="flex space-x-3">
                    <button
                      onClick={handleCreateTrip}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
                    >
                      Create Trip
                    </button>
                    <button
                      onClick={() => setShowNewTripForm(false)}
                      className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-2 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Trip List */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-800">Your Trips</h2>
              {trips.length === 0 ? (
                <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                  <Plane className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-gray-600 mb-2">No trips planned yet</h3>
                  <p className="text-gray-500">Create your first trip to get started!</p>
                </div>
              ) : (
                trips.map(trip => (
                  <div key={trip.id} className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800">{trip.title}</h3>
                        <div className="flex items-center space-x-4 text-gray-600 mt-2">
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-4 w-4" />
                            <span>{trip.destination}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>{trip.startDate} to {trip.endDate}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="h-4 w-4" />
                            <span>{trip.travelers} traveler{trip.travelers > 1 ? 's' : ''}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        {!trip.calendarSynced ? (
                          <button
                            onClick={() => syncWithCalendar(trip.id)}
                            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                          >
                            Sync Calendar
                          </button>
                        ) : (
                          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                            ✓ Synced
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {trip.flights.length > 0 && (
                      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                        <h4 className="font-medium text-blue-900 mb-2">Booked Flights:</h4>
                        {trip.flights.map((flight, index) => (
                          <div key={index} className="text-sm text-blue-800">
                            {flight.from} → {flight.to} • {flight.airline} • {flight.price}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Google Flights Integration */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                <Plane className="h-5 w-5 text-blue-500" />
                <span>Flight Suggestions</span>
              </h3>
              <div className="space-y-3">
                {flightSuggestions.map(flight => (
                  <div key={flight.id} className="border border-gray-200 rounded-lg p-3">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="font-medium text-sm">{flight.from} → {flight.to}</div>
                        <div className="text-xs text-gray-600">{flight.airline}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-blue-600">{flight.price}</div>
                        <div className="text-xs text-gray-600">{flight.duration}</div>
                      </div>
                    </div>
                    {trips.length > 0 && (
                      <select 
                        className="w-full text-xs border border-gray-300 rounded p-1 mt-2"
                        onChange={(e) => {
                          if (e.target.value) {
                            addFlightToTrip(parseInt(e.target.value), flight);
                            e.target.value = '';
                          }
                        }}
                      >
                        <option value="">Add to trip...</option>
                        {trips.map(trip => (
                          <option key={trip.id} value={trip.id}>{trip.title}</option>
                        ))}
                      </select>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Google Calendar Integration */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-green-500" />
                <span>Upcoming Events</span>
              </h3>
              <div className="space-y-3">
                {calendarEvents.map(event => (
                  <div key={event.id} className="border-l-4 border-green-500 pl-3 py-2">
                    <div className="font-medium text-sm">{event.title}</div>
                    <div className="text-xs text-gray-600 flex items-center space-x-2">
                      <Clock className="h-3 w-3" />
                      <span>{event.date} at {event.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
