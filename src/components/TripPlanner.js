import React, { useState, useEffect } from "react";
import axios from "axios";

const TripPlanner = () => {
  const [tripName, setTripName] = useState("");
  const [tripPlan, setTripPlan] = useState([{ time: "", place: "", notes: "" }]);
  const [token, setToken] = useState(null);
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      fetchTrips(storedToken);
    }
  }, []);

  const fetchTrips = async (token) => {
    try {
      const response = await axios.get("http://localhost:5000/api/trips", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTrips(response.data);
    } catch (error) {
      console.error("Error fetching trips:", error.response?.data || error.message);
    }
  };

  const handleAddRow = () => {
    setTripPlan([...tripPlan, { time: "", place: "" }]);
  };

  const handleRemoveRow = (index) => {
    const updatedPlan = tripPlan.filter((_, i) => i !== index);
    setTripPlan(updatedPlan);
  };

  const handleChange = (index, field, value) => {
    const updatedPlan = [...tripPlan];
    updatedPlan[index][field] = value;
    setTripPlan(updatedPlan);
  };

  const handleSubmit = async () => {
    if (!tripName || tripPlan.length === 0 || tripPlan.some(row => !row.time || !row.place)) {
      alert("Please complete the trip plan.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/trips",
        { tripName, plan: tripPlan },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Trip saved successfully!");
      setTripPlan([{ time: "", place: "" }]);
      setTripName("");
      fetchTrips(token);
    } catch (error) {
      console.error("Error saving trip:", error.response?.data || error.message);
      alert("Failed to save trip.");
    }
  };

  const handleDeleteTrip = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/trips/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTrips(token);
    } catch (error) {
      console.error("Error deleting trip:", error.response?.data || error.message);
      alert("Failed to delete trip.");
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Plan Your Trip</h2>

      <input
        type="text"
        className="w-full p-2 border rounded mb-4"
        placeholder="Enter Trip Name"
        value={tripName}
        onChange={(e) => setTripName(e.target.value)}
      />

      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Time</th>
            <th className="border p-2">Place</th>
            <th className="border p-2">Notes</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {tripPlan.map((row, index) => (
            <tr key={index}>
              <td className="border p-2">
                <input
                  type="text"
                  className="w-full p-1 border rounded"
                  value={row.time}
                  onChange={(e) => handleChange(index, "time", e.target.value)}
                />
              </td>
              <td className="border p-2">
                <input
                  type="text"
                  className="w-full p-1 border rounded"
                  value={row.place}
                  onChange={(e) => handleChange(index, "place", e.target.value)}
                />
              </td>
              <td className="border p-2"> {/* ✅ Added Notes Input */}
          <input
            type="text"
            className="w-full p-1 border rounded"
            value={row.notes}
            onChange={(e) => handleChange(index, "notes", e.target.value)}
           />
         </td>
              <td className="border p-2">
                <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => handleRemoveRow(index)}>
                  X
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded" onClick={handleAddRow}>
        Add Row
      </button>

      <button className="mt-2 ml-4 bg-green-500 text-white px-4 py-2 rounded" onClick={handleSubmit}>
        Save Trip
      </button>

      <h3 className="text-xl font-bold mt-6">Your Trips</h3>
{trips.map((trip) => (
  <div key={trip._id} className="p-4 border my-4 rounded-lg shadow-md">
    <strong className="text-lg font-semibold">{trip.tripName}</strong>

    {/* Table to show trip details */}
    <table className="w-full border-collapse mt-2">
      <thead>
        <tr className="bg-gray-200">
          <th className="border p-2">Time</th>
          <th className="border p-2">Place</th>
          <th className="border p-2">Notes</th>
        </tr>
      </thead>
      <tbody>
        {trip.plan.map((item, index) => (
          <tr key={index} className="border">
            <td className="border p-2">{item.time}</td>
            <td className="border p-2">{item.place}</td>
            <td className="border p-2">{item.notes}</td>
          </tr>
        ))}
      </tbody>
    </table>

    {/* Delete Button */}
    <button
      className="mt-2 bg-red-500 text-white px-3 py-1 rounded"
      onClick={() => handleDeleteTrip(trip._id)}
    >
      Delete
    </button>
  </div>
))}

    </div>
  );
};

export default TripPlanner;
