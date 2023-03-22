import "../../styles/ImageContainer.css";

import React, { useEffect, useRef } from "react";

import { Box, Image } from "@chakra-ui/react";
const ImageContainer = () => {
  const carouselRef = useRef(null);

  const handleMouseDown = (event) => {
    const carousel = carouselRef.current;
    if (carousel.classList.contains("transition")) return;
    const dragStart = event.pageX;

    const handleMouseMove = (event) => {
      const dragEnd = event.pageX;
      carousel.style.transform = "translateX(" + (dragEnd - dragStart) + "px)";
    };

    const handleMouseUp = (event) => {
      const dragEnd = event.pageX;
      const dragPos = dragEnd - dragStart;

      if (dragPos > 150) {
        shiftSlide(1);
      } else if (dragPos < -150) {
        shiftSlide(-1);
      } else {
        shiftSlide(0);
      }

      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp, { once: true });
  };

  const shiftSlide = (direction) => {
    const carousel = carouselRef.current;
    if (carousel.classList.contains("transition")) return;
    carousel.classList.add("transition");
    carousel.style.transform = "translateX(" + direction * 830 + "px)";

    setTimeout(() => {
      const slides = carousel.querySelectorAll(".slide");
      if (direction === 1) {
        carousel.insertBefore(slides[slides.length - 1], slides[0]);
      } else if (direction === -1) {
        carousel.appendChild(slides[0]);
      }
      carousel.classList.remove("transition");
      carousel.style.transform = "translateX(0px)";
    }, 700);
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    carousel.addEventListener("mousedown", handleMouseDown);
    return () => {
      carousel.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);
  return (
    <Box
      height={"100%"}
      marginLeft={"1.5em"}
      paddingY={"1.5em"}
      overflow={"hidden"}
    >
      <Box
        height={"100%"}
        display={"flex"}
        justifyContent={"space-between"}
        width={"100vw"}
      >
        <Box className="wrap">
          <Box className="window">
            <Box id="carousel" ref={carouselRef} display={"inline-block"}>
              <Box
                className="slide"
                id="b1"
                marginRight={"30px"}
                backgroundImage="url('/images/keywords-image.jpg')"
              ></Box>
              <Box
                className="slide"
                id="b2"
                marginRight={"30px"}
                backgroundImage="url('/images/survey-image.jpg')"
              ></Box>
              <Box
                className="slide"
                id="b1"
                marginRight={"30px"}
                backgroundImage="url('/images/keywords-image.jpg')"
              ></Box>
              <Box
                className="slide"
                id="b2"
                marginRight={"30px"}
                backgroundImage="url('/images/survey-image.jpg')"
              ></Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ImageContainer;
