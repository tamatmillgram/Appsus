import { utilService } from "../../../services/util.service.js"

export function MailPreview({ mail }) {

    const { subject, from } = mail
    return (
        <article className="mail-preview">
            <h2>{from}</h2>
            <h4>{subject}</h4>
        </article>
    )
}