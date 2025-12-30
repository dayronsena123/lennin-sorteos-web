import React from 'react';

function SnowEffect() {
    // Generate snowflakes
    const snowflakes = Array.from({ length: 50 }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        animationDuration: `${Math.random() * 3 + 2}s`,
        animationDelay: `${Math.random() * 5}s`,
        opacity: Math.random() * 0.5 + 0.3,
        size: Math.random() * 10 + 5 + 'px'
    }));

    return (
        <div className="snow-container">
            {snowflakes.map(flake => (
                <div
                    key={flake.id}
                    className="snowflake"
                    style={{
                        left: flake.left,
                        animationDuration: flake.animationDuration,
                        animationDelay: flake.animationDelay,
                        opacity: flake.opacity,
                        fontSize: flake.size
                    }}
                >
                    ❄
                </div>
            ))}
        </div>
    );
}

export default SnowEffect;
