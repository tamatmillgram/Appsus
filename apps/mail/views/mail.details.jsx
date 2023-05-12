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

    const { subject, body, sentAt, from, to } = mail


    return (
        <section className="mail-details">
            <button className="back-btn" onClick={onBack}><i className="fa-solid fa-angle-left"></i></button>
            <div>
                <div className="mail-details-header flex column" >
                    <h1> {subject}</h1>
                    <h1> {from}</h1>
                    {/* <button><i className="fa-regular fa-star"></i></button> */}
                    <div className="sent-at">{sentAt}</div>
                </div>
                <div className="content-body">{body}</div>
            </div>
            <button className="prev-btn"><Link to={`/mail/${prevMailId}`}><i className="fa-solid fa-arrow-left-long"></i></Link></button>
            <button className="next-btn"><Link to={`/mail/${nextMailId}`}><i className="fa-solid fa-arrow-right-long"></i></Link></button>
        </section>
    )

}