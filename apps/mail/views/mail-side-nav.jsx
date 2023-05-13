const { useEffect, useState } = React
const { Link } = ReactRouterDOM

import { MailFolderList } from "../cmps/mail-folder-list.jsx"



export function MailSideNav({setShouldOpen, onSetFilter, resetFilter}) {

    

    return (

        <section className="mail-side-nav">
            <button className="pen-btn" onClick={() => setShouldOpen(true)} ><i className="fa-solid fa-pen"></i></button>
           <MailFolderList resetFilter={resetFilter} onSetFilter={onSetFilter}/>
        </section>
    )
}
