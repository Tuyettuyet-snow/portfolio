import React, { useState, useEffect } from 'react';

export default function FloatingCharacter() {
  const [mousePos, setMousePos] = useState({ 
    x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0, 
    y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0 
  });
  const [charPos, setCharPos] = useState({ 
    x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0, 
    y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0 
  });

  // Trạng thái kiểm tra xem có đang rê chuột vào nút/link không
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });

      // Tự động kiểm tra nếu trỏ chuột vào button hoặc thẻ a (link)
      const target = e.target;
      const interactiveElement = target.closest('button') || target.closest('a') || target.tagName === 'BUTTON' || target.tagName === 'A';
      
      setIsHovered(!!interactiveElement);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    let animationFrameId;

    const updatePosition = () => {
      setCharPos((prev) => {
        const easing = 0.09; 
        const floatOffset = Math.sin(Date.now() / 250) * 6;

        // ==========================================
        // ĐIỀU CHỈNH KHOẢNG CÁCH CÁCH XA CON TRỎ CHUỘT TẠI ĐÂY
        // ==========================================
        const offsetX = 70;  // Tăng lên 70px (hoặc 80px) để nhân vật lùi hẳn sang phải, không che nút bấm
        const offsetY = -40; // Lệch lên phía trên 40px

        const targetX = mousePos.x + offsetX;
        const targetY = mousePos.y + offsetY;

        return {
          x: prev.x + (targetX - prev.x) * easing,
          y: prev.y + (targetY - prev.y) * easing + floatOffset * 0.05,
        };
      });

      animationFrameId = requestAnimationFrame(updatePosition);
    };

    animationFrameId = requestAnimationFrame(updatePosition);
    return () => cancelAnimationFrame(animationFrameId);
  }, [mousePos]);

  // Kích thước riêng cho từng icon
  const normalSize = 150; 
  const hoverSize = 90;  

  const currentSize = isHovered ? hoverSize : normalSize;
  const currentImage = isHovered ? '/icon-hover.png' : '/icon.png';

  return (
    <div
      style={{
        position: 'fixed',
        left: `${charPos.x - currentSize / 2}px`,
        top: `${charPos.y - currentSize / 2}px`,
        width: `${currentSize}px`,
        height: `${currentSize}px`,
        pointerEvents: 'none',
        zIndex: 9999,
        transition: 'width 0.2s ease, height 0.2s ease',
      }}
    >
      <img
        src={currentImage} 
        alt="Floating Character"
        style={{ 
          width: '100%', 
          height: '100%', 
          objectFit: 'contain',
          pointerEvents: 'none'
        }}
        className="drop-shadow-xl"
      />
    </div>
  );
}