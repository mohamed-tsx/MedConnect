import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Header from "./Components/Header";
import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";
import Dashboard from "./Components/Dashboard";

function App() {
  return (
    <div className="p-10">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
