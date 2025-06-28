import React from "react";

interface HexagonImageProps {
  src: string;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
}

const HexagonImage: React.FC<HexagonImageProps> = ({ src, alt, className, style }) => (
  <div className={`hexagon-horizontal ${className || ""}`} style={style}>
    <img src={src} alt={alt} className="hex-img" />
    <style jsx>{`
      .hexagon-horizontal {
        width: 320px;
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
        margin: 0 -30px;
      }
      /* Đẩy các lục giác ở cột chẵn xuống (so le) */
      :global(.hexagon-horizontal:nth-child(even)) {
        margin-top: 190px;
      }
      .hex-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    `}</style>
  </div>
);

export default HexagonImage;