import './Header.css'
import AuthState from './AuthState';


function Header() {
    return (
        <header class="header">
            <div class="header_inner">
                <div class="logo">
                    <h2 class="logo_text">My Shop</h2>
                </div>
                <div class="navbar">
                    <ul class="navbar_inner">
                        <li class="navbar_item"><a href="/">Home</a></li>
                        <li class="navbar_item"><a href="/catalog">Catalog</a></li>
                        <li class="navbar_item"><a href="/about">About</a></li>

                        <AuthState />
                    </ul>
                </div>
            </div>
        </header>
    );
}

export default Header;
