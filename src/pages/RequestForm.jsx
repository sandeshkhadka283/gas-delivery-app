import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const RequestForm = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const selectedBrand = state?.selectedBrand || "";

  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    address: "",
    brand: selectedBrand,
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.contact || !formData.address) {
      alert("Please fill all fields.");
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
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-300 outline-none"
            onChange={handleChange}
            value={formData.name}
            required
          />
          <input
            name="contact"
            placeholder="Contact Number"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-300 outline-none"
            onChange={handleChange}
            value={formData.contact}
            required
          />
          <textarea
            name="address"
            placeholder="Delivery Address"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-300 outline-none"
            onChange={handleChange}
            value={formData.address}
            required
          />
          <input
            readOnly
            name="brand"
            value={formData.brand}
            className="w-full p-3 bg-gray-100 border rounded-lg text-gray-600 cursor-not-allowed"
          />
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
