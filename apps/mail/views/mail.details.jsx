const { useEffect, useState } = React
const { useParams, useNavigate } = ReactRouterDOM
const { Link } = ReactRouterDOM

import { utilService } from "../../../services/util.service.js"
import { mailService } from "../services/mail.service.js"


export function MailDetails() {

    const [mail, setMail] = useState(null)
    const [nextMailId, setNextMailId] = useState(null)
    const [prevMailId, setPrevMailId] = useState(null)

    const { mailId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadMail()
        loadNextMailId()
        loadPrevMailId()
    }, [mailId])

    function loadMail() {
        mailService.get(mailId)
            .then(setMail)
            .catch(err => {
                console.log('Had issued in mail details:', err);
                navigate('/mail')
            })
    }

    function loadNextMailId() {
        mailService.getNextMailId(mailId)
            .then(setNextMailId)
    }

    function loadPrevMailId() {
        mailService.getPrevMailId(mailId)
            .then(setPrevMailId)
    }

    function onBack() {
        navigate('/mail')
    }

    if (!mail) return <div>Loading...</div>

    const {subject, body, sentAt,from, to } = mail


    return (
        <section className="mail-details">
            <h1> {subject}</h1>
            <h2> {from}</h2>
            <button><i className="fa-regular fa-star"></i></button>
            <div>{sentAt}</div>
            <div>{body}</div>
            <button><Link to={`/mail/${prevMailId}`}><i className="fa-regular fa-arrow-right"></i></Link></button>
            <button><Link to={`/mail/${nextMailId}`}><i className="fa-regular fa-arrow-left"></i></Link></button>
            <button onClick={onBack}>Back</button>
        </section>
    )

}