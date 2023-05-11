import { mailService } from "../services/mail.service.js"
import { MailPreview } from "./mail-preview.jsx"

const { Link } = ReactRouterDOM

export function MailList({emails, onRemoveMail}) {
    return (
        <section>
        <div className="mail-list-container main-layout"></div>
        <div className="mail-list-rows-container main-layout"></div>
        <div className="mail-list-rows-container">
        <ul className="mail-list-rows-container">
            <li className="mail-list-header flex">
                <h3 className="inbox-header">Inbox</h3></li>
        {emails.map(mail =>
            <Link key={mail.id} to={`/mail/${mail.id}`} ><li className="mail flex space-between" key={mail.id}> 
                <MailPreview mail={mail} />
                <section className="date-button-container flex align-center">
                    <button ><i className="fa-regular fa-envelope"></i></button>
                    <button onClick={() => onRemoveMail(mail.id)} ><i className="fa-sharp fa-solid fa-trash"></i></button>
                    <div className="date">{mail.sentAt}</div>
                    {/* <button><Link to={`/mail/${mail.id}`} >Open mail</Link ></button> */}
                    {/* <button><Link to={`/mail/edit/${mail.id}`} >Edit</Link></button> */}
                </section>
            </li></Link >
        )}
    </ul>
    </div>
    </section>
    )
}
