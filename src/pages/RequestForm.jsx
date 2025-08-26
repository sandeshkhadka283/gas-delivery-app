import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getDistance } from "geolib";

// You can move this to a separate file like vendorData.js
const vendors = [
  {
    id: 1,
    name: "Sita Gas Distributor",
    brand: "Nepal Gas",
    location: { lat: 27.7172, lng: 85.3240 }, // Kathmandu
    isAvailable: true,
  },
  {
    id: 2,
    name: "Himal Gas Center",
    brand: "Himal",
    location: { lat: 27.6720, lng: 85.4298 }, // Bhaktapur
    isAvailable: true,
  },
  {
    id: 3,
    name: "Om Gas Suppliers",
    brand: "Om",
    location: { lat: 27.7100, lng: 85.3200 }, // Kathmandu
    isAvailable: false,
  },
  // Add more vendors as needed
];

const RequestForm = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const selectedBrand = state?.selectedBrand || "";

  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    address: "",
    brand: selectedBrand,
    vendorId: "",
  });

  const [userLocation, setUserLocation] = useState(null);
  const [nearbyVendors, setNearbyVendors] = useState([]);

  // 1. Get User Location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const location = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          };
          setUserLocation(location);
        },
        (err) => console.error("Location error:", err)
      );
    }
  }, []);

  // 2. Filter Nearby Vendors
  useEffect(() => {
    if (userLocation) {
      const filtered = vendors
        .filter(
          (vendor) =>
            vendor.brand === selectedBrand &&
            vendor.isAvailable &&
            getDistance(userLocation, vendor.location) <= 10000 // within 10km
        )
        .map((vendor) => ({
          ...vendor,
          distance: getDistance(userLocation, vendor.location) / 1000, // in km
        }));

      setNearbyVendors(filtered);
    }
  }, [userLocation, selectedBrand]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.contact || !formData.address || !formData.vendorId) {
      alert("Please fill all fields and select a vendor.");
      return;
    }

    alert(`✅ Request submitted:\n\n${JSON.stringify(formData, null, 2)}`);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-red-50 flex justify-center items-center p-6">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-md border border-gray-200">
        <h2 className="text-3xl font-bold text-red-600 text-center mb-6">Gas Delivery Request</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Full Name"
            className="w-full p-3 border rounded-lg"
            onChange={handleChange}
            value={formData.name}
            required
          />
          <input
            name="contact"
            placeholder="Contact Number"
            className="w-full p-3 border rounded-lg"
            onChange={handleChange}
            value={formData.contact}
            required
          />
          <textarea
            name="address"
            placeholder="Delivery Address"
            className="w-full p-3 border rounded-lg"
            onChange={handleChange}
            value={formData.address}
            required
          />
          <input
            readOnly
            name="brand"
            value={formData.brand}
            className="w-full p-3 bg-gray-100 border rounded-lg text-gray-600"
          />

          {/* Vendor Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Nearby Vendor</label>
            {nearbyVendors.length > 0 ? (
              <select
                name="vendorId"
                value={formData.vendorId}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
                required
              >
                <option value="">-- Select a Vendor --</option>
                {nearbyVendors.map((vendor) => (
                  <option key={vendor.id} value={vendor.id}>
                    {vendor.name} ({vendor.distance.toFixed(1)} km)
                  </option>
                ))}
              </select>
            ) : (
              <p className="text-red-500 text-sm">No nearby vendors available for {selectedBrand}.</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 text-white font-semibold py-3 rounded-lg hover:bg-red-700 transition"
          >
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default RequestForm;
