const { useEffect, useState } = React
const { Link } = ReactRouterDOM

import { MailList } from "../cmps/mail-list.jsx"
import {mailService} from "../services/mail.service.js"
import {showSuccessMsg} from "../../../services/event-bus.service.js"
import {MailSideNav} from "../views/mail-side-nav.jsx"
import {MailCompose} from "../../mail/cmps/mail-compose.jsx"
import {MailFilter} from "../../mail/cmps/mail-filter.jsx"


export function MailIndex() {

    const [shouldOpen, setShouldOpen] = useState(false)
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
        <section>
            <div className="search-bar"><MailFilter onSetFilter={onSetFilter} filterBy={filterBy} /></div>
        <section className="mail-index full flex">
            <MailSideNav setShouldOpen = {setShouldOpen} emails={emails}/>
            <div className="mail-list-cpm"><MailList emails={emails} onRemoveMail={onRemoveMail} /></div>
        </section>
            <div className="mail-compose">{shouldOpen ? <MailCompose setShouldOpen={setShouldOpen}/> : null}</div>
        </section>
    )
}
