import React from "react";
import { useNavigate } from "react-router-dom";
import BrandCard from "../components/BrandCard";

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

  const handleSelect = (brand) => {
    navigate("/request", { state: { selectedBrand: brand } });
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-red-50 to-white">
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
