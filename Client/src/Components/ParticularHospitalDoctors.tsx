import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ParticularHospitalDoctor from "./ParticularHospitalDoctor";

interface Doctor {
  avatar: string;
  description: string;
  hospitalId: string;
  id: string;
  name: string;
  specialization: string;
}

const ParticularHospitalDoctors = () => {
  const [allDoctors, setAllDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const params = useParams();

  useEffect(() => {
    const fetchAllHospitalDoctors = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `/api/doctors/allDoctorOfParticularHospital?hospitalId=${params.hospitalId}`
        );
        const data = await res.json();

        if (data.success === false) {
          setError(data.message);
          return;
        }

        setAllDoctors(data.doctors);
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
      <h2 className="text-3xl font-semibold mb-4">Available Doctors</h2>
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
                  <ParticularHospitalDoctor doctor={doctor} />
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

export default ParticularHospitalDoctors;
