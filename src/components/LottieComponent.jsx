import Lottie from 'react-lottie';
import bookLottie from '../assets/lottie/book.json';
import exploreLottie from '../assets/lottie/explore.json';
import coinLottie from '../assets/lottie/coin.json';
import puzzleLottie from '../assets/lottie/puzzle.json';

import { useState, useEffect } from "react";


const animations = {
  book: bookLottie,
  explore: exploreLottie,
  coin: coinLottie,
  puzzle: puzzleLottie
}

function LottieComponent({name, text}) {
  const [isStopped, setIsStopped] = useState(true);
  const animationData = animations[name]

  const defaultOptions = {
    loop: false,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <div onMouseEnter={() => setIsStopped(false)}
         onMouseLeave={() => setIsStopped(true)}
         style={{
  display: 'flex',
  alignItems: 'center',
  marginLeft:'30px',
  marginRight:'10px'
}}>
      <h2 style={{fontFamily: 'yarden' ,  fontWeight: 'bold' }}>{text}</h2>
      <Lottie 
        options={defaultOptions}
        isStopped={isStopped}
        isPaused={isStopped}  
                height={100}
        width={100}

      />
    </div>
)
}
export default LottieComponent;
