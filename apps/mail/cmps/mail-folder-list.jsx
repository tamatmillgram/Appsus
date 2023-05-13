const { useEffect, useState } = React
const { Link } = ReactRouterDOM

import {mailService} from "../../mail/services/mail.service.js"

export function MailFolderList() {

    const [filterBy, setFilterBy] = useState({isStared: true})
    const [emails, setEmails] = useState([])
    
    useEffect(() => {
        loadEmails()
    }, [filterBy])

    function loadEmails() {
        mailService.query(filterBy).then(setEmails)
    }

    
    function onSetFilter(filterBy) {
        setFilterBy(prevFilterBy => ({ ...prevFilterBy, ...filterBy }))
    }

    return (
        <section>
            <ul className="clean-list flex column space-between">
            <Link to={`/mail`}><li><i className="fa-solid fa-inbox"></i>Inbox</li></Link>
                <li onClick={() => onSetFilter(filterBy)}><i className="fa-regular fa-star"></i>Starred</li>
                <li><i className="fa-solid fa-paper-plane"></i>Sent</li>
                <li><i className="fa-solid fa-trash"></i>Trash</li>
            </ul>
        </section>
    )
}