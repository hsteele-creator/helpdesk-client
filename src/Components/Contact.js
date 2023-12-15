import "../Css/Contact.css"
import LetterSquare from "./LetterSquare"

const Contact = ({firstName, lastName, email, phone}) => {
    return (
        <>
        <div className="contact-container">
            <div className="contact-name-container">
                <LetterSquare fontSize={"10px"} height={"30px"} width={"30px"} firstName={firstName} />
            <p className="contact-name">{firstName} {lastName}</p>
            </div>
  
        <p className="contact-email">{email}</p>
        <p className="contact-phone">{phone}</p>
        </div>

        </>
    )
}

export default Contact