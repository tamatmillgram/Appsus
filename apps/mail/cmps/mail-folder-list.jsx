const { useEffect, useState } = React
const { Link } = ReactRouterDOM



export function MailFolderList({}) {

    

    return (
        <section>
            <ul className="clean-list flex column space-between">
                <li><i className="fa-solid fa-inbox"></i>Inbox</li>
                <li><i className="fa-regular fa-star"></i>Starred</li>
                <li><i className="fa-solid fa-paper-plane"></i>Sent</li>
                <li><i className="fa-solid fa-trash"></i>Trash</li>
            </ul>
        </section>
    )
}