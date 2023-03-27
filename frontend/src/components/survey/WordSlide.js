import { useState, useEffect } from "react";
import "../../styles/survey/WordSlide.css";

import { Box, Text } from "@chakra-ui/react";

const WordSlide = () => {
  useEffect(() => {
    var items = document.querySelectorAll(".timeline li");

    function isElementInViewport(el) {
      var rect = el.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <=
          (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <=
          (window.innerWidth || document.documentElement.clientWidth)
      );
    }

    function callbackFunc() {
      for (var i = 0; i < items.length; i++) {
        if (isElementInViewport(items[i])) {
          if (!items[i].classList.contains("in-view")) {
            items[i].classList.add("in-view");
          }
        } else if (items[i].classList.contains("in-view")) {
          items[i].classList.remove("in-view");
        }
      }
    }

    window.addEventListener("load", callbackFunc);
    window.addEventListener("scroll", callbackFunc);
  }, []);

  const words = [
    "김",
    "사랑",
    "친구",
    "가족",
    "행복",
    "공부",
    "먹다",
    "마시다",
    "웃다",
    "책",
    "여행",
    "바다",
    "산",
    "음악",
    "춤",
    "놀이",
    "휴식",
    "자연",
    "도시",
    "미래",
    "꿈",
  ];

  const discoveries = Array.from({ length: 20 }, (_, i) => ({
    no: i + 1,
    word: words[i],
    score: Math.floor(Math.random() * 7) + 1,
  }));

  const [selectedScores, setSelectedScores] = useState({});

  const handleStarClick = (itemId, score) => {
    setSelectedScores({ ...selectedScores, [itemId]: score });
  };

  const renderButtons = (itemId) => {
    const selectedScore = selectedScores[itemId] || 0;

    return Array.from({ length: 7 }, (_, i) => (
      <button
        key={i}
        className={`score-button ${i + 1 === selectedScore ? "selected" : ""}`}
        onClick={() => handleStarClick(itemId, i + 1)}
      >
        {i + 1}
      </button>
    ));
  };

  const renderListItem = (item) => (
    <li>
      <Box width={"100%"} className="word-wrapper">
        <time>{item.no}</time>

        <Box width={""} className="word">
          {/* <h1>Word</h1> */}
          <p>{item.word}</p>
        </Box>
        <Box width={""} className="score">
          {/* <h1>Score</h1> */}
          {renderButtons(item.no)}
        </Box>
      </Box>
    </li>
  );

  return (
    <div className="word-slide">
      <section className="timeline">
        <ul>{discoveries.map(renderListItem)}</ul>
      </section>
    </div>
  );
};

export default WordSlide;
