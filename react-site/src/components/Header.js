import './Header.css'
import Basket from './Basket';


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
                        <ul class="login_reg_container">
                            <li class="navbar_item"><a href="/login">Login</a></li>
                            <li class="navbar_item"><a href="/registration">Sign up</a></li>
                        </ul>
                    </ul>
                </div>
            </div>
        </header>
    );
}

export default Header;
