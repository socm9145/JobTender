import "../../styles/LoginAnima.css";

import { gsap } from "gsap";
import { EasePack } from "gsap/EasePack";
gsap.registerPlugin(EasePack);

const LoginAnima = () => {
  const xmlns = "http://www.w3.org/2000/svg";
  const xlinkns = "http://www.w3.org/1999/xlink";
  const select = (s) => {
    return document.querySelector(s);
  };
  const selectAll = (s) => {
    return document.querySelectorAll(s);
  };

  const mainSVG = select(".mainSVG");
  const bubble = select(".bubble");
  console.log(bubble);

  var maintimeline = new gsap.timeline({
    paused: true,
  });

  var particleColorArray = [
    "#69D2E7",
    "#A7DBD8",
    "#E0E4CC",
    "#F38630",
    "#FA6900",
  ];

  var numBubbles = 100;

  //behind
  for (var i = 0; i < numBubbles / 2; i++) {
    var colorId = Math.floor(Math.random() * particleColorArray.length);

    var p = bubble.cloneNode(true);
    mainSVG.insertBefore(p, mainSVG.firstChild);
    var startRadius = randomIntFromInterval(2, 32);
    gsap.TweenMax.set(p, {
      attr: {
        cx: randomIntFromInterval(200, 300),
        cy: randomIntFromInterval(400, 400),
        r: 0,
      },
      fill: particleColorArray[colorId],
    });

    p.startRadius = startRadius;

    var dur = randomIntFromInterval(8, 10);
    var angle = randomIntFromInterval(0, 90);
    var tl = new gsap.timeline({
      repeat: 3,
    });

    tl.to(p, dur / 2, {
      attr: {
        r: startRadius,
      },
    })
      .to(
        p,
        dur,
        {
          transformOrigin: "30% 50%",
          rotation: -180,
          alpha: 1,
          attr: {
            cy: 700,
          },
          physics2D: {
            velocity: -0,
            angle: angle,
            acceleration: 0,
            gravity: -2,
            accelerationAngle: 0,
          },
        },
        "-=" + dur / 2
      )
      .to(
        p,
        dur / 2,
        {
          attr: {
            r: 0,
          },
        },
        "-=" + dur / 2
      );

    maintimeline.add(tl, i / 2);
  }

  //in front
  for (var i = 0; i < numBubbles; i++) {
    var colorId = Math.floor(Math.random() * particleColorArray.length);

    var p = bubble.cloneNode(true);
    mainSVG.appendChild(p);
    var startRadius = randomIntFromInterval(1, 20);
    gsap.TweenMax.set(p, {
      attr: {
        cx: randomIntFromInterval(250, 350),
        cy: randomIntFromInterval(350, 500),
        r: 0,
      },
      fill: particleColorArray[colorId],
    });

    var dur = randomIntFromInterval(10, 12);
    var angle = randomIntFromInterval(0, -90);
    var tl = new gsap.timeline({
      repeat: 3,
    });
    tl.to(p, dur / 2, {
      attr: {
        r: startRadius,
      },
    })
      .to(
        p,
        dur,
        {
          //transformOrigin:'30% 50%',
          rotation: 280,
          //repeat:-1,
          alpha: 1,
          attr: {
            //r:p.startRadius,
            cy: 650,
          },
          physics2D: {
            velocity: -20,
            angle: angle,
            acceleration: -2,
            gravity: -10,
            accelerationAngle: 0,
          },
        },
        "-=" + dur / 2
      )
      .to(
        p,
        dur / 2,
        {
          attr: {
            r: 0,
          },
        },
        "-=" + dur / 2
      );

    maintimeline.add(tl, i / 8);
  }

  //top of head
  for (var i = 0; i < numBubbles; i++) {
    var colorId =
      Math.floor(Math.random() * (particleColorArray.length - 1)) + 1;

    var p = bubble.cloneNode(true);
    mainSVG.insertBefore(p, mainSVG.firstChild);
    var startRadius = randomIntFromInterval(2, 10);
    gsap.TweenMax.set(p, {
      attr: {
        cx: randomIntFromInterval(250, 350),
        cy: randomIntFromInterval(190, 210),
        r: startRadius,
      },
      //filter:'url(#colorMeHueRotate)',
      fill: particleColorArray[colorId],
    });

    //p.startRadius = startRadius;

    var dur = randomIntFromInterval(6, 10);
    var angle = randomIntFromInterval(0, 90);

    var t = gsap.TweenMax.fromTo(
      p,
      dur,
      {
        alpha: 1,
        attr: {
          r: startRadius,
        },
      },
      {
        transformOrigin: "30% 650%",
        rotation: -0,
        repeat: 3,
        alpha: 1,
        attr: {
          r: 0,
          cx: "+=30",
        },
        physics2D: {
          velocity: 0,
          angle: angle,
          acceleration: 0,
          gravity: -20,
          accelerationAngle: 90,
        },
      }
    );

    maintimeline.add(t, i / 6);
  }

  function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  var allTl = new gsap.timeline({
    repeat: 1,
    yoyo: true,
    paused: false,
  });
  allTl.timeScale(1.41);
  allTl.to(maintimeline, 20, {
    time: maintimeline.duration(),
    ease: "power2.out",
  });

  gsap.TweenMax.globalTimeScale(0.5);
  return (
    <div>
      <svg
        class="mainSVG"
        preserveAspectRatio="xMidYMin meet"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 600 600"
      >
        <defs>
          <circle class="bubble" cx="0" cy="0" r="0" />
        </defs>

        <path
          id="face"
          fill="#FDF7EE"
          d="M250.1,477.1c0,0,17.9-37.5,28.3-47.5c8.3-8,10.9-12.4,40.4,0c29.5,12.4,38.1,8.5,45.1,3.1
	c7-5.4,8.2-19.8,6.9-23.8c-1.3-4.1,3.4-9.3,6.3-9c2.9,0.3,7.7-3.1,8-6.6s0.4-3.2-0.9-8.6c2.8-1,16.2-3.4,9.3-15
	c-6.8-11.7,3.8-15.1,3.8-15.1s19.2-0.2,19.4-11.7c0.2-11.5-17.1-33.2-17.9-40.6c-0.8-7.4,3.5-18.1,3.5-18.1s15.1-38.8-3.5-75.7
	c-18.6-36.9-69.1-52-88.2-53.6c-40-3.3-86.6,12.4-103.7,65.3s-4.2,92.3-4.7,108.8c-1.6,56-45.6,91.3-45.6,91.3L250.1,477.1z"
        />
      </svg>
    </div>
  );
};

export default LoginAnima;
