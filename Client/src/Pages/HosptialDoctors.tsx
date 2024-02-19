import { useEffect, useState } from "react";
import HospitalDoctor from "./HospitalDoctor";

interface doctor {
  avatar: string;
  description: string;
  hospitalId: string;
  id: string;
  name: string;
  specialization: string;
}

const HosptialDoctors = () => {
  const [allDoctors, setAllDoctors] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAllHospitalDoctors = async () => {
      const res = await fetch("api/doctors/thedoctors");
      const data = await res.json();

      if (data.success === false) {
        setError(data.message);
        return;
      }
      setAllDoctors(data);
    };
    fetchAllHospitalDoctors();
  }, []);
  return (
    <div className="flex flex-wrap gap">
      {allDoctors &&
        allDoctors.map((doctor: doctor) => (
          <div key={doctor.id}>
            <HospitalDoctor doctor={doctor} />
          </div>
        ))}
      {error && <p className="text-red-700 text-sm">{error}</p>}
    </div>
  );
};

export default HosptialDoctors;
