import { useState } from "react";
import AddDoctorModal from "../Components/AddDoctorModal"; // Adjust the path based on your project structure

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="flex flex-col mt-10">
      <button
        className="bg-black text-white px-4 py-2 rounded hover:bg-gray-700 float-left"
        onClick={() => setShowModal(true)}
      >
        Add New Doctor
      </button>
      <div>
        <hr className="mt-5" />
      </div>
      
      <AddDoctorModal
        showModal={showModal}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
};

export default Dashboard;
