import { FaCheckCircle, FaCircle } from "react-icons/fa";

interface GreenCheckmarkProps {
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export default function GreenCheckmark({
  onClick,
  className = "",
  style = {},
}: GreenCheckmarkProps) {
  return (
    <span
      className={`me-1 position-relative ${className}`}
      onClick={onClick}
      style={{ ...style }}
    >
      <FaCheckCircle
        style={{ top: "2px", ...style }}
        className="text-success me-1 position-absolute fs-5"
      />
      <FaCircle className="text-white me-1 fs-6" />
    </span>
  );
}
