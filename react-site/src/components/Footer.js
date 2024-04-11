import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram, faGithub, faYoutube } from "@fortawesome/free-brands-svg-icons"
import './Footer.css';


function Footer() {
    return (
        <footer className="footer">
            <div className="footer_container">
                <div className="footer_row">
                    <div className="footer-col">
                        <h4>company</h4>
                        <ul>
                            <li><a href="#">about us</a></li>
                            <li><a href="#">our services</a></li>
                            <li><a href="#">privacy policy</a></li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4>get help</h4>
                        <ul>
                            <li><a href="#">FAQ</a></li>
                            <li><a href="#">shipping</a></li>
                            <li><a href="#">returns</a></li>
                            <li><a href="#">order status</a></li>
                            <li><a href="#">payment options</a></li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4>follow us</h4>
                        <div className="social-links">
                            <a href="#"><FontAwesomeIcon icon={faFacebook} /></a>
                            <a href="#"><FontAwesomeIcon icon={faInstagram} /></a>
                            <a href="#"><FontAwesomeIcon icon={faGithub} /></a>
                            <a href="#"><FontAwesomeIcon icon={faYoutube} /></a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}


export default Footer;
