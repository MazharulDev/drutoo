"use client";
import { Tooltip } from "antd";
import React, { useState, useEffect, useRef } from "react";

interface CircleButtonProps {
  onHoldComplete: () => void;
}

const HoldButton: React.FC<CircleButtonProps> = ({ onHoldComplete }) => {
  const [isHolding, setIsHolding] = useState(false);
  const [progress, setProgress] = useState(0);
  const holdTimeout = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Start holding
  const handleMouseDown = () => {
    setIsHolding(true);
    let counter = 0;

    intervalRef.current = setInterval(() => {
      counter += 100; // Increment 100ms
      setProgress((counter / 2000) * 100); // Convert to percentage

      if (counter >= 2000) {
        onHoldComplete();
        clearInterval(intervalRef.current!);
      }
    }, 100);

    // Stop holding after 5 seconds
    holdTimeout.current = setTimeout(() => {
      setIsHolding(false);
      setProgress(0);
    }, 2000);
  };

  // Cancel hold
  const handleMouseUp = () => {
    if (holdTimeout.current) clearTimeout(holdTimeout.current);
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsHolding(false);
    setProgress(0);
  };

  useEffect(() => {
    return () => {
      if (holdTimeout.current) clearTimeout(holdTimeout.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <Tooltip placement="top" title="Click hold to transfer money">
      <button
        className={`relative w-20 h-20 rounded-full border-4 border-transparent hover:scale-105 
      ${isHolding ? "border-blue-500" : ""} flex items-center justify-center`}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div
          className="absolute inset-0 w-full h-full rounded-full border-t-4 border-blue-500"
          style={{
            transform: `rotate(${(progress / 100) * 360}deg)`,
            transition: "transform 0.1s linear",
          }}
        ></div>
        <span className="z-10">Send</span>
      </button>
    </Tooltip>
  );
};

export default HoldButton;
