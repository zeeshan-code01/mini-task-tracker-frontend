// src/components/Shared/HorizontalScroll.tsx
import React, { useRef } from "react";
import "./Horizontal_Scroll.css";

interface HorizontalScrollProps {
  children: React.ReactNode;
  cardClass?: string; // new
}

const HorizontalScroll: React.FC<HorizontalScrollProps> = ({ children, cardClass = "" }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      scrollRef.current.scrollLeft = direction === "left"
        ? scrollLeft - clientWidth
        : scrollLeft + clientWidth;
    }
  };

  return (
    <div className="scroll-container">
      <button className="scroll-btn left" onClick={() => scroll("left")}>‹</button>
      <div ref={scrollRef} className="scroll-content">
        {React.Children.map(children, child =>
          <div className={`scroll-item ${cardClass}`}>{child}</div>
        )}
      </div>
      <button className="scroll-btn right" onClick={() => scroll("right")}>›</button>
    </div>
  );
};

export default HorizontalScroll;
