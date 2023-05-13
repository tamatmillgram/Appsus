import { utilService } from "../../../services/util.service.js"
import { LongTxt } from "./long-txt.jsx"
import { mailService } from "../services/mail.service.js"

const { Link } = ReactRouterDOM

export function MailPreview({ mail }) {


    const { subject, from, body } = mail
    return (
        <Link key={mail.id} to={`/mail/${mail.id}`} onClick={() => {
            mail.isRead = true
            mailService.save(mail)}}>
            <section className="mail-preview ">
            <div className="from" >{from}</div>
            <div className="subject">{subject}</div>
            <LongTxt txt={body} length={40} />
        </section>
        </Link >
    )
}