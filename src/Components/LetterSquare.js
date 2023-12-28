import "../Css/LetterSquare.css";

const LetterSquare = ({ firstName, width, height, fontSize }) => {
  // const contactColors = ["#CDEBC3", "#FFD7C2", "#F3F1F1", "#FFF3A8"];
  return (
    <>
      <div
        className="contact-letter-container"
        style={{
          backgroundColor: "#FFD7C2",
          // contactColors[Math.floor(Math.random() * contactColors.length)],
          width: width,
          height: height,
        }}
      >
        <p className="first-letter" style={{ fontSize: fontSize }}>
          {firstName?.slice(0, 1).toUpperCase()}
        </p>
      </div>
    </>
  );
};

export default LetterSquare;
