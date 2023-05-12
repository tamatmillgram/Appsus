const { useEffect, useState } = React
const { Link } = ReactRouterDOM

export function MailSideNav() {

    

    return (

        <section className="mail-side-nav">
            <button className="pen-btn"><i className="fa-solid fa-pen"></i></button>

            <ul className="clean-list flex column space-between">
                <li>Inbox</li>
                <li>Starred</li>
                <li>Sent</li>
                <li>Trash</li>
            </ul>
        </section>
    )
}
