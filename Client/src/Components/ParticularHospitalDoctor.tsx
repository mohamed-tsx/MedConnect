import React from "react";
import { Link } from "react-router-dom";

interface Doctor {
  avatar: string;
  description: string;
  hospitalId: string;
  id: string;
  name: string;
  specialization: string;
}

const ParticularHospitalDoctor: React.FC<{ doctor: Doctor }> = ({ doctor }) => {
  return (
    <div className="w-full h-full max-w-xs rounded overflow-hidden shadow-lg m-4 border border-gray-300">
      <div className="flex justify-between">
        <img
          src={doctor.avatar}
          alt={`Avatar of ${doctor.name}`}
          className="w-full h-40 object-cover"
        />
      </div>
      <div className="px-6 py-4 flex flex-col">
        <div className="font-semibold text-lg mb-2">Magaca: {doctor.name}</div>
        {doctor.specialization && (
          <p className="text-gray-700 text-sm mb-2">
            <span className="text-xs">Takhasuska: </span>{" "}
            {doctor.specialization}
          </p>
        )}
        {doctor.description && (
          <p className="text-gray-600 text-base">
            <span className="text-xs">FaahFaahin: </span> {doctor.description}
          </p>
        )}
        <Link
          to="/dashboard"
          className="p-2 rounded-md mt-4 bg-black text-white text-center hover:bg-gray-900 transition"
        >
          Book this Doctor
        </Link>
      </div>
    </div>
  );
};

export default ParticularHospitalDoctor;
