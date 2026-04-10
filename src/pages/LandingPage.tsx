
import React from "react";

const LandingPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">
        Welcome to Verden
      </h1>
      <p className="text-xl text-center mb-12">
        Your Eco-Navigator for a sustainable world.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">High-Fidelity 3D Navigation</h2>
          <p>
            Experience your routes in stunning 3D, providing a clear and
            intuitive understanding of your journey.
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">Eco-Conscious Routing</h2>
          <p>
            Our advanced algorithms find the most fuel-efficient routes,
            helping you save money and reduce your carbon footprint.
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">Real-time Vehicle Dynamics</h2>
          <p>
            Visualize your vehicle's performance and driving habits to
            encourage safer and more efficient driving.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
