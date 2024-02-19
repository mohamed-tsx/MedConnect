// AddDoctorModal.js

import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

interface FormData {
  name: string;
  specialization: string;
  description: string;
}
interface Doctor {
  id: string;
  name: string;
  hospitalId: string;
  specialization: string;
  description: string;
  avatar: string;
}

interface AddDoctorModalProps {
  showModal: boolean;
  onClose: () => void;
}

const AddDoctorModal: React.FC<AddDoctorModalProps> = ({
  showModal,
  onClose,
}) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    specialization: "",
    description: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const [error, setError] = useState("");

  const handleAddDoctor = async (e: FormEvent) => {
    e.preventDefault();

    try {
      // Make an API request to add a new doctor
      const response = await fetch(`/api/doctors/createDoctorProfile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
        }),
      });
      if (response.statusText === "Unauthorized") {
        navigate("/signin");
      }
      const result = await response.json();

      if (result.success === false) {
        setError(result.message);
        return;
      }
      // API request was successful

      // Clear the form fields
      setFormData({
        name: "",
        specialization: "",
        description: "",
      });

      // Close the modal after adding a doctor
      onClose();
    } catch (error) {
      setError("Something went wrong");
    }
  };

  return (
    <div>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-gray-800 opacity-50"></div>
          <div className="bg-white p-6 rounded z-10">
            <h3 className="text-lg font-semibold mb-4">Add New Doctor</h3>
            <form onSubmit={handleAddDoctor}>
              <label className="block mb-2">
                Name:
                <input
                  className="border rounded w-full py-2 px-3"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </label>
              <label className="block mb-2">
                Specialization:
                <input
                  className="border rounded w-full py-2 px-3"
                  type="text"
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleInputChange}
                />
              </label>
              <label className="block mb-2">
                Description:
                <textarea
                  className="border rounded w-full py-2 px-3"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </label>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                type="submit"
              >
                Add Doctor
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 ml-2"
                type="button"
                onClick={onClose}
              >
                Close
              </button>
            </form>
            {error && <p className="text-red-600 text-sm">{error}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default AddDoctorModal;
