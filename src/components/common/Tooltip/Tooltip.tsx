const TOOLTIP_ARROW_SIZE = 8; // 화살표 크기

interface TooltipPropsType {
  content: string;
  align?: "top" | "bottom" | "left" | "right";
  x: number;
  y: number;
}

export default function Tooltip({
  content,
  align = "bottom",
  x,
  y,
}: TooltipPropsType) {
  return (
    <div
      className="absolute z-10 p-2 text-white bg-gray-800 rounded shadow-lg"
      style={{ top: y, left: x }}
    >
      {content}
      {/* 화살표 요소 */}
      <div
        className={`absolute w-[16px] h-[16px] bg-gray-800`}
        style={{
          ...(align === "top"
            ? {
                bottom: -TOOLTIP_ARROW_SIZE / 2,
                left: "50%",
                transform: "translateX(-50%) rotate(45deg)",
              }
            : align === "bottom"
            ? {
                top: -TOOLTIP_ARROW_SIZE / 2,
                left: "50%",
                transform: "translateX(-50%) rotate(45deg)",
              }
            : align === "left"
            ? {
                right: -TOOLTIP_ARROW_SIZE / 2,
                top: "50%",
                transform: "translateY(-50%) rotate(45deg)",
              }
            : {
                left: -TOOLTIP_ARROW_SIZE / 2,
                top: "50%",
                transform: "translateY(-50%) rotate(45deg)",
              }),
        }}
      ></div>
    </div>
  );
}
