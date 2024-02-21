// AddAppointmentModal.js

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Appointment {
  id: string;
  date: string;
  patientId: string;
  doctorId: string;
  description: string;
  verificationCode: number;
}

interface AddAppointmentModalProps {
  showModal: boolean;
  onClose: () => void;
  doctorId: string;
}

const AddAppointmentModal: React.FC<AddAppointmentModalProps> = ({
  showModal,
  onClose,
  doctorId,
}) => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `/api/appointment/addAppointment/${doctorId}`
        );
        if (response.status === 401) {
          navigate("/signin");
          return;
        }

        const result = await response.json();

        if (result.success === false) {
          setError(result.message);
          return;
        }

        // Assuming result.appointments is an array of appointments
        setAppointments(result.appointment);
      } catch (error) {
        setError("Something went wrong");
      }
    };

    if (showModal) {
      fetchData();
    }
  }, [showModal, doctorId, navigate]);

  return (
    <div>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-gray-800 opacity-50"></div>
          <div className="bg-white p-6 rounded z-10">
            <h3 className="text-4xl text-center font-semibold mb-4">
              {appointments.verificationCode}
            </h3>
            <button onClick={() => onClose()}>Close</button>
            {error && <p className="text-red-600 text-sm">{error}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default AddAppointmentModal;
