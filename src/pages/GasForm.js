import React, { useState } from "react";

const GasForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    address: "",
    cylinderType: "Normal",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.contact || !formData.address) {
      alert("Please fill all required fields.");
      return;
    }

    // For now, just show an alert. Replace this with API call later.
    alert(`Request submitted:\n\n${JSON.stringify(formData, null, 2)}`);

    // Reset form
    setFormData({
      name: "",
      contact: "",
      address: "",
      cylinderType: "Normal",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="name"
        placeholder="Full Name"
        className="w-full p-2 border rounded"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        type="tel"
        name="contact"
        placeholder="Contact Number"
        className="w-full p-2 border rounded"
        value={formData.contact}
        onChange={handleChange}
        required
      />
      <textarea
        name="address"
        placeholder="Full Delivery Address"
        className="w-full p-2 border rounded"
        value={formData.address}
        onChange={handleChange}
        required
      />
      <select
  name="cylinderType"
  className="w-full p-2 border rounded"
  value={formData.cylinderType}
  onChange={handleChange}
  required
>
  <option value="">Select Brand</option>
  {[
    "Amber", "Arati", "Baba", "Bhanu", "Bheri", "Butwal", "Chadi", "Everest", "NL", "Himal",
    "Gita", "Grihalaxmi", "HP", "Jagadamba", "Janaki", "Shree Maya", "Kankai", "Koshi", "Leo",
    "Lumbini", "Manakamana", "Manoj", "Subidha", "Mechi", "STC", "Namaste", "Narayani",
    "Nepal Gas (Narayani)", "Nepal Gas", "Nobel", "Om", "Sostik", "Parajuli", "Pathibhara",
    "Prima", "Rajdhani", "Rapti", "Rijalco", "Rediant", "Sagar", "Sahara", "Saibaba", "Shakti",
    "Shree", "Tara", "Shree Krishna", "Shreeram", "Siddhanath", "Siddhartha", "Kamakhaya",
    "Sugam", "Super", "Surya", "Trishul", "Triveni", "Lokpriya"
  ].map((brand, index) => (
    <option key={index} value={brand}>{brand}</option>
  ))}
</select>

      <button
        type="submit"
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 w-full"
      >
        Submit Request
      </button>
    </form>
  );
};

export default GasForm;
