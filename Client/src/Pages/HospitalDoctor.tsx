import React from "react";

interface Doctor {
  avatar: string;
  description: string;
  hospitalId: string;
  id: string;
  name: string;
  specialization: string;
}

const HospitalDoctor: React.FC<{ doctor: Doctor }> = ({ doctor }) => {
  return (
    <div className="max-w-xs rounded overflow-hidden shadow-lg m-4">
      <img
        src={doctor.avatar}
        alt={`${doctor.name}'s avatar`}
        className="w-full h-40 object-cover"
      />
      <div className="px-6 py-4 flex flex-col">
        <div className="font-bold text-xl mb-2">Magaca: {doctor.name}</div>
        <p className="text-gray-700 text-sm mb-2">
          <span className="text-xs">Takhasuska: </span> {doctor.specialization}
        </p>
        <p className="text-gray-600 text-base">
          <span className="text-xs">FaahFaahin: </span> {doctor.description}
        </p>
        <button className="p-2 rounded-md mt-7 bg-black text-white">
          Appointments
        </button>
      </div>
    </div>
  );
};

export default HospitalDoctor;
