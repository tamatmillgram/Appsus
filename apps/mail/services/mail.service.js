import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const MAIL_KEY = 'mailDB'
const options = { month: 'short', day: 'numeric', year: 'numeric' };


export const mailService = {
    query,
    get,
    remove,
    save,
    getDefaultFilter,
    getPrevMailId,
    getNextMailId,
    getEmptyMail
}

const gMails = [
    {
        id: utilService.makeId(),
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        sentAt:formatDate(1551133930594),
        removedAt: null,
        from: 'momo@momo.com',
        to: 'user@appsus.com',
        isStared: false
    },
    {
        id: utilService.makeId(),
        subject: 'Tamar,add Shykeeya Simmons ',
        body: 'Do you know Shykeeya Simmons?',
        isRead: false,
        sentAt: formatDate(1551133930594),
        removedAt: null,
        from: 'LinkedIn',
        to: 'user@appsus.com',
        isStared: false
    },
    {
        id: utilService.makeId(),
        subject: 'Weekend Getaway',
        body: 'Escape the city and enjoy a relaxing weekend retreat',
        isRead: false,
        sentAt: formatDate(1551133930594),
        removedAt: null,
        from: 'Salina',
        to: 'user@appsus.com',
        isStared: false
    },
    {
        id: utilService.makeId(),
        subject: 'Wolt',
        body: ' 131952635',
        isRead: false,
        sentAt: formatDate(1551133930594),
        removedAt: null,
        from: 'Wolt',
        to: 'user@appsus.com',
        isStared: false
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
            if(filterBy.isStared){
                emails = emails.filter(mail => mail.isStared)
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

function formatDate(timestamp) {
    const date = new Date(timestamp);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }


  function getNextMailId(mailId) {
    return storageService.query(MAIL_KEY)
        .then((emails) => {
            let mailIdx = emails.findIndex(mail => mail.id === mailId)
            if (mailIdx === emails.length - 1) mailIdx = -1
            return emails[mailIdx + 1].id
        })
}

function getPrevMailId(mailId) {
    return storageService.query(MAIL_KEY)
        .then((emails) => {
            let mailIdx = emails.findIndex(mail => mail.id === mailId)
            if (mailIdx === 0) mailIdx = emails.length - 1
            return emails[mailIdx - 1].id
        })
}


function getEmptyMail() {
    return {
        id:'',
        subject: '',
        body: '',
        isRead: false,
        sentAt: new Date().toLocaleString('en-US', options),
        removedAt: null,
        from: 'Tamar@gmail.com',
        to: '',
        isStared: false
    }
}