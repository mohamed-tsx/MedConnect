import { Outlet, Navigate } from "react-router-dom";
import { RootState } from "../Redux/store";
import { useAppSelector } from "../Redux/Hooks/reduxhooks";

const ProtectedRoute = () => {
  const { user } = useAppSelector((state: RootState) => state.user);

  return user && user.role === "hostpial" ? (
    <Outlet />
  ) : (
    <Navigate to={"signin"} />
  );
};

export default ProtectedRoute;
