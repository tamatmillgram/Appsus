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
        body: 'Hey there! It has been ages since we last caught up. I hope everything is going well with you. I really miss our conversations and would love to find some time to catch up soon. There are so many things I\'ve been wanting to share with you. From the latest movies and books to the exciting trips I\'ve taken, there\'s a lot to catch up on. Let\'s plan a get-together soon and reminisce about the good old times. Looking forward to reconnecting with you!',
        isRead: false,
        sentAt: formatDate(1551133930594),
        removedAt: null,
        from: 'momo@momo.com',
        to: 'user@appsus.com',
        isStared: false
    },
    {
        id: utilService.makeId(),
        subject: 'Tamar,add Shykeeya Simmons ',
        body:'It has been ages since we last caught up. I hope everything is going well with you. I really miss our conversations and would love to find some time to catch up soon. There are so many things I\'ve been wanting to share with you. From the latest movies and books to the exciting trips I\'ve taken, there\'s a lot to catch up on. Let\'s plan a get-together soon and reminisce about the good old times. Looking forward to reconnecting with you!',
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
        body: 'Hey user! We have some exciting news for you. Introducing our new feature - Wolt Food Delivery! Now you can order your favorite meals right to your doorstep with just a few taps on your phone. Explore a wide variety of cuisines from local favorites to international delights. Discover new flavors and try dishes from top-rated restaurants in your area. Whether you\'re craving pizza, sushi, burgers, or desserts, Wolt has got you covered. We have partnered with a network of trusted restaurants to ensure the highest quality and taste. Track your order in real-time and enjoy contactless delivery for your safety and convenience. Download the Wolt app today and experience the joy of delicious food delivered straight to your door!',
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
        body: 'Dear user, are you tired of the hustle and bustle of city life? It\'s time for a well-deserved break! Escape the city and enjoy a relaxing weekend retreat at our exquisite resort. Immerse yourself in nature and take in the breathtaking views of the surrounding mountains. Indulge in luxurious spa treatments that will rejuvenate your body and mind. Savor delicious cuisine prepared by world-class chefs using the freshest ingredients. Engage in exciting outdoor activities such as hiking, biking, and kayaking. Our resort offers a range of amenities and services designed to provide you with an unforgettable experience. Book now and treat yourself to a weekend of pure bliss and relaxation!',
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