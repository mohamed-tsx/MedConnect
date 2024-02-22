import React from "react";

interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  role: string;
  avatar: string;
}

interface AppointmentData {
  id: string;
  date: string;
  patientId: string;
  doctorId: string;
  hospitalId: string;
  verificationCode: number;
  User: User;
}

const TheDoctorAppointment: React.FC<{ appointment: AppointmentData }> = ({
  appointment,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mx-4 my-4">
      <p className="text-2xl text-center font-medium text-black">
        Verification Code: {appointment.verificationCode}
      </p>
      <div className="patient-details mt-4">
        <h4 className="text-xl font-semibold mb-2 text-black">
          Patient Details
        </h4>
        <p className="mb-2 text-black">
          <strong>Name:</strong> {appointment.User.username}
        </p>
        <p className="mb-2 text-black">
          <strong>Email:</strong> {appointment.User.email}
        </p>
      </div>
    </div>
  );
};

export default TheDoctorAppointment;
