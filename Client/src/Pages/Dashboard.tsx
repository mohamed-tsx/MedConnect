import { useState } from "react";
import AddDoctorModal from "../Components/AddDoctorModal"; // Adjust the path based on your project structure

const Dashboard = ({ onDoctorAdded, hospitalId }: any) => {
  const [showModal, setShowModal] = useState(false);

  const handleDoctorAdded = (newDoctor: any) => {
    // Your logic for handling the addition of a new doctor
    console.log("New Doctor Added:", newDoctor);
  };

  return (
    <div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={() => setShowModal(true)}
      >
        Add New Doctor
      </button>

      <AddDoctorModal
        showModal={showModal}
        onClose={() => setShowModal(false)}
        onDoctorAdded={handleDoctorAdded}
        hospitalId={hospitalId}
      />
    </div>
  );
};

export default Dashboard;
