import './Header.css'
import AuthState from './AuthState';


function Header() {
    return (
        <header className="header">
            <div className="header_inner">
                <div className="logo">
                    <h2 className="logo_text">My Shop</h2>
                </div>
                <div className="navbar">
                    <ul className="navbar_inner">
                        <li className="navbar_item"><a href="/">Home</a></li>
                        <li className="navbar_item"><a href="/catalog">Catalog</a></li>
                        <li className="navbar_item"><a href="/about">About</a></li>

                        <AuthState />
                    </ul>
                </div>
            </div>
        </header>
    );
}

export default Header;
