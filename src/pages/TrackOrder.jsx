import React, { useState } from "react";
import toast from "react-hot-toast";

const TrackOrder = () => {
  const [trackingId, setTrackingId] = useState("");
  const [order, setOrder] = useState(null);

  const handleSearch = () => {
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
    <div className="min-h-screen bg-gradient-to-br from-white to-red-50 flex justify-center items-center p-6">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-md border border-gray-200 space-y-4">
        <h2 className="text-2xl font-bold text-center text-red-600">Track Your Order</h2>

        <input
          type="text"
          placeholder="Enter your Tracking ID"
          value={trackingId}
          onChange={(e) => setTrackingId(e.target.value)}
          className="w-full p-3 border rounded-lg"
        />
        <button
          onClick={handleSearch}
          className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition"
        >
          Track
        </button>

        {order && (
          <div className="bg-gray-50 p-4 rounded-lg border text-sm mt-4">
            <p><strong>Name:</strong> {order.name}</p>
            <p><strong>Phone:</strong> {order.contact}</p>
            <p><strong>Address:</strong> {order.address}</p>
            <p><strong>Brand:</strong> {order.brand}</p>
            <p><strong>Vendor ID:</strong> {order.vendorId}</p>
            <p><strong>Status:</strong> Pending ⏳</p>
            <p><strong>Tracking ID:</strong> {order.trackingId}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackOrder;
