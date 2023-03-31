import React, { useState, useEffect } from "react";
import "../../styles/survey/WordSlide.css";

import { Box, Text } from "@chakra-ui/react";

const WordSlide = () => {
  const [selectedScores, setSelectedScores] = useState({});

  // 선택 여부로 마름모 색변환
  const isItemSelected = (itemNo) => selectedScores[itemNo] !== undefined;

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
    // //
    function initialCheck() {
      for (var i = 0; i < items.length; i++) {
        if (isElementInViewport(items[i])) {
          if (!items[i].classList.contains("in-view")) {
            items[i].classList.add("in-view");
          }
        }
      }
    }

    initialCheck();
    //
    window.addEventListener("load", callbackFunc);
    window.addEventListener("scroll", callbackFunc);

    // callbackFunc();
  }, []);

  const words = [
    "김",
    "사랑 사랑 사랑",
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

  const discoveries = Array.from({ length: 20 }, (_, i) => {
    const itemRef = React.createRef();
    return {
      no: i + 1,
      word: words[i],
      score: Math.floor(Math.random() * 7) + 1,
      ref: itemRef,
    };
  });

  const handleStarClick = (itemId, score) => {
    setSelectedScores({ ...selectedScores, [itemId]: score });
  };

  const renderButtons = (itemId) => {
    //  || 뒤에는 초기값
    const selectedScore = selectedScores[itemId] || -999;

    return Array.from({ length: 9 }, (_, i) => (
      <button
        key={i}
        className={`score-button ${i + 1 === selectedScore ? "selected" : ""}`}
        onClick={() => handleStarClick(itemId, i + 1)}
      >
        {i + 1}
      </button>
    ));
  };

  // const isItemSelected = (itemNo) => selectedScores[itemNo];
  const renderListItem = (item) => {
    // const itemRef = React.createRef();
    return (
      <li
        ref={item.ref}
        // className={isItemSelected(item.no) ? "selected-item" : ""}
        key={item.no}
      >
        <Box width={""} className="word-wrapper">
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
  };

  const scrollToItem = (itemNo) => {
    const itemRef = discoveries.find((item) => item.no === itemNo).ref;
    if (itemRef.current) {
      itemRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  console.log(selectedScores);

  const allButtonsClicked =
    Object.keys(selectedScores).length === discoveries.length;

  return (
    <div className="word-slide">
      <section className="timeline">
        <ul>{discoveries.map(renderListItem)}</ul>
      </section>
      <div className="submit-button-container">
        <button
          className={`submit-button ${allButtonsClicked ? "active" : ""}`}
          disabled={!allButtonsClicked}
        >
          Submit
        </button>
        {!allButtonsClicked && (
          <span className="tooltip">
            {discoveries
              .filter((item) => selectedScores[item.no] === undefined)
              .map((item) => (
                <span
                  key={item.no}
                  className="tooltip-number"
                  onClick={() => scrollToItem(item.no)}
                >
                  {item.no}
                </span>
              ))}
            not clicked
          </span>
        )}
      </div>
    </div>
  );
};

export default WordSlide;
