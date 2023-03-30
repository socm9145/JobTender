import "../../styles/ImageContainer.css";

import React, { useEffect, useRef } from "react";

import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../hooks/hooks";

import { Box } from "@chakra-ui/react";
import { setButtonAble, setselectedMethod } from "../../redux/home/homeSlice";

const ImageContainer = () => {
  const navigate = useNavigate();
  const carouselRef = useRef(null);
  const selectedMethod = useAppSelector((state) => state.home.selectedMethod);
  const dispatch = useAppDispatch();
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

      if (dragPos < -150) {
        shiftSlide(-1);
        dispatch(setselectedMethod());
      } else if (dragPos === 0) {
        console.log(selectedMethod);
        if (selectedMethod) {
          navigate("/keyword");
        } else {
          dispatch(setselectedMethod());
          navigate("/survey");
        }
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
    const cardWidth = document.querySelector(".slide").offsetWidth + 30;
    if (carousel.classList.contains("transition")) return;
    carousel.classList.add("transition");
    carousel.style.transform = "translateX(" + direction * cardWidth + "px)";

    setTimeout(() => {
      const slides = carousel.querySelectorAll(".slide");
      if (direction === 1) {
        carousel.insertBefore(slides[slides.length - 1], slides[0]);
      } else if (direction === -1) {
        carousel.appendChild(slides[0]);
      }
      carousel.classList.remove("transition");
      carousel.style.transform = "translateX(0px)";
      dispatch(setButtonAble(true));
    }, 700);
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    carousel.addEventListener("mousedown", handleMouseDown);
    shiftSlide(-1);
    return () => {
      carousel.removeEventListener("mousedown", handleMouseDown);
    };
  }, [selectedMethod]);

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
            <Box
              className="hoverable"
              id="carousel"
              ref={carouselRef}
              display={"inline-block"}
            >
              <Box
                className="slide hoverable"
                id="b2"
                marginRight={"30px"}
                backgroundImage={"https://picsum.photos/id/301/1600/800"}
                backgroundSize={"cover"}
                backgroundPosition={"center"}
                backgroundRepeat={"no-repeat"}
              ></Box>
              <Box
                className="slide hoverable"
                id="b1"
                marginRight={"30px"}
                backgroundImage={"https://picsum.photos/seed/picsum/1600/800"}
                backgroundSize={"cover"}
                backgroundPosition={"center"}
                backgroundRepeat={"no-repeat"}
              ></Box>
              <Box
                className="slide hoverable"
                id="b2"
                marginRight={"30px"}
                backgroundImage={"https://picsum.photos/id/301/1600/800"}
                backgroundSize={"cover"}
                backgroundPosition={"center"}
                backgroundRepeat={"no-repeat"}
              ></Box>
              <Box
                className="slide hoverable"
                id="b1"
                marginRight={"30px"}
                backgroundImage={"https://picsum.photos/seed/picsum/1600/800"}
                backgroundSize={"cover"}
                backgroundPosition={"center"}
                backgroundRepeat={"no-repeat"}
              ></Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ImageContainer;
