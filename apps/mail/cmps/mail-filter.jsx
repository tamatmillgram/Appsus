const { useState, useEffect } = React

export function MailFilter({ filterBy, onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
   
    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const field = target.name
        const value = target.value
        setFilterByToEdit(prevFilterBy => ({ ...prevFilterBy, [field]: value }))
    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }


    const { subject, from } = filterByToEdit
    return (
        <section className="mail-filter">
            <form onSubmit={onSubmitFilter}>
                <label htmlFor="subject"></label>
                {/* <button><i classNAME="fa-solid fa-magnifying-glass"></i></button> */}
                <input value={subject} onChange={handleChange} name="subject" id="subject" type="text" placeholder="Search mail" />

            </form>

        </section>
    )
}