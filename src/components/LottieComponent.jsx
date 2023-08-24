import Lottie from "lottie-react";
import bookLottie from "../assets/lottie/book.json";
import exploreLottie from "../assets/lottie/explore.json";
import coinLottie from "../assets/lottie/coin.json";
import puzzleLottie from "../assets/lottie/puzzle.json";

import { useState, useRef } from "react";

const animations = {
  book: bookLottie,
  explore: exploreLottie,
  coin: coinLottie,
  puzzle: puzzleLottie,
};

function LottieComponent({ name, text }) {
  const animationData = animations[name];
  const lottieRef = useRef(null);

  const handleMouseEnter = () => {
    lottieRef.current.play();
  };

  const handleMouseLeave = () => {
    lottieRef.current.pause();
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        display: "flex",
        alignItems: "center",
        marginLeft: "30px",
        marginRight: "10px",
      }}
    >
      <h2 style={{ fontFamily: "yarden", fontWeight: "bold" }}>{text}</h2>
      <Lottie
        animationData={animationData}
        loop={false}
        lottiRef={lottieRef}
        height={100}
        width={100}
      />
    </div>
  );
}
export default LottieComponent;
