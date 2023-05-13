import { mailService } from "../services/mail.service.js"
import { MailPreview } from "./mail-preview.jsx"

const { Link } = ReactRouterDOM
const { useState, useEffect } = React

export function MailList({ emails, onRemoveMail }) {
  const [emailList, setEmails] = useState(emails)

  useEffect(() => {
    setEmails(emails)
  }, [emails])

  function isRead(mail) {
    if (mail.isRead) return 'read'
    else return 'not-read'
  }

  function isEnvelopeOpen(mail) {
    if (mail.isRead) return "fa-regular fa-envelope-open";
    else return "fa-regular fa-envelope"
  }

  function toggleRead(mailId) {
    const updatedEmails = emailList.map((mail) => {
      if (mail.id === mailId) {
        const updatedMail = { ...mail, isRead: !mail.isRead }
        mailService.save(updatedMail)
        return updatedMail
      }
      return mail
    })
    setEmails(updatedEmails)
  }


  function isStared(mail) {
    if (mail.isStared) return "fa-solid fa-star"
    else return "fa-regular fa-star"
  }

  function toggleStar(mailId) {
    const updatedEmails = emailList.map((mail) => {
      if (mail.id === mailId) {
        const updatedMail = { ...mail, isStared: !mail.isStared }
        mailService.save(updatedMail)
        return updatedMail
      }
      return mail
    })
    setEmails(updatedEmails)
  }  

  return (
    <section>
        <ul className="mail-list-rows-container">
          <li className="mail-list-header flex">
            <h3 className="inbox-header"></h3>
          </li>
          {emailList.map((mail) => (
            <li className={`mail   ${isRead(mail)}`} key={mail.id}>
              <button onClick={() => toggleStar(mail.id)}><i className={`star ${isStared(mail)}`}></i></button>
              <MailPreview toToggleRead={toggleRead} mail={mail} />
              <section className="date-button-container flex align-center">
                <button onClick={() => toggleRead(mail.id)}>
                  <i className={isEnvelopeOpen(mail)}></i>
                </button>
                <button onClick={() => onRemoveMail(mail.id)}>
                  <i className="fa-sharp fa-solid fa-trash"></i>
                </button>
                <div className="date">{mail.sentAt}</div>
              </section>
            </li>
          ))}
        </ul>
    </section>
  )
}
