import React from "react";

interface HexagonImageProps {
  src: string;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
}

const HexagonImage: React.FC<HexagonImageProps> = ({ src, alt, className, style }) => {
  if (!src) return null;
  
  return (
    <div className={`hexagon-horizontal ${className || ""}`} style={style}>
      <img src={src} alt={alt} className="hex-img" />
      <style jsx>{`
        .hexagon-horizontal {
          width: 240px;
          aspect-ratio: 1.15/1;
          clip-path: polygon(
            25% 5%, 75% 5%,
            100% 50%,
            75% 95%, 25% 95%,
            0% 50%
          );
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f3f3f3;
          margin: 0 -15px;
          transition: all 0.3s ease;
        }
        
        .hexagon-horizontal:hover {
          transform: scale(1.05);
          z-index: 10;
        }
        
        /* Responsive breakpoints */
        @media (min-width: 1920px) {
          .hexagon-horizontal {
            width: 280px;
            margin: 0 -20px;
          }
        }
        
        @media (max-width: 1700px) and (min-width: 1332px) {
          .hexagon-horizontal {
            width: 220px;
            margin: 0 -12px;
          }
        }
        
        @media (max-width: 1331px) and (min-width: 768px) {
          .hexagon-horizontal {
            width: 200px;
            margin: 0;
          }
        }
        
        @media (max-width: 767px) and (min-width: 481px) {
          .hexagon-horizontal {
            width: 140px;
            margin: 0;
          }
        }
        
        @media (max-width: 480px) {
          .hexagon-horizontal {
            width: 120px;
            margin: 0;
          }
        }
        
        /* Đẩy các lục giác ở cột chẵn xuống (so le) - chỉ áp dụng cho desktop ≥1332px */
        @media (min-width: 1332px) {
          :global(.hexagon-horizontal:nth-child(even)) {
            margin-top: 120px;
          }
        }
        
        @media (min-width: 1920px) {
          :global(.hexagon-horizontal:nth-child(even)) {
            margin-top: 140px;
          }
        }
        
        @media (max-width: 1700px) and (min-width: 1332px) {
          :global(.hexagon-horizontal:nth-child(even)) {
            margin-top: 110px;
          }
        }
        
        .hex-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      `}</style>
    </div>
  );
};

export default HexagonImage;