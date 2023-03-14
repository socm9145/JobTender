import { Routes, Route } from "react-router-dom";
import Navbar from "../../components/Navbar";

import Welcome from "./landing/Welcome";
import Login from "./landing/Login";
import NotFound from "./NotFound";

import { Box } from "@chakra-ui/react";

import "../../styles/Welcome.css";

const LandingPage = () => {
  return (
    <div>
      <Box zIndex={-1} className="background"></Box>
      <Box zIndex={-2} className="landing-background"></Box>
      <Navbar />

      <Routes>
        <Route path="/" element={<Welcome />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default LandingPage;
