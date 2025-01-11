import "./Footer.css";
import FB from "../../assets/social/facebook.png";
import IG from "../../assets/social/iG.png";
import Linkedin from "../../assets/social/linkedin.png";

function Footer() {
    return (
        <div className="footerContainer">
            <div className="footerContent">
                <div className="footerSection">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><a href="#Home">Home</a></li>
                        <li><a href="#about">About</a></li>
                        <li><a href="#services">Services</a></li>
                        <li><a href="#Review">Reviews</a></li>
                    </ul>
                </div>
                <div className="footerSection">
                    <h3>Contact Us</h3>
                    <p>Email: info@example.com</p>
                    <p>Phone: +94 123 456 789</p>
                    <p>Address: Colombo, Sri Lanka</p>
                </div>
                <div className="footerSection">
                    <h3>Follow Us</h3>
                    <div className="socialLinks">
                        <a href="#"><img src={FB} alt="" /></a>
                        <a href="#"><img src={IG} alt="" /></a>
                        <a href="#"><img src={Linkedin} alt="" /></a>
                    </div>
                </div>
            </div>
            <div className="footerBottom">
                <p>&copy; 2024 JobCc. All rights reserved.</p>
            </div>
        </div>
    );
}

export default Footer;