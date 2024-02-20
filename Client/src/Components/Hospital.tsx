import React from "react";
import { Link } from "react-router-dom";

interface HospitalDoctor {
  avatar: string;
  description: string;
  hospitalId: string;
  id: string;
  username: string;
  specialization: string;
  doctors: Doctor[];
}
interface Doctor {
  avatar: string;
  description: string;
  hospitalId: string;
  id: string;
  name: string;
  specialization: string;
}

const Hospital: React.FC<{ hospital: HospitalDoctor }> = ({ hospital }) => {
  return (
    <div className="w-full h-full max-w-xs rounded overflow-hidden shadow-lg m-4 border border-gray-300">
      <div className="flex justify-between">
        <img
          src={hospital.avatar}
          alt={`Avatar of ${hospital.username}`}
          className="w-full h-40 object-cover"
        />
      </div>
      <div className="px-6 py-4 flex flex-col">
        <div className="font-semibold text-lg mb-2">
          Magaca: {hospital.username}
        </div>
        {hospital.doctors && hospital.doctors.length > 0 ? (
          <p className="text-gray-700 text-sm mb-2">
            <span className="text-xs">Waxaa ka shaqeeya: </span>{" "}
            {hospital.doctors.length} doctors
          </p>
        ) : (
          <p>TThere's no available doctors in this hospital</p>
        )}

        <Link
          to={`/doctors/${hospital.id}`}
          className="p-2 rounded-md mt-4 bg-black text-white text-center hover:bg-gray-900 transition"
        >
          View Doctors
        </Link>
      </div>
    </div>
  );
};

export default Hospital;
