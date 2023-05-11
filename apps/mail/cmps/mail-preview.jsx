import { utilService } from "../../../services/util.service.js"

export function MailPreview({ mail }) {

    const { subject, from } = mail
    return (
        <section className="mail-preview flex space-between">
            <div className="from" >{from}</div>
            <div className="subject">{subject}</div>
        </section>
    )
}