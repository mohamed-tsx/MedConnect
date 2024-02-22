import React from "react";

interface Doctor {
  avatar: string;
  description: string;
  hospitalId: string;
  id: string;
  name: string;
  specialization: string;
}

interface AppointmentData {
  id: string;
  date: string;
  patientId: string;
  doctorId: string;
  hospitalId: string;
  verificationCode: number;
  Doctor: Doctor;
}

const Appointment: React.FC<{ appointment: AppointmentData }> = ({
  appointment,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mx-4 my-4">
      <p className="text-3xl text-center font-medium mb-4">
        Your number is {appointment.verificationCode}
      </p>
      <div className="doctor-details">
        <h4 className="text-xl font-semibold mb-2">Doctor Details</h4>
        <p className="mb-2">
          <strong>Doctor Name:</strong> {appointment.Doctor.name}
        </p>
        <p>
          <strong>Specialization:</strong> {appointment.Doctor.specialization}
        </p>
      </div>
    </div>
  );
};

export default Appointment;
