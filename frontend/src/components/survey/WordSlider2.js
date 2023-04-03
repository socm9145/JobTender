import React, { useEffect, useLayoutEffect, useRef } from "react";
import $ from "jquery";
import { gsap, Cubic } from "gsap";
import { EasePack } from "gsap/EasePack";
import "../../styles/survey/WordSlider.css";

gsap.registerPlugin(EasePack);
const WordSlider = () => {
  const cardSliderRef = useRef(null);

  const ctx = gsap.context(() => {});

  useLayoutEffect(() => {
    var cards = $("#card-slider .slider-item").toArray();

    startAnim(cards);

    function startAnim(array) {
      if (array.length >= 4) {
        ctx.add(() => {
          gsap.fromTo(
            array[0],

            { x: 0, y: 0, opacity: 0.75 },
            {
              duration: 0.5,
              x: 0,
              y: -120,
              opacity: 0,
              zIndex: 0,
              delay: 0.03,
              ease: Cubic.easeInOut,
              onComplete: sortArray(array),
            }
          );

          gsap.fromTo(
            array[1],

            { x: 79, y: 125, opacity: 1, zIndex: 1 },
            {
              duration: 0.5,
              x: 0,
              y: 0,
              opacity: 0.75,
              zIndex: 0,
              boxShadow: "-5px 8px 8px 0 rgba(82,89,129,0.05)",
              ease: Cubic.easeInOut,
            }
          );

          gsap.to(array[2], {
            bezier: [
              { x: 0, y: 250 },
              { x: 65, y: 200 },
              { x: 79, y: 125 },
            ],
            duration: 0.5,
            boxShadow: "-5px 8px 8px 0 rgba(82,89,129,0.05)",
            zIndex: 1,
            opacity: 1,
            ease: Cubic.easeInOut,
          });

          gsap.fromTo(
            array[3],

            { x: 0, y: 400, opacity: 0, zIndex: 0 },
            {
              duration: 0.5,
              x: 0,
              y: 250,
              opacity: 0.75,
              zIndex: 0,
              ease: Cubic.easeInOut,
            }
          );
        });
      } else {
        $("#card-slider").append(
          "<p>Sorry, carousel should contain more than 3 slides</p>"
        );
      }
    }

    function sortArray(array) {
      clearTimeout(delay);
      var delay = setTimeout(function () {
        var firstElem = array.shift();
        array.push(firstElem);
        return startAnim(array);
      }, 3000);
    }
  }, []);
  return (
    <div className="slider-wrap">
      {/* 나머지 HTML 코드를 여기에 붙여넣기 */}
      <div id="card-slider" className="slider">
        <div className="slider-item">
          <div className="animation-card_image">
            <img
              src="https://m.media-amazon.com/images/M/MV5BMTk5Mzc4ODU0Ml5BMl5BanBnXkFtZTcwNjU1NTI0Mw@@._V1_UY317_CR12,0,214,317_AL_.jpg"
              alt=""
            />
          </div>
          <div className="animation-card_content">
            <h4 className="animation-card_content_title title-2">
              Charlize Theron 1
            </h4>
            <p className="animation-card_content_description p-2">
              With no contractual commitments comes the freedom of having top
              notch content created whenever.
            </p>
            <p className="animation-card_content_city">New York, NY</p>
          </div>
        </div>
        <div className="slider-item">
          <div className="animation-card_image">
            <img
              src="https://m.media-amazon.com/images/M/MV5BMTk5Mzc4ODU0Ml5BMl5BanBnXkFtZTcwNjU1NTI0Mw@@._V1_UY317_CR12,0,214,317_AL_.jpg"
              alt=""
            />
          </div>
          <div className="animation-card_content">
            <h4 className="animation-card_content_title title-2">
              Charlize Theron 2
            </h4>
            <p className="animation-card_content_description p-2">
              With no contractual commitments comes the freedom of having top
              notch content created whenever.
            </p>
            <p className="animation-card_content_city">New York, NY</p>
          </div>
        </div>
        <div className="slider-item">
          <div className="animation-card_image">
            <img
              src="https://m.media-amazon.com/images/M/MV5BMTk5Mzc4ODU0Ml5BMl5BanBnXkFtZTcwNjU1NTI0Mw@@._V1_UY317_CR12,0,214,317_AL_.jpg"
              alt=""
            />
          </div>
          <div className="animation-card_content">
            <h4 className="animation-card_content_title title-2">
              Charlize Theron 3
            </h4>
            <p className="animation-card_content_description p-2">
              With no contractual commitments comes the freedom of having top
              notch content created whenever.
            </p>
            <p className="animation-card_content_city">New York, NY</p>
          </div>
        </div>
        <div className="slider-item">
          <div className="animation-card_image">
            <img
              src="https://m.media-amazon.com/images/M/MV5BMTk5Mzc4ODU0Ml5BMl5BanBnXkFtZTcwNjU1NTI0Mw@@._V1_UY317_CR12,0,214,317_AL_.jpg"
              alt=""
            />
          </div>
          <div className="animation-card_content">
            <h4 className="animation-card_content_title title-2">
              Charlize Theron 4
            </h4>
            <p className="animation-card_content_description p-2">
              With no contractual commitments comes the freedom of having top
              notch content created whenever.
            </p>
            <p className="animation-card_content_city">New York, NY</p>
          </div>
        </div>
        <div className="slider-item">
          <div className="animation-card_image">
            <img
              src="https://m.media-amazon.com/images/M/MV5BMTk5Mzc4ODU0Ml5BMl5BanBnXkFtZTcwNjU1NTI0Mw@@._V1_UY317_CR12,0,214,317_AL_.jpg"
              alt=""
            />
          </div>
          <div className="animation-card_content">
            <h4 className="animation-card_content_title title-2">
              Charlize Theron 5
            </h4>
            <p className="animation-card_content_description p-2">
              With no contractual commitments comes the freedom of having top
              notch content created whenever.
            </p>
            <p className="animation-card_content_city">New York, NY</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WordSlider;
