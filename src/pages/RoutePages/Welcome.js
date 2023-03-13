import { useState, useEffect } from "react";

import Navbar from "../../components/Navbar";
import Describes from "../../components/welcome/Describes";
import WelcomeMessage from "../../components/welcome/WelcomeMessage";

import "../../styles/Welcome.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Welcome = () => {
  const [nextView, setNextView] = useState(false);

  return (
    <div width="100%">
      <Navbar />
      {nextView ? (
        <Describes />
      ) : (
        <WelcomeMessage setNextView={setNextView} nextView={nextView} />
      )}
    </div>
  );
};

export default Welcome;
