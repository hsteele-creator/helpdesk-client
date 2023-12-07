import "../Css/LetterSquare.css";

const LetterSquare = ({ firstName }) => {
  const contactColors = ["#CDEBC3", "#FFD7C2", "#F3F1F1", "#FFF3A8"];
  return (
    <>
      <div
        className="contact-letter-container"
        style={{
          backgroundColor:
            contactColors[Math.floor(Math.random() * contactColors.length)],
        }}
      >
        <p className="first-letter">
          {firstName?.slice(0, 1).toUpperCase()}
        </p>
      </div>
    </>
  );
};

export default LetterSquare;
