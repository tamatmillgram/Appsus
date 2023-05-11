const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouterDOM

import { mailService } from "../services/mail.service.js"
import { utilService } from "../../../services/util.service.js"
import { showSuccessMsg}  from "../../../services/event-bus.service.js"

export function AddMail() {
    const navigate = useNavigate()

    return (
        <section className="center">
            <h1>Add Books From Google</h1>
            <form action="" onSubmit={onSearchBook}>
                <input onChange={handleChange} type="search" name="" id="" />
            </form>
            <ul>
                {booksFromGoogle.map(book => {
                    return <li key={book.title} className="flex justify-between">
                        {book.title}
                        <button onClick={() => onAddBookFromGoogle(book)}>+</button>
                    </li>
                })}
            </ul>
        </section>
    )
}