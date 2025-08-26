import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BrandCard from "../components/BrandCard";
import toast from "react-hot-toast"; // Make sure you installed and set up react-hot-toast

const brands = [
  "Amber", "Arati", "Baba", "Bhanu", "Bheri", "Butwal", "Chadi", "Everest", "NL", "Himal",
  "Gita", "Grihalaxmi", "HP", "Jagadamba", "Janaki", "Shree Maya", "Kankai", "Koshi", "Leo",
  "Lumbini", "Manakamana", "Manoj", "Subidha", "Mechi", "STC", "Namaste", "Narayani",
  "Nepal Gas (Narayani)", "Nepal Gas", "Nobel", "Om", "Sostik", "Parajuli", "Pathibhara",
  "Prima", "Rajdhani", "Rapti", "Rijalco", "Rediant", "Sagar", "Sahara", "Saibaba", "Shakti",
  "Shree", "Tara", "Shree Krishna", "Shreeram", "Siddhanath", "Siddhartha", "Kamakhaya",
  "Sugam", "Super", "Surya", "Trishul", "Triveni", "Lokpriya"
];

const Home = () => {
  const navigate = useNavigate();

  const [showTracker, setShowTracker] = useState(false);
  const [trackingId, setTrackingId] = useState("");
  const [order, setOrder] = useState(null);

  const handleSelect = (brand) => {
    navigate("/request", { state: { selectedBrand: brand } });
  };

  const handleTrack = () => {
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    const found = orders.find((o) => o.trackingId === trackingId.toUpperCase());

    if (!found) {
      toast.error("❌ No order found with that Tracking ID.");
      setOrder(null);
    } else {
      setOrder(found);
      toast.success("✅ Order found!");
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-red-50 to-white relative">

      {/* Top-right tracker toggle button */}
      <div className="flex justify-end mb-4">
        <div className="relative">
          <button
            onClick={() => setShowTracker(prev => !prev)}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
          >
            Track Order
          </button>

          {showTracker && (
            <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-xl border p-4 z-10">
              <input
                type="text"
                placeholder="Enter Tracking ID"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                className="w-full p-2 border rounded mb-2"
              />
              <button
                onClick={handleTrack}
                className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
              >
                Track
              </button>

              {order && (
                <div className="mt-3 text-sm bg-gray-50 border p-3 rounded space-y-1">
                  <p><strong>Name:</strong> {order.name}</p>
                  <p><strong>Phone:</strong> {order.contact}</p>
                  <p><strong>Brand:</strong> {order.brand}</p>
                  <p><strong>Status:</strong> Pending ⏳</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <h1 className="text-4xl font-bold text-center text-red-700 mb-8">
        Choose Your LPG Cylinder Brand
      </h1>

      <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {brands.map((brand, index) => (
          <BrandCard key={index} brand={brand} onSelect={() => handleSelect(brand)} />
        ))}
      </div>
    </div>
  );
};

export default Home;
