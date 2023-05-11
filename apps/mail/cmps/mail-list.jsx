import { mailService } from "../services/mail.service.js"
import { MailPreview } from "./mail-preview.jsx"
const { Link } = ReactRouterDOM

export function MailList({emails, onRemoveMail}) {
    return (
        <ul className="mail-list">
        {emails.map(mail =>
            <li key={mail.id}>
                <MailPreview mail={mail} />
                <section>
                    <button onClick={() => onRemoveMail(mail.id)} >Remove</button>
                    {/* <button><Link to={`/mail/${mail.id}`} >Open mail</Link ></button> */}
                    {/* <button><Link to={`/mail/edit/${mail.id}`} >Edit</Link></button> */}
                </section>
            </li>
        )}
    </ul>
    )
}
