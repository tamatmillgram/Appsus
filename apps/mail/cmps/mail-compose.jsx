const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouterDOM

import { mailService } from "../services/mail.service.js"
import { utilService } from "../../../services/util.service.js"
import { showSuccessMsg}  from "../../../services/event-bus.service.js"

export function MailCompose({setShouldOpen}) {
    const navigate = useNavigate()
    const [composeMail, setComposeMail] = useState(mailService.getEmptyMail())
    const params = useParams()

    useEffect(() => {
        loadMail()
    }, [composeMail])

    function loadMail() {
        mailService.get(params.mailId)
            .then(setComposeMail)
            .catch(err => {
                console.log('Had issued with composing new mail:', err)
                navigate('/mail')
            })
    }

    function handleChange({ target }) {
        const field = target.name
        const value = target.value
        setComposeMail(mail => ({ ...mail, [field]: value }))
    }

    function onSaveMail(ev) {
        ev.preventDefault()
        mailService.save(composeMail)
            .then(() => {
                setShouldOpen(false)
                navigate('/mail')
                showSuccessMsg('Mail sent')
            })
    }

    function close(){
        setShouldOpen(false)
    }

    const { body, subject, to } = composeMail

    return (
        <section className="new-mail-box">
            <div className="new-mail-header">New Message <button className="close-btn" onClick={close}><i className="fa-solid fa-xmark"></i></button></div>
             <form onSubmit={onSaveMail} className="flex column">

                <label htmlFor="to"></label>
                <input required onChange={handleChange} value={to} type="text" name="to" id="to" placeholder="To"/>

                <label htmlFor="subject"></label>
                <input required onChange={handleChange} value={subject} type="text" name="subject" id="subject" placeholder="Subject"/>

                <label htmlFor="body"></label>
                <textarea className="body-txt" onChange={handleChange} 
                value={body} type="text" name="body" id="body"></textarea>

                <button className="sand-btn">Send<i className="fa-regular fa-paper-plane"></i></button>
            </form>
        </section>
    )
}