import { mailService } from "../services/mail.service.js"
import { MailPreview } from "./mail-preview.jsx"
const { Link } = ReactRouterDOM

export function MailList({emails, onRemoveMail}) {
    return (
        <section>
        <div className="mail-list-container main-layout"></div>
        <div className="mail-list-rows-container main-layout"></div>
        <div className="mail-list-rows-container">
        <ul className="mail-list-rows-container ">
            <li className="mail-list-header flex">
                <h3>Inbox Messages</h3></li>
        {emails.map(mail =>
            <li className="mail flex space-between" key={mail.id}>
                <MailPreview mail={mail} />
                <section>
                    <button onClick={() => onRemoveMail(mail.id)} >Remove</button>
                    {/* <button><Link to={`/mail/${mail.id}`} >Open mail</Link ></button> */}
                    {/* <button><Link to={`/mail/edit/${mail.id}`} >Edit</Link></button> */}
                </section>
            </li>
        )}
    </ul>
    </div>
    </section>
    )
}
