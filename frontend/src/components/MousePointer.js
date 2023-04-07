import { useEffect } from "react";

import { gsap } from "gsap";

const MousePointer = () => {
  useEffect(() => {
    const bigBall = document.querySelector(".cursor__ball--big");
    const smallBall = document.querySelector(".cursor__ball--small");

    if (!bigBall || !smallBall) {
      return;
    }

    document.body.addEventListener("mousemove", onMouseMove);
    document.body.addEventListener("mouseover", (e) => {
      if (e.target.classList.contains("hoverable")) {
        onMouseHover();
      }
    });
    document.body.addEventListener("mouseout", (e) => {
      if (e.target.classList.contains("hoverable")) {
        onMouseHoverOut();
      }
    });

    function onMouseMove(e) {
      gsap.to(bigBall, 0.1, {
        x: e.clientX - 15,
        y: e.clientY - 15,
      });
      gsap.to(smallBall, 0.1, {
        x: e.clientX - 7.5,
        y: e.clientY - 7.5,
      });
    }

    function onMouseHover() {
      gsap.to(bigBall, 0.3, {
        scale: 4,
      });
    }

    function onMouseHoverOut() {
      gsap.to(bigBall, 0.3, {
        scale: 1,
      });
    }

    return () => {
      document.body.removeEventListener("mousemove", onMouseMove);
      document.body.removeEventListener("mouseover", onMouseHover);
      document.body.removeEventListener("mouseout", onMouseHoverOut);
    };
  }, []);

  return null;
};

export default MousePointer;
