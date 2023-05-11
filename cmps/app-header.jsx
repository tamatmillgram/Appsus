const { Link, NavLink } = ReactRouterDOM

export function AppHeader() {

    function handleChange(){

    }

    function onSearchMail(){

    }


    return <header className="app-header">
        <Link to="/">
            <div className="logo">
                <img className="img-logo" src="./assets/img/logo.png" alt="appsus-logo" /><div className="appsus-logo">Appsus</div>
            </div>
        </Link>
        <nav>
        {/* <form action="" onSubmit={onSearchMail}>
                <input onChange={handleChange} type="search" name="" id="" placeholder="Search mail"/>
            </form> */}
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/mail">Mail</NavLink>
            {/* <NavLink to="/note">Note</NavLink> */}
        </nav>
    </header>
}
