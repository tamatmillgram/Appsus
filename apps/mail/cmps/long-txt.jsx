
const { useState } = React


export function LongTxt({ txt, length }) {

    const [isOpen, setIsOpen] = useState(false)

    function cutTxtByLength() {
        if (txt.length < length || isOpen) return txt
        return txt.substring(0, length) + '...'
    }

    return (
        <section>
            <p> {cutTxtByLength()} </p>
        </section>
    )
}