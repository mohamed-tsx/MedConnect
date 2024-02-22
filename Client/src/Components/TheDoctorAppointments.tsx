import { useEffect, useState } from "react";
import Appointment from "./Appointment";
import { useParams } from "react-router-dom";
import DoctorAppointments from "../Pages/DoctorAppointments";
import TheDpctorAppointment from "./TheDoctorAppointment";

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

const Appointments = () => {
  const [appointments, setAppointments] = useState<AppointmentData[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const params = useParams();
  const doctorId = params.id;

  useEffect(() => {
    const fetchAllHospitalDoctors = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `/api/appointment/doctorAppointments/${doctorId}`
        );
        const data = await res.json();

        if (data.success === false) {
          setError(data.message);
          return;
        }
        setLoading(false);
        setAppointments(data.appointtments);
      } catch (error) {
        setError("An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllHospitalDoctors();
  }, [doctorId]); // Include doctorId as a dependency

  console.log(appointments);
  return (
    <div className="container mx-auto my-8 p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 rounded-md shadow-md">
      <h2 className="text-3xl font-semibold mb-4">Appointments</h2>
      {loading ? (
        <p className="text-gray-700 text-sm">Loading...</p>
      ) : error ? (
        <p className="text-red-700 text-sm mt-4">{error}</p>
      ) : appointments?.length === 0 ? (
        <p className="text-gray-700 text-sm">No Appointments available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {appointments &&
            appointments.map((appointment: AppointmentData) => (
              <div key={appointment.id} className="flex-shrink-0">
                <TheDpctorAppointment appointment={appointment} />
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Appointments;
