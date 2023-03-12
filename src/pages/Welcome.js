import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
const Welcome = () => {
  const circleRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      "#thirdCircle1",
      { autoAlpha: 0, x: -1000 },
      {
        autoAlpha: 1,
        x: -400,
        duration: 2,
        scrollTrigger: {
          trigger: "#thirdCircle1",
          markers: true,
          start: "top 80%",
        },
      }
    );
    gsap.fromTo(
      "#thirdCircle2",
      { autoAlpha: 0, x: 1000 },
      {
        autoAlpha: 1,
        x: 400,
        duration: 2,
        scrollTrigger: {
          trigger: "#thirdCircle2",
          markers: true,
          start: "top 80%",
        },
      }
    );
    gsap.fromTo(
      "#thirdCircle3",
      { autoAlpha: 0, x: -1000 },
      {
        autoAlpha: 1,
        x: -400,
        duration: 2,
        scrollTrigger: {
          trigger: "#thirdCircle3",
          markers: true,
          start: "top 80%",
        },
      }
    );
    gsap.fromTo(
      "#thirdCircle4",
      { autoAlpha: 0, x: 1000 },
      {
        autoAlpha: 1,
        x: 400,
        duration: 2,
        scrollTrigger: {
          trigger: "#thirdCircle4",
          markers: true,
          start: "top 80%",
        },
      }
    );
    gsap.fromTo(
      "#thirdCircle5",
      { autoAlpha: 0, x: -1000 },
      {
        autoAlpha: 1,
        x: -400,
        duration: 2,
        scrollTrigger: {
          trigger: "#thirdCircle5",
          markers: true,
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <div>
      <box className="circlebox">
        <div className="circle" ref={circleRef} id="thirdCircle1"></div>
      </box>
      <box className="circlebox">
        <div className="circle" ref={circleRef} id="thirdCircle2"></div>
      </box>
      <box className="circlebox">
        <div className="circle" ref={circleRef} id="thirdCircle3"></div>
      </box>
      <box className="circlebox">
        <div className="circle" ref={circleRef} id="thirdCircle4"></div>
      </box>
      <box className="circlebox">
        <div className="circle" ref={circleRef} id="thirdCircle5"></div>
      </box>
    </div>
  );
};

export default Welcome;
