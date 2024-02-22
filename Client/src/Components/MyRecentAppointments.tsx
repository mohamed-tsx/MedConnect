import { useEffect, useState } from "react";
import MyRecentAppointment from "./MyRecentAppointment";

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
const MyRecentAppointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAllHospitalDoctors = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/appointment/recentAppointments/`);
        const data = await res.json();

        if (data.success === false) {
          setError(data.message);
          return;
        }

        setAppointments(data);
      } catch (error) {
        setError("An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllHospitalDoctors();
  }, []);
  appointments.map((appointment: Appointment) =>
    console.log(appointment.Doctor)
  );
  return (
    <div className="container mx-auto my-8 p-4 rounded-md shadow-md">
      <h2 className="text-3xl font-semibold mb-4">Recent Appointments</h2>
      {loading ? (
        <p className="text-gray-700 text-sm">Loading...</p>
      ) : error ? (
        <p className="text-red-700 text-sm mt-4">{error}</p>
      ) : appointments.length === 0 ? (
        <p className="text-gray-700 text-sm">No doctors available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-6">
          {appointments.map((appointment: Appointment) => (
            <div key={appointment.id} className="h-full">
              <MyRecentAppointment appointment={appointment} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyRecentAppointments;
