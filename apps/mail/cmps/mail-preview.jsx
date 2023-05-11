import { utilService } from "../../../services/util.service.js"
import { LongTxt } from "./long-txt.jsx"

export function MailPreview({ mail }) {

    const { subject, from, body } = mail
    return (
        <section className="mail-preview flex space-between">
             <button><i className="fa-regular fa-star"></i></button>
            <div className="from" >{from}</div>
            <div className="subject">{subject}</div>
            <LongTxt txt={body} length={40} />
        </section>
    )
}