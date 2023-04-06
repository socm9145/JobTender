import { useEffect, useState } from "react";

import LeftKeywordsContainer from "../../components/keyword/LeftKeywordsContainer";
import RightKeywordsContainer from "../../components/keyword/RightKeywordsContainer";
import DescribeContainer from "../../components/keyword/DescribeContainer";
import KeywordRankContainer from "../../components/keyword/KeywordRankContainer";

import {
  makeResult,
  postSurvey,
  saveChooseSurvey,
} from "../../api/surveyAxios";

import { postKeyword, postKeywordPython } from "../../api/keywordAxios";
import { chart2, chart3 } from "../../api/resultAxios";

import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { resolvePath, useNavigate } from "react-router-dom";
import { setResultId } from "../../redux/keyword/keywordSlice";
import {
  setKeywordSurveyResult,
  setChart2,
  setChart2_1,
  setChart2_2,
  setChart2_3,
  setChart3,
} from "../../redux/result/resultSlice";

import "../../styles/loading/Loading.css";
import { Box, Text } from "@chakra-ui/react";

const Loading = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isAnalysed, setIsAnalysed] = useState(false);
  const [canvasWidth, setCanvasWidth] = useState("0");
  const [canvasHeight, setCanvasHeight] = useState("0");
  const [chart2Tmp, setChart2Tmp] = useState([]);

  const selectedKeyword = useAppSelector(
    (state) => state.keyword.selectedKeyword
  );
  const selectedScoresRedux = useAppSelector(
    (state) => state.survey.selectedScoresRedux
  );
  const chart4 = useAppSelector((state) => state.result.chart4);
  // const top3CompanyId = useAppSelector((state) => state.result.top3CompanyId);
  // const userid = useAppSelector((state) => state.user.userId);
  const userid = sessionStorage.getItem("userId");

  const makeChart2Data = (childrenList) => {
    const res = {
      name: "chart2",
      children: childrenList,
    };
    return res;
  };

  useEffect(() => {
    async function sendKeyword() {
      const keywords = {
        keywordId1: selectedKeyword[0],
        keywordId2: selectedKeyword[1],
        keywordId3: selectedKeyword[2],
      };
      console.log(keywords);
      await postKeyword(
        userid,
        keywords,
        (data) => {
          dispatch(setResultId(data.data[0].resultId));
          postKeywordPython(
            data.data[0].resultId,
            (response) => {
              dispatch(setKeywordSurveyResult(response.data));
              const top3CompanyId = () => {
                const tmp = [];
                for (let key in response.data.top) {
                  tmp.push(key);
                }
                return tmp;
              };
              console.log(top3CompanyId());

              let idx = 1;
              top3CompanyId().forEach((companyId) => {
                console.log(companyId);
                chart2(
                  companyId,
                  (response) => {
                    console.log(response.data);
                    if (idx === 1) {
                      dispatch(setChart2_1(response.data));
                    } else if (idx === 2) {
                      dispatch(setChart2_2(response.data));
                    } else if (idx === 3) {
                      dispatch(setChart2_3(response.data));
                    }
                    idx++;
                  },
                  (err) => {
                    console.log(err);
                  }
                );
              });

              chart3(
                keywords,
                (response) => {
                  console.log(response);
                  dispatch(setChart3(response.data));
                },
                (err) => {
                  console.log(err);
                }
              );

              // survey 검사의 경우
              // 4번 차트,5번 차트 데이터가 리덕스에 있을 때
              if (Object.keys(chart4).length !== 0) {
                // selectedScoresRedux
                const makeResultWordSlide = async () => {
                  await makeResult(
                    userid,
                    (response) => {
                      dispatch(setResultId(response.data.resultId));
                      saveChooseSurvey(
                        selectedScoresRedux,
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
                makeResultWordSlide();
              }

              setIsAnalysed(true);
            },
            (error) => {
              console.log(error);
            }
          );
        },
        (error) => {
          console.log(error);
        }
      );
    }
    sendKeyword();

    // setCanvasWidth(document.getElementById("canvas-container").clientWidth);
    // setCanvasHeight(document.getElementById("canvas-container").clientHeight);
    // /* ---------------- FISH "CLASS" START -------------- */
    // var FOLLOW_DISTANCE = 100;

    // var Fish = function (id) {
    //   this.id = id;
    //   this.entourage = [];
    //   // dx/yx is current speed, ox/oy is the previous one
    //   this.ox = this.dx = Math.random() - 0.5;
    //   this.oy = this.dy = Math.random() - 0.5;

    //   this.x = canvas.width * Math.random();
    //   this.y = canvas.height * Math.random();

    //   // A couple of helper functions, the names should describe their purpose
    //   Fish.prototype.angleToClosestFish = function (otherFish) {
    //     otherFish = otherFish == null ? this.following : otherFish;
    //     if (otherFish) {
    //       return Math.atan2(otherFish.y - this.y, otherFish.x - this.x);
    //     } else {
    //       return Number.MAX_VALUE;
    //     }
    //   };

    //   Fish.prototype.angleFromFishDirectionToClosestFish = function (
    //     otherFish
    //   ) {
    //     otherFish = otherFish == null ? this.following : otherFish;
    //     if (otherFish) {
    //       return Math.abs(
    //         deltaAngle(this.angle, this.angleToClosestFish(otherFish))
    //       );
    //     } else {
    //       return Number.MAX_VALUE;
    //     }
    //   };

    //   Fish.prototype.angleDirectionDifference = function (otherFish) {
    //     otherFish = otherFish == null ? this.following : otherFish;

    //     if (otherFish) {
    //       Math.abs(deltaAngle(this.angle, otherFish.angle));
    //     } else {
    //       return Number.MAX_VALUE;
    //     }
    //   };

    //   // Update the fish "physics"
    //   Fish.prototype.calc = function () {
    //     this.ox = this.dx;
    //     this.oy = this.dy;
    //     var MAX_SPEED = 1.1;
    //     var maxSpeed = MAX_SPEED;

    //     //Do I need to find another fish buddy?
    //     if (
    //       this.following == null ||
    //       py(this.x - this.following.x, this.y - this.following.y) >
    //         FOLLOW_DISTANCE
    //     ) {
    //       if (this.following != null) {
    //         if (keyDown) affinityLine(this.following, this, "white");
    //         this.following.entourage.splice(
    //           this.following.entourage.indexOf(this)
    //         );
    //       }

    //       this.following = null;

    //       //attract closer to other fish - find closest
    //       var closestDistance = Number.MAX_VALUE;
    //       var closestFish = null;

    //       for (var i = 0; i < fishes.length; i++) {
    //         var fish = fishes[i];
    //         if (fish != this) {
    //           var distance = py(this.x - fish.x, this.y - fish.y);
    //           // Is it closer, within the max distance and within the sector that the fish can see?
    //           if (
    //             distance < closestDistance &&
    //             fish.following != this &&
    //             distance < FOLLOW_DISTANCE &&
    //             this.angleFromFishDirectionToClosestFish(fish) < Math.PI * 0.25
    //           ) {
    //             closestDistance = distance;
    //             closestFish = fish;
    //           }
    //         }
    //       }
    //       if (closestFish != null) {
    //         this.following = closestFish;
    //         closestFish.entourage.push(this);
    //       }
    //     }

    //     // Fish is following another
    //     if (this.following != null) {
    //       // Go closer to other fish
    //       this.followingDistance = py(
    //         this.x - this.following.x,
    //         this.y - this.following.y
    //       );
    //       this.distanceFactor = 1 - this.followingDistance / FOLLOW_DISTANCE;

    //       // If going head on, just break a little before following
    //       if (
    //         this.angleDirectionDifference() > Math.PI * 0.9 && // On colliding angle?
    //         this.angleFromFishDirectionToClosestFish() < Math.PI * 0.2
    //       ) {
    //         // In colliding sector?
    //         this.dx += this.following.x * 0.1;
    //         this.dy += this.following.y * 0.1;
    //         if (keyDown) affinityLine(this.following, this, "yellow");
    //       } else if (this.followingDistance > FOLLOW_DISTANCE * 0.3) {
    //         // Dont go closer if close
    //         this.dx +=
    //           Math.cos(this.angleToClosestFish()) *
    //           (0.05 * this.distanceFactor);
    //         this.dy +=
    //           Math.sin(this.angleToClosestFish()) *
    //           (0.05 * this.distanceFactor);
    //       }
    //       if (keyDown) affinityLine(this.following, this, "red");
    //     }

    //     // Go closer to center, crashing into the canvas walls is just silly!
    //     if (
    //       this.x < canvas.width * 0 ||
    //       this.x > canvas.width * 1 ||
    //       this.y < canvas.height * 0 ||
    //       this.y > canvas.height * 1
    //     ) {
    //       this.dx += (canvas.width / 2 - this.x) / 5000;
    //       this.dy += (canvas.height / 2 - this.y) / 5000;
    //     }

    //     // Poor little fishies are scared of your cursor
    //     if (py(this.x - cursor.x, this.y - cursor.y) < FOLLOW_DISTANCE * 1.75) {
    //       this.dx -= (cursor.x - this.x) / 500;
    //       this.dy -= (cursor.y - this.y) / 500;
    //       maxSpeed = 4;
    //       if (keyDown) affinityLine(cursor, this, "green");
    //     }

    //     // If following fish, try avoid going close to your siblings
    //     if (this.following != null) {
    //       for (var i = 0; i < this.following.entourage.length; i++) {
    //         var siblingFish = this.following.entourage[i];
    //         if (siblingFish !== this) {
    //           if (
    //             py(this.x - siblingFish.x, this.y - siblingFish.y) <
    //             FOLLOW_DISTANCE * 0.2
    //           ) {
    //             if (keyDown) affinityLine(siblingFish, this, "yellow");
    //             this.dx -= (siblingFish.x - this.x) / 1000;
    //             this.dy -= (siblingFish.y - this.y) / 1000;
    //           }
    //         }
    //       }
    //     }

    //     // Calculate heading from new speed
    //     this.angle = Math.atan2(this.dy, this.dx);

    //     // Grab the speed from the vectors, and normalize it
    //     var speed = Math.max(0.1, Math.min(maxSpeed, py(this.dx, this.dy)));

    //     // Recreate speed vector from recombining angle of direction with normalized speed
    //     this.dx = Math.cos(this.angle) * (speed + speedBoost);
    //     this.dy = Math.sin(this.angle) * (speed + speedBoost);

    //     // Fish like to move it, move it!
    //     this.x += this.dx;
    //     this.y += this.dy;
    //   };
    // };

    // /* ---------------------- FISH "CLASS" END -------------- */

    // /* ---------------------- MAIN START -------------------- */
    // var canvas = document.getElementById("fishtank");
    // var context = canvas.getContext("2d");

    // var fishes = [];

    // var speedBoostCountdown = 200,
    //   speedBoost = 0,
    //   SPEED_BOOST = 2;
    // var fishBitmap = new Image();
    // fishBitmap.onload = function () {
    //   update();
    // };
    // fishBitmap.src = `${process.env.PUBLIC_URL}` + "/images/fish.png";
    // // "https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/3175363/fish-clipart-md.png";

    // //Draw Circle
    // function draw(f) {
    //   var r = f.angle + Math.PI;

    //   context.translate(f.x, f.y);
    //   context.rotate(r);

    //   var w = 50;
    //   var acc = py(f.dx - f.ox, f.dy - f.oy) / 0.05;

    //   // If a fish does a "flip", make it less wide
    //   if (acc > 1) {
    //     w = 50 + 10 / acc;
    //   }

    //   context.drawImage(fishBitmap, 0, 0, w, 20);
    //   context.rotate(-r);
    //   context.translate(-f.x, -f.y);
    // }

    // // Pythagoras shortcut
    // function py(a, b) {
    //   return Math.sqrt(a * a + b * b);
    // }

    // //------------ USER INPUT START -------------
    // var cursor = {
    //   x: 0,
    //   y: 0,
    // };
    // var cursorDown = false,
    //   keyDown = false;

    // document.onmousemove = function (e) {
    //   cursor.x = e.pageX - (window.innerWidth - canvas.width);
    //   cursor.y = e.pageY - (window.innerHeight / 2 - canvas.height / 2);
    // };

    // document.onmouseout = function (e) {
    //   //Out of screen is not a valid pos
    //   cursor.y = cursor.x = Number.MAX_VALUE;
    // };

    // document.onmousedown = function () {
    //   activateSpeedBoost();
    //   cursorDown = true;
    // };
    // document.onmouseup = function () {
    //   cursorDown = false;
    // };

    // document.onkeydown = function () {
    //   keyDown = true;
    // };

    // document.onkeyup = function () {
    //   keyDown = false;
    // };
    // //------------ USER INPUT STOP -------------

    // function deltaAngle(f, o) {
    //   //Find the shortest angle between two
    //   var r = f - o;
    //   return Math.atan2(Math.sin(r), Math.cos(r));
    // }

    // function affinityLine(f, o, c) {
    //   //Draw a line with pretty gradient
    //   var grad = context.createLinearGradient(f.x, f.y, o.x, o.y);
    //   grad.addColorStop(0, c);
    //   grad.addColorStop(1, "black");

    //   context.strokeStyle = grad;
    //   context.beginPath();
    //   context.moveTo(f.x, f.y);
    //   context.lineTo(o.x, o.y);
    //   context.stroke();
    // }

    // function activateSpeedBoost() {
    //   speedBoostCountdown = 400 + Math.round(400 * Math.random());
    //   speedBoost = SPEED_BOOST;
    // }

    // //Update and draw all of them
    // function update() {
    //   if (fishes.length < 130) {
    //     fishes.push(new Fish(fishes.length));
    //   }

    //   if (!cursorDown) {
    //     //clear the canvas
    //     canvas.width = canvas.width; //Try commenting this line :-)

    //     //Update and draw fish
    //     for (var i = 0; i < fishes.length; i++) {
    //       var fish = fishes[i];
    //       fish.calc();
    //       draw(fish);
    //     }
    //   }

    //   speedBoostCountdown--;
    //   if (speedBoostCountdown < 0) {
    //     activateSpeedBoost();
    //   }

    //   if (speedBoost > 0) {
    //     speedBoost -= SPEED_BOOST / 80; //Reduce speed bost fast!
    //   } else {
    //     speedBoost = 0;
    //   }

    //   sendKeyword();
    //   requestAnimationFrame(update);
    // }
    // /* ---------------------- MAIN END ----------------------- */
  }, []);

  useEffect(() => {
    console.log(chart2Tmp);
    if (chart2Tmp.length === 3) {
      dispatch(setChart2(makeChart2Data(chart2Tmp)));
    }
  }, [chart2Tmp]);

  return (
    <Box
      position={"relative"}
      id={"canvas-container"}
      width="100vw"
      height="100vh"
      overflow={"hidden"}
    >
      {/* <canvas width={canvasWidth} height={canvasHeight} id="fishtank" /> */}
      <Box
        // 분석 상태에 따라서 커서 크기 조절
        className={isAnalysed ? "hoverable" : "none"}
        position={"absolute"}
        bottom={"0"}
        right={"0"}
        width={"20rem"}
        height={"7rem"}
        backgroundColor={"rgba(0,0,0,0.8)"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        onClick={() => {
          //분석 상태에 따라서 navigate 활성/비활성
          if (isAnalysed) {
            navigate("/result");
          } else {
            return;
          }
        }}
      >
        {/* 분석 상태에 따라서 커서 문구 수정 */}
        {isAnalysed ? (
          <Text
            className={isAnalysed ? "hoverable" : "none"}
            fontSize={"3rem"}
            fontFamily={"dodum"}
            color={"white"}
          >
            결과 보기
          </Text>
        ) : (
          <Text fontSize={"3rem"} fontFamily={"dodum"} color={"white"}>
            - 분석 중 -
          </Text>
        )}
      </Box>
    </Box>
  );
};

export default Loading;
