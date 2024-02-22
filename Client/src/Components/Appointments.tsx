import { useEffect, useState } from "react";
import Appointment from "./Appointment";

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

const Appointments = () => {
  const [appointments, setAppointments] = useState<AppointmentData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchAllHospitalDoctors = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/appointment/patientAppointments/`);
        const data = await res.json();

        if (data.success === false) {
          setError(data.message);
          return;
        }

        setAppointments(data.appointments);
      } catch (error) {
        setError("An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllHospitalDoctors();
  }, []);

  return (
    <div className="container mx-auto my-8 p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 rounded-md shadow-md">
      <h2 className="text-3xl font-semibold mb-4">My Appointments</h2>
      {loading ? (
        <p className="text-gray-700 text-sm">Loading...</p>
      ) : error ? (
        <p className="text-red-700 text-sm mt-4">{error}</p>
      ) : appointments.length === 0 ? (
        <p className="text-gray-700 text-sm">No Appointments available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {appointments.map((appointment: AppointmentData) => (
            <div key={appointment.id} className="flex-shrink-0">
              <Appointment appointment={appointment} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Appointments;
