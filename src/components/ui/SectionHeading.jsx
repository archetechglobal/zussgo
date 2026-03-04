import Tag from "./Tag";
import { FONTS } from "../../constants";

export default function SectionHeading({ tag, tagBg, tagColor, title, subtitle }) {
  return (
    <div>
      {tag && <Tag bgColor={tagBg} textColor={tagColor}>{tag}</Tag>}
      <h2 style={{
        fontFamily: FONTS.display, fontSize: "clamp(1.8rem, 5vw, 3rem)",
        fontWeight: 700, marginBottom: subtitle ? "12px" : "48px",
        letterSpacing: "-1px", lineHeight: 1.15,
      }}>
        {title}
      </h2>
      {subtitle && (
        <p style={{ color: "rgba(255,255,255,0.4)", marginBottom: "48px", fontSize: "1.05rem" }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
