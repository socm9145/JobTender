import React, { useState, useEffect } from "react";
import "../../styles/survey/WordSlide.css";
import {
  submitSurvey,
  makeResult,
  postSurvey,
  saveChooseSurvey,
} from "../../api/surveyAxios";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import {
  setWordList,
  setResultId,
  setSelectedScoresRaw,
  setSelectedScoresRedux,
} from "../../redux/survey/surveySlice";
import { setKeywordSurveyResult } from "../../redux/result/resultSlice";
import { useNavigate } from "react-router-dom";
import { Box, Text } from "@chakra-ui/react";
// {1: 7, 2: 8, 3: 5, 4: 7, 5: 9, 6: 7, 7: 6, 8: 7, 9: 6, 10: 9, 11: 6, 12: 5, 13: 6, 14: 7, 15: 9, 16: 9, 17: 7, 18: 2, 19: 9, 20: 9, 21: 8, 22: 7, 23: 7, 24: 9, 25: 6, 26: 9, 27: 5, 28: 9, 29: 9, 30: 8, 31: 9, 32: 4, 33: 2, 34: 3, 35: 7, 36: 7, 37: 5, 38: 8, 39: 8, 40: 6, 41: 7, 42: 6, 43: 9, 44: 9, 45: 9, 46: 8, 47: 4, 48: 9, 49: 9, 50: 7, 51: 6, 52: 9, 53: 9, 54: 9, 55: 2, 56: 5, 57: 2}
const WordSlide = () => {
  const navigate = useNavigate();
  const [selectedScores, setSelectedScores] = useState({
    4: 7,
    5: 9,
    6: 7,
    7: 6,
    8: 7,
    9: 6,
    10: 9,
    11: 6,
    12: 5,
    13: 6,
    14: 7,
    15: 9,
    16: 9,
    17: 7,
    18: 2,
    19: 9,
    20: 9,
    21: 8,
    22: 7,
    23: 7,
    24: 9,
    25: 6,
    26: 9,
    27: 5,
    28: 9,
    29: 9,
    30: 8,
    31: 9,
    32: 4,
    33: 2,
    34: 3,
    35: 7,
    36: 7,
    37: 5,
    38: 8,
    39: 8,
    40: 6,
    41: 7,
    42: 6,
    43: 9,
    44: 9,
    45: 9,
    46: 8,
    47: 4,
    48: 9,
    49: 9,
    50: 7,
    51: 6,
    52: 9,
    53: 9,
    54: 9,
    55: 2,
    56: 5,
    57: 2,
  });

  const dispatch = useAppDispatch();

  // 선택 여부로 마름모 색변환
  const isItemSelected = (itemNo) => selectedScores[itemNo] !== undefined;
  const userid = useAppSelector((state) => state.user.userId);

  function reformSurveyData(resultId) {
    let list = [];
    console.log(222);
    console.log(selectedScores);
    for (let key in selectedScores) {
      console.log(123);
      let data = {
        resultId: resultId,
        surveyId: key,
        score: selectedScores[key],
      };
      console.log(data);
      list.push(data);
    }
    console.log(list);
    return JSON.stringify(list);
  }

  const makeResultWordSlide = async () => {
    await makeResult(
      userid,
      (response) => {
        dispatch(setResultId(response.data.resultId));
        saveChooseSurvey(
          reformSurveyData(response.data.resultId),
          (a) => {
            postSurvey(
              response.data.resultId,
              (data) => {
                console.log(data);
                dispatch(setKeywordSurveyResult(data.data));
              },
              (error) => {
                console.log(error);
              }
            );
            console.log(a);
          },
          (error) => {
            console.log(error);
          }
        );
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  useEffect(() => {
    const getWords = async () => {
      await submitSurvey(
        (response) => {
          console.log(response);
          dispatch(setWordList(response.data));
        },
        (error) => {
          console.log(error);
        }
      );
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
    };

    getWords();
  }, []);

  useEffect(() => {}, []);

  const words = useAppSelector((state) => state.survey.wordList);
  const len = words.length;

  const discoveries = Array.from({ length: len }, (_, i) => {
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

  const allButtonsClicked =
    Object.keys(selectedScores).length === discoveries.length;

  return (
    <Box className="word-slide">
      <div className="bg-video">
        <video className="bg-video-content" autoPlay muted loop>
          <source src="images/candle.mp4" type="video/mp4" />
        </video>
      </div>

      <section className="timeline">
        <ul>{discoveries.map(renderListItem)}</ul>
      </section>
      <div className="submit-button-container">
        <Box
          className={`submit-button ${allButtonsClicked ? "active" : ""}`}
          disabled={!allButtonsClicked}
          onClick={() => {
            // console.log(reformSurveyData(selectedScores));
            dispatch(setSelectedScoresRaw(selectedScores));
            navigate("/loadingsurvey");
          }}
        >
          Submit
        </Box>
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
    </Box>
  );
};

export default WordSlide;
