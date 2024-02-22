import React from "react";
import { RxDragHandleDots2 } from "react-icons/rx";

interface Doctor {
  avatar: string;
  description: string;
  hospitalId: string;
  id: string;
  name: string;
  specialization: string;
}

interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  role: string;
  avatar: string;
}

interface Appointment {
  id: string;
  date: string;
  patientId: string;
  doctorId: string;
  hospitalId: string;
  verificationCode: number;
  Doctor: Doctor;
  User: User;
}

const MyRecentAppointment: React.FC<{ appointment: Appointment }> = ({
  appointment,
}) => {
  return (
    <div className="border p-4">
      <h2 className="text-lg font-semibold">Recent Appointment</h2>
      <div className="flex lg:flex-row items-center gap-4 font-mono">
        <RxDragHandleDots2 />

        <div className="flex flex-col lg:flex-row items-start lg:items-center lg:gap-7">
          <div className="flex flex-col lg:flex-row gap-5">
            <p>Date: {appointment.date}</p>
            <p>Verification Code: {appointment.verificationCode}</p>
          </div>

          {/* Display doctor details */}
          <div className="flex items-center font-medium lg:ml-2">
            <p>For: {appointment.Doctor.name}</p>
          </div>

          {/* Display user details */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-2">
            <p className="">Name: {appointment.User.username}</p>
            <p>Email: {appointment.User.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyRecentAppointment;
