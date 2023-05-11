import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const MAIL_KEY = 'mailDB'

export const mailService = {
    query,
    get,
    remove,
    save,
    getDefaultFilter
}

const gMails = [
    {
        id: 'e101',
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        sentAt: 1551133930594,
        removedAt: null,
        from: 'momo@momo.com',
        to: 'user@appsus.com'
    },
    {
        id: 'e102',
        subject: 'Tamar,add Shykeeya Simmons ',
        body: 'Do you know Shykeeya Simmons?',
        isRead: false,
        sentAt: 1551133930594,
        removedAt: null,
        from: 'LinkedIn',
        to: 'user@appsus.com'
    },
    {
        id: 'e103',
        subject: 'Weekend Getaway',
        body: 'Escape the city and enjoy a relaxing weekend retreat',
        isRead: false,
        sentAt: 1551133930594,
        removedAt: null,
        from: 'Salina',
        to: 'user@appsus.com'
    },
    {
        id: 'e104',
        subject: 'קבלת רכישה ב-Wolt',
        body: 'חשבונית מס / קבלה (מקור) מספר 131952635',
        isRead: false,
        sentAt: 1551133930594,
        removedAt: null,
        from: 'Wolt',
        to: 'user@appsus.com'
    },
]
_createEmails()


function query(filterBy = {}) {
    return storageService.query(MAIL_KEY)
        .then(emails => {
            if (filterBy.subject) {
                const regExp = new RegExp(filterBy.subject, 'i')
                emails = emails.filter(mail => regExp.test(mail.subject))
            }
            return emails
        })
}


function get(mailId) {
    return storageService.get(MAIL_KEY, mailId)
}

function remove(mailId) {
    return storageService.remove(MAIL_KEY, mailId)
}

function save(mail) {
    if (mail.id) {
        return storageService.put(MAIL_KEY, mail)
    } else {
        return storageService.post(MAIL_KEY, mail)
    }
}

function getDefaultFilter() {
    return { subject: ''}
}

function _createEmails() {
    let emails = storageService.loadFromStorage(MAIL_KEY)
    if (!emails || !emails.length) {

        emails = gMails

        storageService.saveToStorage(MAIL_KEY, gMails)
    }
}