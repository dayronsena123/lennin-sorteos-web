import React from 'react';
import ReactConfetti from 'react-confetti';
import { useWindowSize } from 'react-use';

function ConfettiEffect() {
    const { width, height } = useWindowSize();
    return (
        <ReactConfetti
            width={width}
            height={height}
            recycle={true}
            numberOfPieces={200}
            gravity={0.1}
        />
    );
}

export default ConfettiEffect;
