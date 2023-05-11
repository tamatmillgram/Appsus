const { useEffect, useState } = React
const { Link } = ReactRouterDOM

import { MailList } from "../cmps/mail-list.jsx"
import {mailService} from "../services/mail.service.js"
import {showSuccessMsg} from "../../../services/event-bus.service.js"


export function MailIndex() {

    const [emails, setEmails] = useState([])
    const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter())

    useEffect(() => {
        loadEmails()
    }, [filterBy])

    function loadEmails() {
        mailService.query(filterBy).then(setEmails)
    }

    function onRemoveMail(mailId) {
        mailService.remove(mailId).then(() => {
            const updatedEmails = emails.filter(mail => mail.id !== mailId)
            setEmails(updatedEmails)
            showSuccessMsg(`Email removed!`)

        })
    }

    function onSetFilter(filterBy) {
        setFilterBy(prevFilterBy => ({ ...prevFilterBy, ...filterBy }))
    }

    return (

        <section className="mail-index full main-layout">
            {/* <MailFilter onSetFilter={onSetFilter} filterBy={filterBy} /> */}
            {/* <button><Link to="/mail/mail-add">Add Book from Google</Link></button>
            <button><Link to="/mail/edit">Add Book</Link></button> */}
            <MailList emails={emails} onRemoveMail={onRemoveMail} />
        </section>
    )
}
