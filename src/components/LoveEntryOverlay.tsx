"use client";

import { useState, useEffect } from 'react';

interface LoveEntryOverlayProps {
  onEnter: () => void;
}

export default function LoveEntryOverlay({ onEnter }: LoveEntryOverlayProps) {
  const [hearts, setHearts] = useState<{ id: number; style: React.CSSProperties }[]>([]);

  const [isClient, setIsClient] = useState(false);

  // First, set isClient to true when component mounts (client-side only)
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Generate floating hearts around the button - only on client side
  useEffect(() => {
    // Skip if not on client yet
    if (!isClient) return;

    const heartCount = 15;
    const newHearts = [];

    for (let i = 0; i < heartCount; i++) {
      newHearts.push({
        id: i,
        style: {
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          fontSize: `${1 + Math.random() * 1.5}rem`,
          animationDuration: `${3 + Math.random() * 4}s`,
          animationDelay: `${Math.random() * 2}s`,
          opacity: 0.3 + Math.random() * 0.7
        }
      });
    }

    setHearts(newHearts);
  }, [isClient]);

  return (
    <div className="love-entry-overlay">
      <div className="love-entry-hearts">
        {hearts.map(heart => (
          <div
            key={heart.id}
            className="entry-heart"
            style={heart.style}
          >
            ❤
          </div>
        ))}
      </div>
      <button
        className="love-entry-button"
        onClick={onEnter}
      >
        ENTER TO OUR WORLD
      </button>
    </div>
  );
}
