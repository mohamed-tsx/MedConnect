// Add CSS classes for styling
import { useEffect, useState } from "react";
import Hospital from "./Hospital";

interface Hospital {
  avatar: string;
  description: string;
  hospitalId: string;
  id: string;
  username: string;
  specialization: string;
  doctors: Doctor[];
}
interface Doctor {
  avatar: string;
  description: string;
  hospitalId: string;
  id: string;
  name: string;
  specialization: string;
}

const HosptialDoctors = () => {
  const [allHospitals, setAllHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAllHospitalDoctors = async () => {
      try {
        const res = await fetch("api/doctors/allHospitals");
        const data = await res.json();

        if (data.success === false) {
          setError(data.message);
          return;
        }

        setAllHospitals(data);
      } catch (error) {
        setError("An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllHospitalDoctors();
  }, []);

  return (
    <div className="container mx-auto my-8 p-4 rounded-md shadow-md">
      <h2 className="text-3xl font-semibold mb-4">Available Hospitals</h2>
      {loading ? (
        <p className="text-gray-700 text-sm">Loading...</p>
      ) : (
        <>
          {allHospitals.length === 0 ? (
            <p className="text-gray-700 text-sm">No hospitals available.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {allHospitals.map((hospital: Hospital) => (
                <div key={hospital.id} className="flex flex-col h-full">
                  <Hospital hospital={hospital} />
                </div>
              ))}
            </div>
          )}
          {error && <p className="text-red-700 text-sm mt-4">{error}</p>}
        </>
      )}
    </div>
  );
};

export default HosptialDoctors;
