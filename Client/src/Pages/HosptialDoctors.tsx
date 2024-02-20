// Add CSS classes for styling
import { useEffect, useState } from "react";
import HospitalDoctor from "./HospitalDoctor";
import { useAppSelector } from "../Redux/Hooks/reduxhooks";
import { RootState } from "../Redux/store";

interface Doctor {
  avatar: string;
  description: string;
  hospitalId: string;
  id: string;
  name: string;
  specialization: string;
}

const HosptialDoctors = () => {
  const [allDoctors, setAllDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAllHospitalDoctors = async () => {
      try {
        const res = await fetch("api/doctors/thedoctors");
        const data = await res.json();

        if (data.success === false) {
          setError(data.message);
          return;
        }

        setAllDoctors(data);
      } catch (error) {
        setError("An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllHospitalDoctors();
  }, []);
  const { user } = useAppSelector((state: RootState) => state.user);

  return (
    <div className="container mx-auto my-8 p-4 rounded-md shadow-md">
      <h2 className="text-3xl font-semibold mb-4">
        {user?.username}'s Doctors
      </h2>
      {loading ? (
        <p className="text-gray-700 text-sm">Loading...</p>
      ) : (
        <>
          {allDoctors.length === 0 ? (
            <p className="text-gray-700 text-sm">No doctors available.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {allDoctors.map((doctor: Doctor) => (
                <div key={doctor.id} className="flex flex-col h-full">
                  <HospitalDoctor doctor={doctor} />
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
