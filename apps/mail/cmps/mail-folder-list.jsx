const { useEffect, useState } = React
const { Link } = ReactRouterDOM

import {mailService} from "../../mail/services/mail.service.js"

export function MailFolderList({onSetFilter, resetFilter}) {

    const starredFilter = {isStared: true}

    return (
        <section>
            <ul className="clean-list flex column space-between">
            <li onClick={() => resetFilter()}><i className="fa-solid fa-inbox"></i>Inbox</li>
                <li onClick={() => onSetFilter(starredFilter)}><i className="fa-regular fa-star"></i>Starred</li>
                <li><i className="fa-solid fa-paper-plane"></i>Sent</li>
                <li><i className="fa-solid fa-trash"></i>Trash</li>
            </ul>
        </section>
    )
}