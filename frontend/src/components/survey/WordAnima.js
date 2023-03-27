import React, { useEffect } from "react";

import "../../styles/WordAnima.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WordAnima = () => {
  useEffect(() => {
    const spacing = 0.1,
      cards = gsap.utils.toArray(".cards li");

    gsap.set(cards, { xPercent: 400, opacity: 0, scale: 0 });

    const anim = gsap.timeline({
      scrollTrigger: {
        trigger: ".cards",
        pin: ".gallery",
        start: "top center",
        end: () =>
          (wordList.length - 1) * spacing * 1000 - window.innerHeight / 2,
        scrub: 1,
      },
    });

    cards.forEach((card, i) => {
      anim
        .fromTo(
          card,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            zIndex: 100,
            duration: 0.5,
            yoyo: true,
            repeat: 1,
            ease: "power1.in",
            immediateRender: false,
          },
          i * spacing
        )
        .fromTo(
          card,
          { xPercent: 400 },
          {
            xPercent: -400,
            duration: 1,
            ease: "none",
            immediateRender: false,
          },
          i * spacing
        );
    });
  }, []);

  const wordList = [
    "apple",
    "banana",
    "cherry",
    "date",
    "fig",
    "grape",
    "kiwi",
    "lemon",
    "mango",
    "nectarine",
    "orange",
    "papaya",
    "quince",
    "raspberry",
    "strawberry",
    "tangerine",
    "watermelon",
    "blueberry",
    "coconut",
    "durian",
    "elderberry",
    "guava",
    "honeydew",
    "jackfruit",
    "kumquat",
    "lime",
    "mulberry",
    "olive",
    "pear",
    "plum",
    "currant",
    "blackberry",
    "peach",
    "pineapple",
    "apricot",
    "avocado",
    "cantaloupe",
    "grapefruit",
    "lychee",
    "passionfruit",
    "persimmon",
    "pomegranate",
    "salmonberry",
    "soursop",
    "tomato",
    "ugli fruit",
    "vanilla",
    "walnut",
    "xigua",
    "yew",
    "zucchini",
    "acai",
    "boysenberry",
    "cucumber",
    "dragon fruit",
  ];

  return (
    <div>
      <div className="gallery">
        <ul className="cards">
          {wordList.map((word, index) => (
            <li key={index}>{word}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WordAnima;
