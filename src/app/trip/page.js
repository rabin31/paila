'use client'
import NavBar from '@/src/components/NavBar1';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react'
import { isAuthenticated } from '@/src/utils/auth';

const TripPlanningForm = () => {
  const router = useRouter();
  const today = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    budget: '',
    startDate: '',
    endDate: '',
    mood: '',
    interests: '',
    otherDetails: ''
  })
  
  const [isLoading, setIsLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [tripPlan, setTripPlan] = useState(null)
  const [error, setError] = useState(null)

  const moodOptions = [
    { id: 'relaxed', title: 'Relaxed / Calm', icon: '🌊' },
    { id: 'adventurous', title: 'Adventurous / Thrill-seeking', icon: '⛰️' },
    { id: 'romantic', title: 'Romantic / Loving', icon: '💕' },
    { id: 'cultural', title: 'Cultural / Curious', icon: '🏛️' },
    { id: 'spiritual', title: 'Spiritual / Reflective', icon: '🧘' },
    { id: 'energetic', title: 'Energetic / Social', icon: '🎉' },
    { id: 'creative', title: 'Creative / Inspired', icon: '🎨' },
    { id: 'luxury', title: 'Luxury / Indulgent', icon: '💎' },
    { id: 'explorative', title: 'Explorative / Wanderlust', icon: '🗺️' },
    { id: 'festive', title: 'Festive / Joyful', icon: '🎭' }
  ]

useEffect(() => {
  if (!isAuthenticated()) {
    router.push("/login");
  }
}, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "startDate") {
      if (new Date(value) < new Date(today)) {
        setError("Start date cannot be earlier than today.");
        return;
      }
      if (formData.endDate && new Date(formData.endDate) < new Date(value)) {
        setFormData(prev => ({ ...prev, startDate: value, endDate: "" }));
        return;
      }
    }

    if (name === "endDate") {
      if (new Date(value) < new Date(formData.startDate)) {
        setError("End date cannot be earlier than start date.");
        return;
      }
    }

    setError(null);
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const calculateTripDuration = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getMoodDescription = (moodId) => {
    const mood = moodOptions.find(m => m.id === moodId);
    return mood ? mood.title : '';
  };

  // Updated Prompt with imageUrl fields
  const createTripPrompt = (formData) => {
    const tripDuration = calculateTripDuration(formData.startDate, formData.endDate);
    const moodDescription = getMoodDescription(formData.mood);
    
    return `You are an expert travel planner specializing in Nepal and surrounding regions. Based on the following traveler preferences, recommend the BEST destination and create a comprehensive travel plan.

TRAVELER PREFERENCES:
- Budget: NPR ${formData.budget}
- Travel Dates: ${formData.startDate} to ${formData.endDate} (${tripDuration} days)
- Travel Mood: ${moodDescription}
- Interests: ${formData.interests}
- Additional Notes: ${formData.otherDetails || 'None'}
- Location: Nepal (starting point)

CRITICAL: Respond with ONLY a valid JSON object. No markdown formatting, no explanatory text, no code blocks. Start your response with { and end with }.

Create a JSON response with this structure:

{
  "recommendedDestination": {
    "name": "destination name",
    "region": "region/district",
    "country": "Nepal",
    "whyRecommended": "detailed explanation of why this destination is perfect for the traveler",
    "bestTime": "why this time period is good for visiting",
    "imageUrl": "direct image URL representing the destination",
    "estimatedBudget": {
      "total": "NPR XX,XXX",
      "breakdown": {
        "accommodation": "NPR XX,XXX",
        "transportation": "NPR XX,XXX",
        "food": "NPR XX,XXX",
        "activities": "NPR XX,XXX",
        "miscellaneous": "NPR XX,XXX"
      }
    }
  },
  "itinerary": [
    {
      "day": 1,
      "title": "arrival and initial exploration",
      "activities": [
        {
          "time": "morning",
          "activity": "activity description",
          "location": "specific location",
          "duration": "2-3 hours",
          "cost": "NPR XXX",
          "tips": "helpful tips"
        }
      ],
      "accommodation": {
        "name": "hotel/lodge name",
        "type": "hotel/lodge/homestay",
        "description": "description of accommodation",
        "priceRange": "NPR X,XXX - X,XXX per night"
      },
      "meals": "meal recommendations",
      "dailyBudget": "NPR XXX"
    }
  ],
  "attractions": [
    {
      "name": "attraction name",
      "type": "temple/viewpoint/activity",
      "description": "detailed description",
      "imageUrl": "direct image URL representing this attraction",
      "entryFee": "NPR XXX or Free",
      "bestTime": "morning/afternoon/evening",
      "duration": "1-2 hours",
      "tips": "visitor tips"
    }
  ],
  "hotelRecommendations": [
    {
      "name": "hotel name",
      "type": "luxury/mid-range/budget",
      "description": "description of the hotel",
      "priceRange": "NPR X,XXX - X,XXX per night",
      "proximity": "distance from main attractions",
      "imageUrl": "direct image URL of the hotel"
    }
  ],
  "practicalInfo": {
    "weather": {
      "summary": "expected weather during travel dates",
      "temperatureRange": "XX°C to XX°C",
      "precipitation": "chance of rain/snow",
      "recommendations": "what to expect and prepare for"
    },
    "packingList": ["essential items to pack"],
    "localTips": ["insider tips from locals"],
    "emergencyContacts": "useful emergency numbers",
    "transportationOptions": "available transportation methods"
  },
  "estimatedTotalCost": "NPR XX,XXX",
  "budgetPlanning": {
    "moneySavingTips": ["tips to save money"],
    "splurgeOptions": ["where it's worth spending more"],
    "currencyInfo": "information about local currency"
  }
}

Make sure all costs are in Nepali Rupees (NPR) format and the response is valid JSON.`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const prompt = createTripPrompt(formData);
      
      const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-goog-api-key": "AIzaSyALaPSfjD0Mb9aCP_PCHhSDeS4vmqev3xA"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: prompt }
              ]
            }
          ],
          generationConfig: {
            response_mime_type: "application/json"
          }
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      
      if (data.candidates && data.candidates[0] && data.candidates[0].content) {
        let content = data.candidates[0].content.parts[0].text;
        
        content = content.replace(/```json\s*/g, '').replace(/```\s*$/g, '').trim();
        
        const tripPlanData = JSON.parse(content);
        setTripPlan(tripPlanData);
        setShowResults(true);
      } else {
        throw new Error('Invalid response format from API');
      }
    } catch (error) {
      console.error('Error generating trip plan:', error);
      setError(error.message || 'Failed to generate trip plan. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Results display component
  if (showResults && tripPlan) {
    return (
      <div className="min-h-screen w-full bg-white py-12 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <button 
              onClick={() => setShowResults(false)}
              className="mb-8 text-gray-500 hover:text-black transition-colors flex items-center"
            >
              ← Back to Form
            </button>
            
            {/* Destination Image */}
            <div className="relative h-64 w-full mb-8 rounded-lg overflow-hidden">
              {/* <img 
                src={tripPlan.recommendedDestination.imageUrl} 
                alt={tripPlan.recommendedDestination.name}
                className="w-full h-full object-cover"
                // onError={(e) => {
                //   e.target.src = "https://source.unsplash.com/random/1200x600/?nepal";
                // }}
              /> */}
              <div className="absolute inset-0 bg-blue-600 bg-opacity-40 flex items-center justify-center">
                <div className="text-white text-center">
                  <h1 className="text-4xl md:text-5xl font-medium mb-4">
                    Your Perfect Trip to {tripPlan.recommendedDestination.name}
                  </h1>
                  <h2 className="text-2xl mb-4">
                    {tripPlan.recommendedDestination.region}, {tripPlan.recommendedDestination.country}
                  </h2>
                </div>
              </div>
            </div>
            
            <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-6">
              {tripPlan.recommendedDestination.whyRecommended}
            </p>
            <p className="text-gray-600">
              Best time to visit: {tripPlan.recommendedDestination.bestTime}
            </p>
          </div>

          {/* Weather Information */}
          {tripPlan.practicalInfo && tripPlan.practicalInfo.weather && (
            <div className="bg-blue-50 rounded-lg p-6 mb-12">
              <h3 className="text-2xl font-medium mb-4">Weather Forecast</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-white rounded-lg">
                  <h4 className="font-medium text-lg mb-2">Conditions</h4>
                  <p className="text-gray-700">{tripPlan.practicalInfo.weather.summary}</p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg">
                  <h4 className="font-medium text-lg mb-2">Temperature</h4>
                  <p className="text-gray-700">{tripPlan.practicalInfo.weather.temperatureRange}</p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg">
                  <h4 className="font-medium text-lg mb-2">Precipitation</h4>
                  <p className="text-gray-700">{tripPlan.practicalInfo.weather.precipitation}</p>
                </div>
              </div>
              {tripPlan.practicalInfo.weather.recommendations && (
                <div className="mt-4 p-4 bg-blue-100 rounded-lg">
                  <h4 className="font-medium mb-2">Recommendations</h4>
                  <p className="text-gray-700">{tripPlan.practicalInfo.weather.recommendations}</p>
                </div>
              )}
            </div>
          )}

          {/* Budget Overview */}
          <div className="bg-gray-50 rounded-lg p-8 mb-12">
            <h3 className="text-2xl font-medium mb-6">Budget Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-medium text-lg mb-4">Total Estimated Cost</h4>
                <p className="text-3xl font-bold text-blue-600">
                  {tripPlan.recommendedDestination.estimatedBudget.total}
                </p>
                {tripPlan.budgetPlanning && (
                  <div className="mt-6">
                    <h4 className="font-medium text-lg mb-2">Budget Tips</h4>
                    <ul className="list-disc list-inside text-gray-700">
                      {tripPlan.budgetPlanning.moneySavingTips && tripPlan.budgetPlanning.moneySavingTips.map((tip, index) => (
                        <li key={index}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <div>
                <h4 className="font-medium text-lg mb-4">Budget Breakdown</h4>
                <div className="space-y-2">
                  {Object.entries(tripPlan.recommendedDestination.estimatedBudget.breakdown).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="capitalize">{key}:</span>
                      <span className="font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Hotel Recommendations */}
          {tripPlan.hotelRecommendations && tripPlan.hotelRecommendations.length > 0 && (
            <div className="mb-12">
              <h3 className="text-2xl font-medium mb-6">Recommended Accommodations</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tripPlan.hotelRecommendations.map((hotel, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                    <div>
                      {/* <img 
                        src={hotel.imageUrl} 
                        alt={hotel.name}
                        className="w-full h-full object-cover"
                        // onError={(e) => {
                        //   e.target.src = "https://source.unsplash.com/random/600x400/?hotel";
                        // }}
                      /> */}
                    </div>
                    <div className="p-4">
                      <h4 className="font-medium text-lg mb-2">{hotel.name}</h4>
                      <p className="text-gray-600 mb-2">{hotel.type} • {hotel.priceRange}</p>
                      <p className="text-gray-700 text-sm mb-2">{hotel.description}</p>
                      {hotel.proximity && (
                        <p className="text-gray-500 text-sm">📍 {hotel.proximity}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Day-by-day Itinerary */}
          <div className="mb-12">
            <h3 className="text-2xl font-medium mb-8">Daily Itinerary</h3>
            <div className="space-y-8">
              {tripPlan.itinerary.map((day, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-6">
                  <h4 className="text-xl font-medium mb-4 capitalize">
                    Day {day.day}: {day.title}
                  </h4>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                      <h5 className="font-medium mb-3">Activities</h5>
                      <div className="space-y-3">
                        {day.activities.map((activity, actIndex) => (
                          <div key={actIndex} className="bg-gray-50 p-4 rounded">
                            <div className="flex justify-between items-start mb-2">
                              <h6 className="font-medium capitalize">{activity.time}</h6>
                              <span className="text-sm text-gray-500">{activity.cost}</span>
                            </div>
                            <p className="text-gray-700 mb-1">{activity.activity}</p>
                            <p className="text-sm text-gray-500">📍 {activity.location}</p>
                            <p className="text-sm text-gray-500">⏱️ {activity.duration}</p>
                            {activity.tips && (
                              <p className="text-sm text-blue-600 mt-2">💡 {activity.tips}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="space-y-4">
                        <div>
                          <h5 className="font-medium mb-2">Accommodation</h5>
                          {typeof day.accommodation === 'object' ? (
                            <>
                              <p className="font-medium text-gray-700">{day.accommodation.name}</p>
                              <p className="text-sm text-gray-600">{day.accommodation.type}</p>
                              <p className="text-sm text-gray-600">{day.accommodation.priceRange}</p>
                            </>
                          ) : (
                            <p className="text-gray-700">{day.accommodation}</p>
                          )}
                        </div>
                        <div>
                          <h5 className="font-medium mb-2">Meals</h5>
                          <p className="text-gray-700">{day.meals}</p>
                        </div>
                        <div>
                          <h5 className="font-medium mb-2">Daily Budget</h5>
                          <p className="font-bold text-green-600">{day.dailyBudget}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Attractions */}
          {tripPlan.attractions && tripPlan.attractions.length > 0 && (
            <div className="mb-12">
              <h3 className="text-2xl font-medium mb-6">Must-See Attractions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tripPlan.attractions.map((attraction, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                    <div >
                      {/* <img 
                        src={attraction.imageUrl} 
                        alt={attraction.name}
                        className="w-full h-full object-cover"
                        // onError={(e) => {
                        //   e.target.src = "https://source.unsplash.com/random/600x400/?nepal";
                        // }}
                      /> */}
                    </div>
                    <div className="p-4">
                      <h4 className="font-medium text-lg mb-2">{attraction.name}</h4>
                      <p className="text-gray-600 mb-2 capitalize">{attraction.type}</p>
                      <p className="text-gray-700 text-sm mb-2">{attraction.description}</p>
                      <div className="flex justify-between items-center mt-4">
                        <span className="text-gray-600">{attraction.entryFee}</span>
                        <span className="text-gray-500 text-sm">⏱️ {attraction.duration}</span>
                      </div>
                      {attraction.tips && (
                        <p className="text-sm text-blue-600 mt-2">💡 {attraction.tips}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Practical Information */}
          {tripPlan.practicalInfo && (
            <div className="bg-gray-50 rounded-lg p-8 mb-12">
              <h3 className="text-2xl font-medium mb-6">Practical Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-medium text-lg mb-4">Packing List</h4>
                  <ul className="list-disc list-inside text-gray-700">
                    {tripPlan.practicalInfo.packingList.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-lg mb-4">Local Tips</h4>
                  <ul className="list-disc list-inside text-gray-700">
                    {tripPlan.practicalInfo.localTips.map((tip, index) => (
                      <li key={index}>{tip}</li>
                    ))}
                  </ul>
                </div>
              </div>
              {tripPlan.practicalInfo.transportationOptions && (
                <div className="mt-6">
                  <h4 className="font-medium text-lg mb-4">Transportation</h4>
                  <p className="text-gray-700">{tripPlan.practicalInfo.transportationOptions}</p>
                </div>
              )}
              {tripPlan.practicalInfo.emergencyContacts && (
                <div className="mt-6">
                  <h4 className="font-medium text-lg mb-4">Emergency Contacts</h4>
                  <p className="text-gray-700">{tripPlan.practicalInfo.emergencyContacts}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen w-full bg-white flex items-center justify-center px-8">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-medium text-red-600 mb-4">Oops! Something went wrong</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={() => {
              setError(null);
              setShowResults(false);
            }}
            className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <NavBar />
      <div className="min-h-screen w-full bg-white flex flex-col py-8 items-center justify-center px-8 font-sora">
        <div className="w-full max-w-4xl lg:mt-16">
          {/* Centered Header */}
          <div className="text-center mb-20">
            <h1 className="text-5xl md:text-6xl font-medium text-black mb-6 tracking-tight">
              Plan Your Perfect Trip
            </h1>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Tell us about your travel mood and preferences, and we&apos;ll create a personalized journey just for you.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-16">
            {/* Travel Mood */}
            <div className="space-y-8">
              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-700 uppercase tracking-wider mb-2">Select your Travel Mood</h3>
                <p className="text-gray-500">Choose the mood that matches your ideal travel experience</p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                {moodOptions.map((mood) => (
                  <div 
                    key={mood.id}
                    onClick={() => setFormData(prev => ({ ...prev, mood: mood.id }))}
                    className={`p-6 rounded-sm border cursor-pointer transition-all duration-200 ${
                      formData.mood === mood.id
                        ? 'border-black bg-gray-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-center space-y-3">
                      <span className="text-3xl block">{mood.icon}</span>
                      <h4 className="font-medium text-sm text-black leading-tight">{mood.title}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Budget and Dates */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
              <div className="space-y-3">
                <label htmlFor="budget" className="block text-sm font-medium text-gray-700 uppercase tracking-wider">
                  Budget (NPR)
                </label>
                <input 
                  id="budget"
                  name="budget"
                  min="1000"
                  type="number"
                  placeholder="Enter your budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  className="w-full px-0 py-3 bg-transparent text-black text-lg placeholder-gray-400 border-0 border-b border-gray-200 focus:border-black focus:outline-none transition-colors"
                  required
                />
              </div>

              <div className="space-y-3">
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 uppercase tracking-wider">
                  Start Date
                </label>
                <input 
                  id="startDate"
                  name="startDate"
                  type="date"
                  min={today}
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className="w-full px-0 py-3 bg-transparent text-black text-lg border-0 border-b border-gray-200 focus:border-black focus:outline-none transition-colors"
                  required
                />
              </div>

              <div className="space-y-3">
                <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 uppercase tracking-wider">
                  End Date
                </label>
                <input 
                  id="endDate"
                  name="endDate"
                  type="date"
                  min={formData.startDate || today}
                  value={formData.endDate}
                  onChange={handleInputChange}
                  className="w-full px-0 py-3 bg-transparent text-black text-lg border-0 border-b border-gray-200 focus:border-black focus:outline-none transition-colors"
                  required
                />
              </div>
            </div>

            {/* Interests and Other Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <div className="space-y-3">
                <label htmlFor="interests" className="block text-sm font-medium text-gray-700 uppercase tracking-wider">
                  Interests
                </label>
                <textarea 
                  id="interests"
                  name="interests"
                  rows="4"
                  placeholder="Tell us about your interests (e.g., food, photography, history, nature, art...)"
                  value={formData.interests}
                  onChange={handleInputChange}
                  className="w-full px-0 py-3 bg-transparent text-black text-lg placeholder-gray-400 border-0 border-b border-gray-200 focus:border-black focus:outline-none transition-colors resize-none"
                  required
                />
              </div>

              <div className="space-y-3">
                <label htmlFor="otherDetails" className="block text-sm font-medium text-gray-700 uppercase tracking-wider">
                  Additional Notes
                </label>
                <textarea 
                  id="otherDetails"
                  name="otherDetails"
                  rows="4"
                  placeholder="Any specific requirements or additional information..."
                  value={formData.otherDetails}
                  onChange={handleInputChange}
                  className="w-full px-0 py-3 bg-transparent text-black text-lg placeholder-gray-400 border-0 border-b border-gray-200 focus:border-black focus:outline-none transition-colors resize-none"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center pt-8">
              <button 
                type="submit"
                disabled={isLoading}
                className={`bg-black text-white font-medium py-4 rounded-sm px-8 transition-all duration-200 text-base ${
                  isLoading 
                    ? 'opacity-70 cursor-not-allowed' 
                    : 'hover:bg-gray-800'
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Generating Your Perfect Trip...</span>
                  </div>
                ) : (
                  'Generate My Dream Trip'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default TripPlanningForm;