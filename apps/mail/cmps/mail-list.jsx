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

  return (
    <section>
      <div className="mail-list-container main-layout"></div>
      <div className="mail-list-rows-container main-layout"></div>
      <div className="mail-list-rows-container">
        <ul className="mail-list-rows-container">
          <li className="mail-list-header flex">
            <h3 className="inbox-header">Inbox</h3>
          </li>
          {emailList.map((mail) => (
            <li className={`mail flex space-between ${isRead(mail)}`} key={mail.id}>
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
      </div>
    </section>
  )
}
